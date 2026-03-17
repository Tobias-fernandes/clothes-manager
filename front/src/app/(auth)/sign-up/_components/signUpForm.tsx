"use client";

import Link from "next/link";

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
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { signUp } from "@/features/auth/actions/sign-up";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { Route } from "next";

const formSchema = z
  .object({
    email: z.email({ message: "Por favor, insira um e-mail válido." }),
    password: z.string().min(6, {
      message: "A senha deve ter pelo menos 6 caracteres.",
    }),
    confirmPassword: z.string().min(6, {
      message: "A senha deve ter pelo menos 6 caracteres.",
    }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Você deve aceitar os termos e condições.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

const SignUpHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <p className="flex text-4xl font-extrabold">Clothes Manager</p>
      <h1 className="text-2xl leading-tight tracking-tight md:text-3xl">
        Crie sua conta
      </h1>
    </div>
  );
};

const SignUpFooter: React.FC = () => (
  <p>
    <span>Já tem uma conta?</span>{" "}
    <Link href={"/sign-in"} className="font-bold underline">
      Entrar
    </Link>
  </p>
);

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      acceptTerms: false,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await signUp(values.email, values.password);

      if (error) {
        throw new Error(error);
      }
      router.push("/" as Route);
      toast.success("Conta criada com sucesso!");
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Digite sua senha novamente"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormControl>
                <FieldGroup className="w-72">
                  <Field orientation="horizontal">
                    <Checkbox
                      id="terms-checkbox-desc"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor="terms-checkbox-desc">
                        Aceito os termos e condições
                      </FieldLabel>
                      <FieldDescription>
                        Ao criar uma conta, você concorda com nossos{" "}
                        <Link
                          href="/privacy-policy"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          termos de serviço
                        </Link>
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={"lg"}
          className="mt-5 w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <>
              <Loader2Icon className="animate-spin" />
              <span>Cadastrando...</span>
            </>
          )}
          {!form.formState.isSubmitting && <span>Cadastrar</span>}
        </Button>
      </form>
    </Form>
  );
};

const SignUpFormComponent: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <SignUpHeader />
        <div className="w-full rounded-2xl sm:w-75">
          <SignUpForm />
        </div>
        <SignUpFooter />
      </div>
    </div>
  );
};

export { SignUpFormComponent };
