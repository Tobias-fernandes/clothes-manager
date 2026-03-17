"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/input-password";
import { Loader2Icon } from "lucide-react";
import { signIn } from "@/features/auth/actions/sign-in";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email({ message: "Por favor, insira um e-mail válido." }),

  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 6 caracteres.",
  }),
});

const SignInHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <p className="flex text-4xl font-extrabold">Clothes Manager</p>
      <h1 className="text-2xl leading-tight tracking-tight md:text-3xl">
        Acesse sua conta
      </h1>
    </div>
  );
};

const SignInFooter: React.FC = () => (
  <p>
    <span>Não tem uma conta?</span>{" "}
    <Link href={"/sign-up"} className="font-bold underline">
      Clique aqui
    </Link>
  </p>
);

const SignInForgot: React.FC = () => (
  <div className="flex items-center justify-end">
    <Link href={"/"} className="text-sm text-primary/50">
      Esqueceu sua senha?
    </Link>
  </div>
);

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { success, error } = await signIn(values.email, values.password);

      if (!success) {
        throw new Error(
          error || "Falha ao realizar login. Por favor, tente novamente.",
        );
      }

      toast.success("Login realizado com sucesso!");
      router.push("/");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu e-mail"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SignInForgot />

        <Button
          type="submit"
          size={"lg"}
          className="mt-5 w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <>
              <Loader2Icon className="animate-spin" />
              <span>Entrando...</span>
            </>
          )}
          {!form.formState.isSubmitting && <span>Entrar</span>}
        </Button>
      </form>
    </Form>
  );
};

const SignInFormComponent: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <SignInHeader />
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
        <SignInFooter />
      </div>
    </div>
  );
};

export { SignInFormComponent };
