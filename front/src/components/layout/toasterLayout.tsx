import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";

export default function ToasterLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Toaster richColors />
      {children}
    </>
  );
}
