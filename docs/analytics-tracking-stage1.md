# Stage 1 — GA4 / GTM tracking implementation

**Project:** Shubh Estate Brokers  
**Repository:** `maanyamadan0101/shubh-estate-ai-guide`  
**Branch:** `seo/ga4-gtm-tracking-stage1`  
**Base:** `main`  
**Status:** Preview-only implementation; production release requires separate approval.

## 1. Scope and safety boundary

This stage addresses analytics instrumentation and measurement quality only. It does not change SEO page content, indexing directives, canonical URLs, property data, Supabase schemas, or live GA4 / GTM account settings.

- Changes are isolated to this feature branch and its Vercel preview.
- Do not merge this PR, publish a GTM container version, change GA4 Admin settings, or promote a deployment without explicit production approval.
- Preview and local development hosts must not load the live GA4 or GTM scripts.
- No real enquiry or seller submission should be made in preview unless the preview backend is confirmed to be isolated from production data.

## 2. Current implementation observed in source

- GA4 measurement ID: `G-8EWLZD8V5H`.
- GTM container ID: `GTM-TX7ZPXC5`.
- The root route defines the `gtag` dataLayer queue, configures GA4 with `send_page_view:false`, and lazily loads both the GA4 gtag library and GTM.
- TanStack Router pathname changes trigger a manually sent `page_view` event.
- `trackEvent` is the shared analytics event helper.
- Successful general/property enquiries emit `generate_lead` and a more specific event (`contact_form_submit` or `property_enquiry`) after the enquiry API responds successfully.
- Successful seller submissions emit `seller_submission` after the submission API responds successfully. Media upload failures are surfaced separately and do not erase the accepted property details.
- Phone, WhatsApp and site-visit actions emit dedicated click events through `trackContact`.
- The assistant's open/close/callback-panel events are interaction diagnostics, not completed leads.

**Important limitation:** repository source does not expose the GTM container workspace/version. The existence of a GTM snippet does not prove which Google tags, triggers, consent settings, or pageview tags are configured inside that container. A live GTM configuration export or read-only Tag Manager access is required before making any loader or tag-architecture change.

## 3. Changes in this PR

### 3.1 Preview / development analytics isolation

The root analytics loader is restricted to the two production hostnames:

- `shubhestatebroker.in`
- `www.shubhestatebroker.in`

On localhost, Vercel previews, Lovable previews and other non-production hosts, the inline dataLayer / gtag queue remains available for safe inspection, but the external GA4 and GTM scripts are not loaded. The GTM noscript iframe fallback is also omitted, so a preview cannot send GTM fallback requests when JavaScript is disabled. This removes the no-JavaScript GTM fallback for production visitors as well; normal JavaScript-enabled production tracking is unchanged.

### 3.2 Central analytics privacy filter

The shared `trackEvent` helper now sanitizes parameters before queueing them:

- Removes fields whose keys indicate names, email, phone/mobile, address, free-text message/notes, passwords, tokens, lead/customer IDs, or submission references.
- Restricts `page_location` query parameters to attribution/click identifiers (UTM fields and supported ad click IDs); arbitrary query parameters are dropped.
- Strips query strings and fragments from `page_path`.
- Allows only scalar string, number and boolean values; caps string values at 150 characters.
- Preserves non-sensitive campaign and property-context metadata such as event type, property ID, project, sector, page type, form location and media count.

This is a defensive guardrail, not a substitute for reviewing every future event callsite. Never pass contact details or free-text enquiry content to analytics.

## 4. Recommended GA4 event taxonomy

| Event | Meaning | Recommended treatment |
| --- | --- | --- |
| `generate_lead` | Enquiry accepted by the server (general, property or callback form) | Primary GA4 key event |
| `seller_submission` | Private seller submission accepted by the server | Primary GA4 key event |
| `contact_form_submit` | Specific general enquiry form event | Diagnostic event; do not mark as a second primary conversion while `generate_lead` is also sent |
| `property_enquiry` | Specific property enquiry event | Diagnostic event; do not mark as a second primary conversion while `generate_lead` is also sent |
| `click_phone` | Visitor clicks a telephone link | Secondary engagement; not equivalent to a connected call |
| `click_whatsapp` | Visitor clicks a WhatsApp link | Secondary engagement; not equivalent to a sent message |
| `click_site_visit_cta` | Visitor opens the site-visit/contact route | Secondary engagement; not a completed booking |
| `lead_assistant_open`, `lead_assistant_close`, `lead_assistant_callback_open` | Assistant interactions | Diagnostic only |
| `page_view` | Initial page and SPA pathname navigation | One event per page navigation |
| `web_vital` | TTFB, FCP, LCP, CLS and INP measurements | Performance diagnostics; not conversions |

Do not mark both a broad lead event and its corresponding specific form event as primary conversions; that would count one form completion more than once in conversion reporting.

## 5. GA4 / GTM account-side work (not performed by this PR)

1. In GA4 Admin, inspect the Events and Key events configuration. Confirm whether `generate_lead` and `seller_submission` are received and mark only those as primary key events if the business agrees.
2. Keep `contact_form_submit` and `property_enquiry` as diagnostic events unless the reporting model is deliberately changed to use one event instead of `generate_lead`.
3. Keep phone/WhatsApp click events separate from completed lead submissions.
4. In GTM, export or inspect the active container version. Identify every Google tag / GA4 configuration tag, pageview trigger, history-change trigger, consent initialization tag, and custom event tag.
5. Confirm exactly one GA4 pageview per initial page load and one per SPA pathname change. Check that the GTM container is not independently sending an additional pageview or re-sending events already delivered by direct gtag calls.
6. Review Consent Mode / cookie consent requirements and the current consent defaults before changing any tag firing behavior.
7. Confirm the measurement ID and container ID correspond to the intended production property/container.

No GA4 Admin or GTM workspace changes are included in this PR.

## 6. Investigation required: 2 November 2026 traffic anomaly

The connected GA4 report showed approximately 1,906 sessions on 2 November, with approximately 1,887 attributed to Organic Search, while GSC showed one click for that date. This discrepancy is a diagnostic flag, not proof of bot traffic or a tracking defect.

Use GA4 Explore / reports to break down that date by:

- Hostname, landing page, session source / medium, campaign and default channel group.
- Country, city, device category, browser and operating system.
- Event name, including `session_start`, `first_visit`, `page_view` and `user_engagement`.
- New vs returning users and engagement duration.

Then compare with Vercel request/runtime logs and deployment history for the same time window. Check whether the spike is concentrated on one hostname, landing page, browser, city, source, or repeated event pattern. Do not delete historical data or add permanent traffic filters until the cause is established.

## 7. Preview verification checklist

### Build / source checks

- [ ] Vercel preview build reaches READY for this branch and commit.
- [ ] Root route still renders and the app builds without TypeScript or bundler errors.
- [ ] Only intended files are changed; no production environment or account settings are edited.

### Host isolation

- [ ] On the preview hostname, `window.dataLayer` exists.
- [ ] Preview queues the initial `page_view` and subsequent pathname-change `page_view` events.
- [ ] Preview does not request `gtag/js?id=G-8EWLZD8V5H` or `gtm.js?id=GTM-TX7ZPXC5`.
- [ ] Production hostname allowlist remains exactly the two intended canonical/legacy hosts.

### Privacy filter

- [ ] A synthetic payload containing `full_name`, `email`, `phone`, `message` and `notes` does not retain those fields.
- [ ] `page_location` retains approved UTM / click attribution parameters but removes arbitrary query parameters.
- [ ] `page_path` contains no query string or fragment.
- [ ] Safe context fields and numeric/boolean values remain intact.

### Event flow

- [ ] Initial page load produces one queued `page_view`.
- [ ] Client-side navigation to another pathname produces one additional `page_view`.
- [ ] Phone / WhatsApp / site-visit clicks queue the expected dedicated events.
- [ ] Lead events are only emitted after successful server acceptance, not on form open, validation failure or API error.
- [ ] No actual lead or seller record is created during QA unless preview backend isolation is verified.

### Account-side checks before release

- [ ] Review GTM container export / workspace and resolve duplicate pageview or event forwarding risks.
- [ ] Verify GA4 key-event configuration and event receipt in DebugView / Realtime after a controlled production-approved test.
- [ ] Verify consent behavior.
- [ ] Confirm no PII in collected event parameters.

## 8. Release gate

This PR may be reviewed and tested in preview, but it must remain unmerged. Production approval is requested only after the preview checklist is completed, GTM container configuration has been inspected, and the GA4 key-event decisions are confirmed. Publishing GTM and merging the PR are separate approval actions.
