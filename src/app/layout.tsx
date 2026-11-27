import type { ReactNode } from "react";
import type { Metadata } from "next";
import { WalletConnectionProvider } from "@/features/wallet/use-wallet-connection";
import "./globals.css";

export const metadata: Metadata = {
  title: "VeriStream",
  description: "Pay as agents work. Trust what agents deliver.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <WalletConnectionProvider>{children}</WalletConnectionProvider>
      </body>
    </html>
  );
}
