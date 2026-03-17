import { ReactNode } from "react";
import CookieConsent from "../ui/cookie-consent";

export default function CookieConsentLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <CookieConsent />
      {children}
    </>
  );
}
