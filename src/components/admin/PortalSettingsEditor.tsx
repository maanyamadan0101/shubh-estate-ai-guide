import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getPortalSettings, savePortalSetting } from "@/lib/admin.portal.functions";

type SettingKey = "business_profile" | "social" | "seo" | "website";

type PortalField = {
  name: string;
  label: string;
  placeholder?: string;
  help?: string;
  multiline?: boolean;
};

export function PortalSettingsEditor({
  settingKey,
  defaults,
  fields,
  note,
}: {
  settingKey: SettingKey;
  defaults: Record<string, string>;
  fields: PortalField[];
  note?: string;
}) {
  const [form, setForm] = useState<Record<string, string>>(defaults);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();
  const save = useServerFn(savePortalSetting);
  const { data, isLoading } = useQuery({
    queryKey: ["portal-settings"],
    queryFn: () => getPortalSettings(),
  });

  useEffect(() => {
    if (!data) return;
    setForm({ ...defaults, ...(data[settingKey] ?? {}) });
  }, [data, settingKey]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      await save({ data: { key: settingKey, value: form } });
      toast.success("Settings saved");
      await queryClient.invalidateQueries({ queryKey: ["portal-settings"] });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save settings");
    } finally {
      setSaving(false);
    }
  }

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading settings…</p>;

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={`${settingKey}-${field.name}`}>{field.label}</Label>
          {field.multiline ? (
            <Textarea
              id={`${settingKey}-${field.name}`}
              value={form[field.name] ?? ""}
              onChange={(event) => setForm((prev) => ({ ...prev, [field.name]: event.target.value }))}
              placeholder={field.placeholder}
              rows={4}
            />
          ) : (
            <Input
              id={`${settingKey}-${field.name}`}
              value={form[field.name] ?? ""}
              onChange={(event) => setForm((prev) => ({ ...prev, [field.name]: event.target.value }))}
              placeholder={field.placeholder}
            />
          )}
          {field.help ? <p className="text-xs text-muted-foreground">{field.help}</p> : null}
        </div>
      ))}

      {note ? <p className="rounded-xl bg-muted/60 p-4 text-xs leading-5 text-muted-foreground">{note}</p> : null}

      <Button type="submit" variant="gold" disabled={saving}>
        <Save className="size-4" aria-hidden="true" />
        {saving ? "Saving…" : "Save Settings"}
      </Button>
    </form>
  );
}
