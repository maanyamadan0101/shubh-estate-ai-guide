type EnquiryEmailInput = {
  enquiryId?: string | null;
  reference?: string | null;
  category: "seller_submission" | "rent_out" | "selling_mandate" | "contact" | "property_enquiry";
  fullName: string;
  phone: string;
  email?: string | null;
  interest?: string | null;
  source?: string | null;
  propertyId?: string | null;
  project?: string | null;
  sector?: string | null;
  expectedPrice?: string | null;
  message?: string | null;
};

const NOTIFICATION_EMAIL =
  process.env["ENQUIRY_NOTIFICATION_EMAIL"] ?? "sales@shubhestatebroker.in";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr><td style="padding:7px 12px 7px 0;color:#64748b;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:7px 0;color:#0f172a">${escapeHtml(value)}</td></tr>`;
}

function categoryLabel(category: EnquiryEmailInput["category"]) {
  if (category === "seller_submission") return "New Property Seller Enquiry";
  if (category === "rent_out") return "New Rent-Out / Tenant Placement Enquiry";
  if (category === "selling_mandate") return "New Property Selling Mandate Enquiry";
  if (category === "property_enquiry") return "New Property Enquiry";
  return "New Website Enquiry";
}

export async function sendEnquiryNotification(input: EnquiryEmailInput) {
  const apiKey = process.env["RESEND_API_KEY"];
  const resendDomain = process.env["RESEND_EMAIL_DOMAIN"]?.trim();
  const fromEmail =
    process.env["ENQUIRY_FROM_EMAIL"] ??
    (resendDomain ? `Shubh Estate Brokers <sales@${resendDomain}>` : undefined);

  // Email delivery is intentionally non-blocking for website leads. A missing or
  // temporarily unavailable email provider must never prevent the enquiry itself
  // from being saved in Supabase.
  if (!apiKey || !fromEmail) {
    console.warn(
      "[Enquiry email] Notification skipped: RESEND_API_KEY and a sender domain/email are not configured.",
    );
    return { sent: false as const, reason: "not_configured" as const };
  }

  const title = categoryLabel(input.category);
  const subjectParts = [title, input.project || input.interest, input.fullName].filter(Boolean);
  const subject = subjectParts.join(" — ");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#0f172a">
      <div style="background:#0f2940;color:#fff;padding:22px 24px;border-radius:10px 10px 0 0">
        <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#d4a73c">Shubh Estate Brokers</div>
        <h1 style="font-size:22px;margin:7px 0 0">${escapeHtml(title)}</h1>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:0;padding:22px 24px;border-radius:0 0 10px 10px">
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          ${row("Name", input.fullName)}
          ${row("Phone / WhatsApp", input.phone)}
          ${row("Email", input.email)}
          ${row("Requirement", input.interest)}
          ${row("Project / Property", input.project)}
          ${row("Sector / Locality", input.sector)}
          ${row("Expected price / rent", input.expectedPrice)}
          ${row("Property ID", input.propertyId)}
          ${row("Source", input.source)}
          ${row("Reference", input.reference)}
          ${row("Enquiry ID", input.enquiryId)}
        </table>
        ${input.message ? `<div style="margin-top:18px;padding-top:18px;border-top:1px solid #e2e8f0"><div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#64748b;margin-bottom:7px">Message / Notes</div><div style="white-space:pre-wrap;font-size:14px;line-height:1.55">${escapeHtml(input.message)}</div></div>` : ""}
        <p style="margin:22px 0 0;font-size:12px;color:#64748b">This notification was generated after the enquiry was successfully saved by shubhestatebroker.in.</p>
      </div>
    </div>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [NOTIFICATION_EMAIL],
        subject,
        html,
        reply_to: input.email || undefined,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`[Enquiry email] Resend returned ${response.status}: ${detail.slice(0, 500)}`);
      return { sent: false as const, reason: "provider_error" as const };
    }

    return { sent: true as const };
  } catch (error) {
    console.error("[Enquiry email] Delivery failed", error);
    return { sent: false as const, reason: "network_error" as const };
  }
}
