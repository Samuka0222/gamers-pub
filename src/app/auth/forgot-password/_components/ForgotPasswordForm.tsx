'use client'

import { Button } from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/Form";
import { Input } from "@/components/Input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import Link from "next/link";
import { makeForgotPassword } from "@/actions/auth/makeForgotPassword";

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Você deve informar um e-mail.',
    })
    .email({
      message: 'Você deve informar um e-mail válido.',
    }),
});

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAction: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    try {
      setIsSubmitting(true);
      await makeForgotPassword(values.email);
      form.reset();
      setIsSubmitting(false);
      toast.success('Um e-mail de redefinição de senha foi enviado!');
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof AxiosError) {
        if (error.status === 404) {
          toast.error('E-mail não encontrado! Tente novamente.');
        }
      } else {
        toast.error('Ocorreu um erro ao tentar resetar a senha.')
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitAction)}
        className="flex flex-col gap-4 py-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Insira seu e-mail..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" variant='link' asChild>
          <Link href='/auth/sign-in' className="text-white hover:text-primary text-lg">
            Lembrou sua senha? Clique aqui para voltar!
          </Link>
        </Button>

        <Button variant='outline' type="submit">
          {
            isSubmitting
              ? <>
                <Loader2 className="mr-2 animate-spin" /> Enviando...
              </>
              : 'Enviar'
          }
        </Button>
      </form>
    </Form>
  )
}
