export async function copyToClipboard(value: string): Promise<void> {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard access is not available in this browser context.");
  }

  await navigator.clipboard.writeText(value);
}
