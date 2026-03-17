"use client";

import { Crown, Shield, Landmark } from "lucide-react";
import { SignInFormComponent } from "./_components/signInForm";

const SignInPage = () => {
  const features = [
    {
      name: "Shield",
      text: "Acesso seguro e protegido",
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
    {
      name: "Users",
      text: "Gestão completa de vendas",
      icon: <Landmark className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:w-1/2 bg-muted/30 items-center justify-center">
          <div className="text-center max-w-md px-8">
            <div className="bg-primary/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Crown className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-6 tracking-tight">
              Clothes Manager
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Acesse sua conta para continuar gerenciando sua loja de roupas com
              facilidade e eficiência. Mantenha o controle total sobre seu
              estoque, vendas e clientes em um só lugar.
            </p>

            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 not-last:mb-4"
              >
                <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <span className="text-sm text-muted-foreground">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8">
          <div className="w-full max-w-md">
            <SignInFormComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
