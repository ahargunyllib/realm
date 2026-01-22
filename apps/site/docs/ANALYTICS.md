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

**Props:**
```typescript
type Props = {
  websiteId: string;      // Umami website ID (required)
  scriptSrc?: string;     // Script URL (default: "https://cloud.umami.is/script.js")
}
```

**Usage:**
```astro
<Umami websiteId="48062ad1-90e3-48a6-9691-571c063ea4a9" />
```

**Architecture:**
The component uses **three separate script tags** for clean separation of concerns:

1. **`<script>` - Development mode check** (runs first, non-deferred)
   - Checks `import.meta.env.MODE`
   - Sets `umami.disabled` in localStorage if development

2. **`<script defer>` - Umami loader** (deferred, with inline consent)
   - Loads Umami script from cloud or custom source
   - Contains inline script to check consent before init
   - Uses `document.currentScript` to modify own attributes

3. **`<script>` - Outbound link tracker** (runs after DOM ready)
   - Scans all `<a>` elements
   - Adds tracking to external links

**Benefits of this architecture:**
- ✅ All consent/env checks run **client-side** (no SSR issues)
- ✅ Clear separation: dev check → load → track
- ✅ Consent can override default config dynamically
- ✅ Fully SSR-compatible (frontmatter only has static config)

### Configuration

The configuration is set in the Astro frontmatter and applied directly to the script tag:

```javascript
const defaultConfig: TrackConfig = {
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

### Development Mode Check

Analytics are disabled automatically in development (client-side):

```javascript
<script>
  const mode = import.meta.env.MODE;
  if (mode === "development") {
    localStorage.setItem("umami.disabled", "1");
  }
</script>
```

This runs before the Umami script loads, ensuring dev traffic doesn't pollute analytics.

### Consent Integration

Consent is checked **inside the Umami script tag** using `document.currentScript`:

```javascript
<script
  defer
  src={scriptSrc}
  data-website-id={websiteId}
  is:inline
  data-do-not-track={defaultConfig.doNotTrack ? "true" : "false"}
  ...
>
  const script = document.currentScript;
  const CONSENT_KEY = "analytics-consent";
  const userConsent = localStorage.getItem(CONSENT_KEY);

  if (userConsent === "declined") {
    script.setAttribute("data-do-not-track", "true");
  } else if (userConsent === "accepted") {
    script.setAttribute("data-do-not-track", "false");
  }
</script>
```

**How it works:**
1. Script tag is created with default `data-do-not-track` from config (false)
2. Inline script reads consent from localStorage
3. Uses `document.currentScript` to reference itself
4. Modifies `data-do-not-track` attribute before Umami initializes
5. If no consent yet, default value (false) is used

### Script Loading

The Umami script is loaded declaratively with all configuration as data attributes:

```astro
<script
  defer
  src={scriptSrc}
  data-website-id={websiteId}
  is:inline
  data-auto-track={defaultConfig.autoTrack ? "true" : "false"}
  data-host-url={defaultConfig.hostUrl}
  data-domains={defaultConfig.domains?.join(",")}
  data-tag={defaultConfig.tag}
  data-exclude-search={defaultConfig.excludeSearch ? "true" : "false"}
  data-exclude-hash={defaultConfig.excludeHash ? "true" : "false"}
  data-do-not-track={defaultConfig.doNotTrack ? "true" : "false"}
  data-before-send={defaultConfig.beforeSendHandler}
  data-astro-rerun="false"
>
  <!-- Inline consent check (see Consent Integration above) -->
</script>
```

**Key attributes:**
- `defer` - Script loads after HTML parsing, doesn't block rendering
- `is:inline` - Prevents Astro from processing/bundling the script
- `data-website-id` - Your unique Umami website ID
- `data-auto-track` - Enable/disable automatic page view tracking
- `data-do-not-track` - Respects user consent (overridden by inline script)
- `data-astro-rerun="false"` - Currently disabled for view transitions
- Contains inline script to check consent before initialization

### Outbound Link Tracking

The outbound link tracking script runs on page load and scans all anchor tags:

```javascript
<script>
  const setupOutboundLinkTracking = () => {
    const eventName = "outbound-link-click";
    const anchors = document.querySelectorAll("a");
    const currentHost = window.location.host;

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors.item(i);
      const { host, href } = anchor;

      if (host === currentHost) {
        continue; // Skip internal links
      }

      if (anchor.hasAttribute("data-umami-event")) {
        continue; // Skip if already has tracking
      }

      anchor.setAttribute("data-umami-event", eventName);
      anchor.setAttribute("data-umami-event-url", href);
    }
  };

  setupOutboundLinkTracking();
</script>
```

**How it works:**
1. Selects all `<a>` elements on the page
2. Checks if each link's host differs from current host (external link)
3. Skips links that already have `data-umami-event` attribute
4. Adds tracking attributes to external links
5. Runs immediately when script loads (not deferred)

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
