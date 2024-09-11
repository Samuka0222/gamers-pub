'use client'

import { Button } from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/Form";
import { Input } from "@/components/Input";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { makeSignIn } from "@/actions/auth/makeSignIn";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getExpirationTime } from "@/helpers/getExpirationTime";

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Você deve informar um e-mail.',
    })
    .email({
      message: 'Você deve informar um e-mail válido.',
    }),
  password: z
    .string({
      required_error: 'Você deve informar uma senha.',
    })
    .min(8, {
      message: 'A senha deve ter pelo menos 8 caracteres.',
    }),
});

export function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState<"password" | "text">('password')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submitAction: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    try {
      setIsSubmitting(true);
      const user = {
        email: values.email,
        password: values.password,
      };

      const response = (await makeSignIn(user)).data;
      const tokens = {
        AccessToken: response.AccessToken,
        RefreshToken: response.RefreshToken,
        ExpiresIn: getExpirationTime(response.ExpiresIn)
      }
      localStorage.setItem('tokens', JSON.stringify(tokens));
      form.reset();
      setIsSubmitting(false);
      toast.success('Login efetuado! Iremos te redirecionar.')
      router.push('/');
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof AxiosError) {
        if (error.status === 404) {
          toast.error('Credenciais inválidas! Tente novamente.');
        }
      } else {
        toast.error('Ocorreu um erro ao tentar cadastrar o usuário')
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="w-full h-full relative">
                  <Input
                    placeholder="Insira sua senha..."
                    type={showPassword}
                    {...field}
                  />
                  <Button
                    variant='outline'
                    type="button"
                    className="absolute top-0 right-0 rounded-none rounded-e-lg"
                    onClick={() => setShowPassword(
                      showPassword === 'password' ? 'text' : 'password'
                    )}>
                    {
                      showPassword === 'password' ? (
                        <EyeOff />
                      ) : (
                        <Eye />
                      )
                    }
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" variant='link' asChild>
          <Link href='/auth/forgot-password' className="text-white hover:text-primary text-lg">
            Esqueceu sua senha?
          </Link>
        </Button>

        <Button variant='outline' type="submit">
          {
            isSubmitting
              ? <>
                <Loader2 className="mr-2 animate-spin" /> Validando...
              </>
              : 'Entrar'
          }
        </Button>
      </form>
    </Form>
  )
}
