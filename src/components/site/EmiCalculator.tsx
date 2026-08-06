import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    Math.round(n),
  );

export function EmiCalculator() {
  const [price, setPrice] = useState(15000000);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, principal, interest, total, downPayment } = useMemo(() => {
    const downPayment = (price * downPct) / 100;
    const principal = Math.max(price - downPayment, 0);
    const r = rate / 12 / 100;
    const n = years * 12;
    const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return { emi, principal, interest: total - principal, total, downPayment };
  }, [price, downPct, rate, years]);

  const data = [
    { name: "Principal", value: principal },
    { name: "Total Interest", value: interest },
  ];

  return (
    <div className="grid gap-10 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)] md:p-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="emi-price">Property price</Label>
            <Input
              id="emi-price"
              type="number"
              value={price}
              min={1000000}
              step={100000}
              onChange={(e) => setPrice(Number(e.target.value) || 0)}
              className="w-44 text-right"
            />
          </div>
          <Slider value={[price]} min={2000000} max={200000000} step={500000} onValueChange={(v) => setPrice(v[0] ?? price)} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Label>Down payment ({downPct}%)</Label>
            <span className="text-sm text-muted-foreground">{inr(downPayment)}</span>
          </div>
          <Slider value={[downPct]} min={10} max={60} step={1} onValueChange={(v) => setDownPct(v[0] ?? downPct)} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Label>Interest rate</Label>
            <span className="text-sm text-muted-foreground">{rate.toFixed(2)}% p.a.</span>
          </div>
          <Slider value={[rate]} min={7} max={12} step={0.05} onValueChange={(v) => setRate(v[0] ?? rate)} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <Label>Loan tenure</Label>
            <span className="text-sm text-muted-foreground">{years} years</span>
          </div>
          <Slider value={[years]} min={1} max={30} step={1} onValueChange={(v) => setYears(v[0] ?? years)} />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl surface-navy p-6 text-center">
          <p className="eyebrow">Monthly EMI</p>
          <p className="mt-2 font-display text-4xl text-gradient-gold">{inr(emi)}</p>
          <p className="mt-2 text-xs text-navy-foreground/60">
            LTV {((principal / Math.max(price, 1)) * 100).toFixed(0)}% · {years * 12} instalments
          </p>
        </div>

        <div className="h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3} stroke="none">
                <Cell fill="var(--color-chart-2)" />
                <Cell fill="var(--color-chart-1)" />
              </Pie>
              <Tooltip formatter={(v: number) => inr(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <dl className="space-y-2 text-sm">
          {[
            ["Loan amount", inr(principal)],
            ["Down payment", inr(downPayment)],
            ["Total interest", inr(interest)],
            ["Total payment", inr(total)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-border pb-2">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
