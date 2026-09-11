import { useMemo, useState } from "react";
import {
  calculateHaryanaPurchaseCharges,
  type HaryanaAreaType,
  type HaryanaBuyerType,
} from "@/lib/haryana-stamp-duty";

const BUYER_OPTIONS: Array<{ value: HaryanaBuyerType; label: string }> = [
  { value: "male", label: "Male sole buyer" },
  { value: "female", label: "Female sole buyer" },
  { value: "joint_male_female", label: "Male + female joint buyers" },
];

const AREA_OPTIONS: Array<{ value: HaryanaAreaType; label: string }> = [
  { value: "urban", label: "Urban / within municipal limits" },
  { value: "rural", label: "Rural / outside municipal limits" },
];

function numericValue(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function compactINR(value: number) {
  if (value >= 10_000_000) return `₹${(value / 10_000_000).toFixed(2).replace(/\.00$/, "")} Cr`;
  if (value >= 100_000) return `₹${(value / 100_000).toFixed(2).replace(/\.00$/, "")} Lakh`;
  return formatINR(value);
}

export function HaryanaStampDutyCalculator() {
  const [agreementValue, setAgreementValue] = useState("10000000");
  const [collectorRateValue, setCollectorRateValue] = useState("");
  const [areaType, setAreaType] = useState<HaryanaAreaType>("urban");
  const [buyerType, setBuyerType] = useState<HaryanaBuyerType>("female");

  const result = useMemo(
    () =>
      calculateHaryanaPurchaseCharges({
        agreementValue: numericValue(agreementValue),
        collectorRateValue: numericValue(collectorRateValue),
        areaType,
        buyerType,
      }),
    [agreementValue, collectorRateValue, areaType, buyerType],
  );

  const hasValue = result.assessableValue > 0;

  return (
    <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
      <div className="p-6 sm:p-8">
        <p className="eyebrow">Property details</p>
        <h2 className="mt-2 font-display text-2xl sm:text-3xl">Calculate Haryana purchase charges</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This estimate is for an ordinary sale/conveyance deed. Enter the transaction value and,
          where known, the applicable Collector-rate valuation. The calculator uses the higher
          entered value for planning.
        </p>

        <div className="mt-7 grid gap-5">
          <label className="grid gap-2 text-sm font-medium">
            Agreement / transaction value (₹)
            <input
              type="number"
              min="0"
              step="10000"
              inputMode="numeric"
              value={agreementValue}
              onChange={(event) => setAgreementValue(event.target.value)}
              className="h-12 rounded-lg border border-input bg-background px-4 text-base outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              aria-describedby="agreement-value-help"
            />
            <span id="agreement-value-help" className="text-xs font-normal text-muted-foreground">
              {numericValue(agreementValue) ? compactINR(numericValue(agreementValue)) : "Enter the deed consideration."}
            </span>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Collector-rate valuation (₹) <span className="font-normal text-muted-foreground">optional</span>
            <input
              type="number"
              min="0"
              step="10000"
              inputMode="numeric"
              value={collectorRateValue}
              onChange={(event) => setCollectorRateValue(event.target.value)}
              placeholder="Enter if known"
              className="h-12 rounded-lg border border-input bg-background px-4 text-base outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            />
            <span className="text-xs font-normal text-muted-foreground">
              If omitted, the result is indicative until the applicable Collector rate is verified.
            </span>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Property location category
            <select
              value={areaType}
              onChange={(event) => setAreaType(event.target.value as HaryanaAreaType)}
              className="h-12 rounded-lg border border-input bg-background px-4 text-base outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            >
              {AREA_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium">
            Purchaser category
            <select
              value={buyerType}
              onChange={(event) => setBuyerType(event.target.value as HaryanaBuyerType)}
              className="h-12 rounded-lg border border-input bg-background px-4 text-base outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            >
              {BUYER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {buyerType === "joint_male_female" ? (
              <span className="text-xs font-normal text-muted-foreground">
                Joint male/female rates are a planning convention. Confirm the actual HARIS/e-GRAS demand for the ownership structure and shares.
              </span>
            ) : null}
          </label>
        </div>
      </div>

      <div className="border-t border-border bg-muted/35 p-6 sm:p-8 lg:border-l lg:border-t-0">
        <p className="eyebrow">Calculation result</p>
        <div className="mt-5 space-y-4" aria-live="polite">
          <ResultRow
            label="Assessable value used"
            value={hasValue ? formatINR(result.assessableValue) : "—"}
            note={result.collectorRateProvided ? "Higher of entered agreement and Collector-rate values" : "Agreement value only; Collector-rate value not entered"}
          />
          <ResultRow
            label={`Stamp duty (${(result.stampDutyRate * 100).toFixed(0)}%)`}
            value={hasValue ? formatINR(result.stampDuty) : "—"}
            note={areaType === "urban" ? "Urban rate selected" : "Rural rate selected"}
          />
          <ResultRow
            label="Registration fee"
            value={hasValue ? formatINR(result.registrationFee) : "—"}
            note="Haryana slab-based fee; maximum ₹50,000"
          />
        </div>

        <div className="mt-5 rounded-xl border border-gold/30 bg-gold/5 p-5">
          <p className="text-sm font-medium text-muted-foreground">Basic government charges</p>
          <p className="mt-1 font-display text-3xl">
            {hasValue ? formatINR(result.totalBasicGovernmentCharges) : "—"}
          </p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Stamp duty + registration fee only. Service charges, mutation, deed-specific levies,
            exemptions and professional charges are not included.
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-border bg-background/80 p-4 text-xs leading-5 text-muted-foreground">
          <strong className="text-foreground">Important:</strong> final liability is determined by the
          applicable Haryana registration/HARIS process. Special schemes, family transfers, gifts,
          leases, mortgages and other deed types can follow different rules.
        </div>
      </div>
    </div>
  );
}

function ResultRow({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-right text-lg font-semibold">{value}</p>
      </div>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">{note}</p>
    </div>
  );
}
