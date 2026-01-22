# Analytics Documentation

## Overview

This site uses **Umami Analytics** for privacy-focused, cookieless website analytics. User consent is required before tracking begins, and all tracking respects user privacy preferences.

## Umami Analytics

### Why Umami?

- **Privacy-first**: No cookies, no personal data collection
- **Lightweight**: Minimal impact on page performance
- **GDPR/CCPA compliant**: Built-in compliance with privacy regulations
- **Self-hostable**: Can be self-hosted for complete data ownership
- **Simple**: Clean dashboard, no complex setup

### Features Enabled

- **Consent-based tracking**: User must explicitly accept/decline via cookie consent notice
- **Outbound link tracking**: Automatically tracks clicks on external links
- **Page view tracking**: Basic page analytics with referrer information
- **Development mode**: Analytics automatically disabled in development environment

## Consent Management

### How It Works

User consent is stored in `localStorage` with the key `analytics-consent`.

**Possible Values:**
```javascript
"accepted"  // User accepted tracking - analytics enabled
"declined"  // User declined tracking - analytics disabled (doNotTrack: true)
null        // No consent given yet - default behavior (tracking enabled)
```

### Consent Flow

1. **First Visit**: Cookie consent notice appears at bottom of page
2. **User Action**: User clicks "Accept" or "Decline"
3. **Storage**: Choice saved to `localStorage` with key `analytics-consent`
4. **Page Reload**: Page reloads to apply the tracking configuration
5. **Subsequent Visits**: Banner remains hidden, tracking state persists based on saved consent

### Managing Consent

Users can revoke consent by clearing their browser's localStorage or by manually removing the `analytics-consent` key:

```javascript
// Clear analytics consent
localStorage.removeItem('analytics-consent');
// Reload to show consent notice again
window.location.reload();
```

## Tracked Events

### Automatic Tracking

The following events are tracked automatically:

- **Page views**: Every page visit
- **Referrers**: Where visitors came from
- **Session duration**: Time spent on site
- **Browser/Device**: User agent information (anonymized)

### Custom Events

#### Outbound Link Clicks

All external links are automatically tracked when clicked.

**Event Details:**
- **Event name**: `outbound-link-click`
- **Event data**: `url` (destination URL)

**How It Works:**
```javascript
// Scans all links on the page
const anchors = document.querySelectorAll('a');
const currentHost = window.location.host;

for (let i = 0; i < anchors.length; i++) {
  const anchor = anchors.item(i);

  // If link is external, add tracking attributes
  if (anchor.host !== currentHost && !anchor.hasAttribute('data-umami-event')) {
    anchor.setAttribute('data-umami-event', 'outbound-link-click');
    anchor.setAttribute('data-umami-event-url', anchor.href);
  }
}
// This runs on page load and after view transitions
```

### Adding Custom Events

To track additional custom events, add `data-umami-event` attributes to any HTML element:

**Button Click Example:**
```html
<button
  data-umami-event="button-click"
  data-umami-event-action="download"
>
  Download Resume
</button>
```

**Link Click Example:**
```html
<a
  href="/contact"
  data-umami-event="navigation"
  data-umami-event-section="header"
>
  Contact
</a>
```

**Form Submission Example:**
```html
<form
  data-umami-event="form-submit"
  data-umami-event-form="newsletter"
>
  <!-- form fields -->
</form>
```

### Event Properties

You can add multiple properties to events using `data-umami-event-*` attributes:

```html
<button
  data-umami-event="download"
  data-umami-event-type="pdf"
  data-umami-event-file="resume.pdf"
  data-umami-event-size="250kb"
>
  Download PDF
</button>
```

All `data-umami-event-*` attributes will be sent as event properties.

## Implementation Details

### Component: `umami.astro`

**Location:** `apps/site/src/components/umami.astro`

**Key Responsibilities:**
1. Load Umami tracking script with proper configuration
2. Read user consent from localStorage
3. Apply `doNotTrack` setting based on consent
4. Disable analytics in development mode
5. Support Astro view transitions
6. Set up outbound link tracking

### Configuration

```javascript
const defaultConfig = {
  autoTrack: true,
  hostUrl: "https://cloud.umami.is",
  domains: ["ahargunyllib.dev", "www.ahargunyllib.dev", "localhost"],
  tag: "site",
  excludeSearch: false,
  excludeHash: false,
  doNotTrack: false,  // Controlled by user consent
  beforeSendHandler: null,
};
```

### Consent Integration

```javascript
// Read consent from localStorage
const CONSENT_KEY = "analytics-consent";
const userConsent = localStorage.getItem(CONSENT_KEY);

// Apply consent to tracking config
if (userConsent === "declined") {
  config.doNotTrack = true;  // Disable tracking
} else if (userConsent === "accepted") {
  config.doNotTrack = false; // Enable tracking
}
// If no consent yet, use default (tracking enabled)
```

### Outbound Link Tracking

The outbound link tracking script runs:
- On initial page load (`DOMContentLoaded`)
- After every Astro view transition (`astro:page-load`)

This ensures all dynamically loaded links are tracked properly.

```javascript
const setupOutboundLinkTracking = () => {
  const eventName = "outbound-link-click";
  const anchors = document.querySelectorAll("a");
  const currentHost = window.location.host;

  for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors.item(i);
    const { host, href } = anchor;

    // Skip internal links
    if (host === currentHost) {
      continue;
    }

    // Skip if already has tracking
    if (anchor.hasAttribute("data-umami-event")) {
      continue;
    }

    anchor.setAttribute("data-umami-event", eventName);
    anchor.setAttribute("data-umami-event-url", href);
  }
};

// Run on initial page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupOutboundLinkTracking);
} else {
  setupOutboundLinkTracking();
}

// Re-run on Astro view transitions (if enabled)
document.addEventListener("astro:page-load", setupOutboundLinkTracking);
```

## Privacy Considerations

### Data Collection

**What We Track:**
- Page URLs visited
- Referrer (where you came from)
- Browser type (e.g., Chrome, Firefox)
- Device type (desktop, mobile, tablet)
- Country (based on IP, but IP is not stored)
- Session duration

**What We DON'T Track:**
- Personal information (name, email, etc.)
- IP addresses (not stored)
- Cookies or persistent identifiers
- Cross-site tracking
- User behavior across different websites

### Compliance

- ✅ **GDPR compliant**: No personal data collected, consent-based
- ✅ **CCPA compliant**: No sale of personal information
- ✅ **PECR compliant**: No cookies used
- ✅ **Do Not Track**: `doNotTrack` setting respected
- ✅ **Transparent**: Full disclosure in cookie consent notice

### User Rights

Users have the right to:
- **Decline tracking**: Click "Decline" on consent notice
- **Revoke consent**: Clear localStorage to reset choice
- **Request deletion**: Contact site owner for data removal
- **Opt-out permanently**: Use browser Do Not Track settings

## Development

### Local Development

Analytics are automatically disabled in development mode:

```javascript
if (config.mode === "development") {
  localStorage.setItem("umami.disabled", "1");
}
```

This prevents development traffic from polluting production analytics.

### Testing Analytics

To test analytics locally:

1. Remove the development mode check temporarily
2. Or set `mode: "production"` in the config for testing
3. Use browser DevTools Network tab to verify tracking requests
4. Check Umami dashboard for incoming events

### Debugging

**Check if Umami is loaded:**
```javascript
console.log(window.umami); // Should be a function
```

**Manually trigger an event:**
```javascript
window.umami.track('test-event', { property: 'value' });
```

**Check consent status:**
```javascript
console.log(localStorage.getItem('analytics-consent'));
```

**View all tracked links:**
```javascript
document.querySelectorAll('[data-umami-event="outbound-link-click"]');
```

## Dashboard Access

Analytics dashboard: https://cloud.umami.is

**Metrics Available:**
- Total page views
- Unique visitors
- Bounce rate
- Average session duration
- Top pages
- Traffic sources
- Custom events (including outbound link clicks)
- Real-time visitors

## Future Enhancements

Potential additions to consider:

- [ ] Track scroll depth (how far users scroll down pages)
- [ ] Track time on page (reading time analytics)
- [ ] Track search queries (if site search is added)
- [ ] A/B testing integration
- [ ] Performance metrics (Core Web Vitals)
- [ ] Custom dashboard embeds on admin pages
- [ ] Download tracking for files
- [ ] Video play/pause tracking

---

**Last Updated:** January 2026
**Analytics Provider:** Umami Cloud
**Website ID:** `48062ad1-90e3-48a6-9691-571c063ea4a9`
