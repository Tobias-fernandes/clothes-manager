import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Forbidden: React.FC = () => {
  const content = {
    title: "403",
    subtitle: "Acesso negado.",
    description: "Desculpe, você não tem permissão para acessar esta página.",
    buttonText: "Entrar",
  };

  return (
    <section className="min-h-[80vh] flex items-center h-screen justify-center">
      <div className="py-8 px-4 mx-auto max-w-7xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl sm:text-8xl tracking-tight font-extrabold md:text-9xl">
            {content.title}
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-primary/90 md:text-4xl">
            {content.subtitle}
          </p>
          <p className="mb-4 text-lg font-light">{content.description}</p>
          <Button asChild size={"lg"} className="text-lg transition-all group">
            <Link href={"/sign-in"} className="flex items-center">
              {content.buttonText}{" "}
              <ArrowRight className="ml-2 size-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Forbidden;
