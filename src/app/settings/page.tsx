import type { Metadata } from "next";
import { SettingsPage } from "@/features/settings/settings-page";

export const metadata: Metadata = {
  title: "Settings | VeriStream",
  description: "Manage illustrative VeriStream workspace preferences.",
};

export default function SettingsRoute() {
  return <SettingsPage />;
}
