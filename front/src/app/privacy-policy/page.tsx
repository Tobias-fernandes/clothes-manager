"use client";

import { Button } from "@/components/ui/button";
import PrivacyPolicy from "./clothes_manager_termos_privacidade.mdx";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <>
      <Button variant={"ghost"} asChild>
        <Link href="/sign-up" className="flex items-center gap-1">
          <ArrowLeft className="mr-2" />
          Voltar
        </Link>
      </Button>
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyPage;
