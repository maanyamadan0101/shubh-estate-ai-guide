type EvolutionGoEnquiryInput = {
  enquiryId: string;
  fullName: string;
  phone: string;
  email?: string | null;
  interest?: string | null;
  source?: string | null;
  propertyId?: string | null;
  message?: string | null;
  currentPage?: string | null;
};

const MAX_MESSAGE_LENGTH = 1800;

function clean(value: string | null | undefined, max = 300) {
  return (value ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

/**
 * Send an owner notification through Evolution GO.
 *
 * Configure these server-only Vercel environment variables:
 * - EVOLUTION_GO_BASE_URL: public HTTPS origin, e.g. https://whatsapp-api.example.com
 * - EVOLUTION_GO_API_KEY: Evolution GO API key
 * - EVOLUTION_GO_NOTIFICATION_NUMBER: owner/notification destination with country code
 *
 * The Evolution GO /send/text endpoint accepts { number, text } and an apikey header.
 * Notification delivery is best-effort: a provider outage must not lose a saved enquiry.
 */
export async function sendEvolutionGoEnquiryNotification(input: EvolutionGoEnquiryInput) {
  const baseUrl = process.env["EVOLUTION_GO_BASE_URL"]?.trim().replace(/\/+$/, "");
  const apiKey = process.env["EVOLUTION_GO_API_KEY"]?.trim();
  const recipient = process.env["EVOLUTION_GO_NOTIFICATION_NUMBER"]?.replace(/\D/g, "");

  if (!baseUrl || !apiKey || !recipient) {
    console.info("[Evolution GO] Enquiry notification skipped: provider settings are not configured.");
    return { sent: false as const, reason: "not_configured" as const };
  }

  let endpoint: URL;
  try {
    endpoint = new URL("/send/text", baseUrl);
    if (endpoint.protocol !== "https:") {
      console.warn("[Evolution GO] Notification skipped: EVOLUTION_GO_BASE_URL must use HTTPS.");
      return { sent: false as const, reason: "https_required" as const };
    }
  } catch {
    console.warn("[Evolution GO] Notification skipped: EVOLUTION_GO_BASE_URL is invalid.");
    return { sent: false as const, reason: "invalid_url" as const };
  }

  const lines = [
    "🏡 *New Website Enquiry — Shubh Estate Brokers*",
    "",
    `Lead: ${clean(input.fullName, 100)}`,
    `Phone: ${clean(input.phone, 30)}`,
    input.email ? `Email: ${clean(input.email, 180)}` : "",
    input.interest ? `Requirement: ${clean(input.interest, 200)}` : "",
    input.propertyId ? `Property ID: ${clean(input.propertyId, 100)}` : "",
    input.currentPage ? `Page: ${clean(input.currentPage, 220)}` : "",
    input.source ? `Source: ${clean(input.source, 80)}` : "",
    input.message ? `Message: ${clean(input.message, 700)}` : "",
    "",
    `Enquiry ID: ${clean(input.enquiryId, 100)}`,
  ].filter(Boolean);
  const text = lines.join("\n").slice(0, MAX_MESSAGE_LENGTH);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify({ number: recipient, text }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.warn(`[Evolution GO] Notification failed with HTTP ${response.status}.`);
      return { sent: false as const, reason: "provider_error" as const };
    }

    return { sent: true as const };
  } catch (error) {
    console.warn(
      "[Evolution GO] Notification delivery failed:",
      error instanceof Error ? error.name : "unknown error",
    );
    return { sent: false as const, reason: "network_error" as const };
  }
}
