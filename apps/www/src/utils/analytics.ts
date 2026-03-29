/**
 * Analytics Utility
 *
 * Minimal, privacy-first Umami analytics tracking.
 * Tracks only essential user interactions: content engagement, external links, and consent.
 * Philosophy: 90% of value with 40% of complexity.
 */

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Essential event names tracked in the application
 */
export type UmamiEventName =
  | "cookie-consent-action"
  | "content-click"
  | "outbound-link-click";

/**
 * Event properties for each event type
 */
export type UmamiEventProperties = {
  "cookie-consent-action": {
    choice: "accepted" | "declined";
    timestamp: string;
  };
  "content-click": {
    type: "blog" | "writeup" | "solution";
    title: string;
    tags: string;
    location: "list" | "related" | "featured";
  };
  "outbound-link-click": {
    url: string;
  };
};

/**
 * Generic event data structure
 */
export type EventData<T extends UmamiEventName> = {
  event: T;
  properties: UmamiEventProperties[T];
};

// ============================================================================
// Constants
// ============================================================================

/**
 * Maximum length for property values to prevent excessive data collection
 */
const MAX_PROPERTY_LENGTH = 100;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Check if Umami is available in the window context
 */
const isUmamiAvailable = (): boolean =>
  typeof window !== "undefined" && typeof window.umami !== "undefined";

/**
 * Sanitize string values to prevent collecting sensitive data
 * Truncates long strings and removes potential PII patterns
 */
const sanitizeValue = (value: string): string => {
  if (!value) {
    return "";
  }

  // Truncate to max length
  let sanitized = value.slice(0, MAX_PROPERTY_LENGTH);

  // Remove email patterns (basic check)
  sanitized = sanitized.replace(/[\w.-]+@[\w.-]+\.\w+/g, "[email]");

  // Remove phone patterns (basic check)
  sanitized = sanitized.replace(/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g, "[phone]");

  return sanitized;
};

/**
 * Sanitize event properties
 */
const sanitizeProperties = <T extends Record<string, unknown>>(
  properties: T
): T => {
  const sanitized = { ...properties };

  for (const key in sanitized) {
    if (!Object.hasOwn(sanitized, key)) {
      continue;
    }

    const value = sanitized[key];
    if (typeof value === "string") {
      sanitized[key] = sanitizeValue(value) as T[Extract<keyof T, string>];
    }
  }

  return sanitized;
};

// ============================================================================
// Main Tracking Functions
// ============================================================================

/**
 * Track a custom event with Umami
 *
 * @param eventName - Name of the event to track
 * @param properties - Event properties (will be sanitized)
 *
 * @example
 * ```typescript
 * trackEvent("social-click", {
 *   platform: "GitHub",
 *   category: "development",
 *   location: "footer"
 * });
 * ```
 */
export const trackEvent = <T extends UmamiEventName>(
  eventName: T,
  properties: UmamiEventProperties[T]
): void => {
  if (!isUmamiAvailable()) {
    // In development or when analytics is disabled
    if (import.meta.env.DEV) {
      console.log("[Analytics]", eventName, properties);
    }
    return;
  }

  try {
    const sanitized = sanitizeProperties(properties);
    window.umami.track(eventName, sanitized);
  } catch (error) {
    // Silently fail - analytics should never break the user experience
    if (import.meta.env.DEV) {
      console.error("[Analytics] Failed to track event:", error);
    }
  }
};

/**
 * Track cookie consent action
 *
 * @example
 * ```typescript
 * trackCookieConsent("accepted");
 * ```
 */
export const trackCookieConsent = (choice: "accepted" | "declined"): void => {
  trackEvent("cookie-consent-action", {
    choice,
    timestamp: new Date().toISOString(),
  });
};

// ============================================================================
// Type Declarations
// ============================================================================

declare global {
  // biome-ignore lint/style/useConsistentTypeDefinitions: Needed for global augmentation
  interface Window {
    umami: {
      track: (eventName: string, properties?: Record<string, unknown>) => void;
    };
  }
}
