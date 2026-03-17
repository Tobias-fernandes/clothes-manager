"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCookie, setCookie } from "@/shared/lib/cookies/cookie.client";
import { COOKIE_CONFIG } from "@/shared/config/cookie.config";
import { COOKIE_NAMES } from "@/shared/constants/cookie-names";

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showCookieCard = useCallback(() => {
    const consent = getCookie(COOKIE_NAMES.NAME);
    if (!consent) setVisible(true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    showCookieCard();
  }, [showCookieCard]);

  const handleAccept = () => {
    setCookie(COOKIE_NAMES.NAME, "true", COOKIE_CONFIG);
    setVisible(false);
  };

  const handleDecline = () => {
    setCookie(COOKIE_NAMES.NAME, "false", COOKIE_CONFIG);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-4 max-sm:right-4 z-50 flex justify-center animate-in fade-in slide-in-from-bottom-4"
    >
      <Card className="max-w-lg w-full shadow-lg border border-border bg-background/95 backdrop-blur">
        <CardContent className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Nós usamos cookies para melhorar sua experiência e analisar o
            tráfego. Ao clicar em &quot;Aceitar&quot;, você concorda com nossa{" "}
            <Link href="/privacy-policy" className="underline">
              Política de Cookies
            </Link>
            .
          </p>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Decline
            </Button>
            <Button size="sm" onClick={handleAccept}>
              Accept
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent;
