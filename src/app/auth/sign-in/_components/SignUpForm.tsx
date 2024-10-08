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
import { makeSignUp } from "@/actions/auth/makeSignUp";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/AlertDialog";

const formSchema = z.object({
  firstName: z
    .string({
      required_error: 'Você deve informar um nome.',
    })
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres',
    }),
  lastName: z
    .string({
      required_error: 'Você deve informar um nome.',
    })
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres',
    }),
  email: z
    .string({
      required_error: 'Você deve informar um e-mail.',
    })
    .email({
      message: 'Você deve informar um e-mail válido.',
    }),
  username: z
    .string({
      required_error: 'Você deve informar um nome.',
    })
    .min(2, {
      message: 'O nome de exibição deve ter pelo menos 2 caracteres',
    })
    .regex(/^[a-zA-Z0-9_.-@]+$/, {
      message: 'Favor só insira o seguintes itens: letras, números, @, _, -',
    }),
  password: z
    .string({
      required_error: 'Você deve informar uma senha.',
    })
    .min(8, {
      message: 'A senha deve ter pelo menos 8 caracteres.',
    })
    .regex(/[A-Z]/, {
      message: "É necessário ter pelo menos 1 letra maiúscula.",
    })
    .regex(/\d/, {
      message: "É necessário ter pelo menos 1 dígito númerico.",
    })
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, {
      message: "Adicione pelo menos um caractere especial, EX: @, #, _, -",
    }),
  confirmPassword: z
    .string({
      required_error: 'Você deve confirmar a senha.',
    })
    .min(8, {
      message: 'As senhas estão com tamanhos diferentes',
    }),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [showPassword, setShowPassword] = useState<"password" | "text">('password')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const submitAction: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error('As duas senhas estão diferentes, favor corrigir.')
      return;
    }
    try {
      setIsSubmitting(true);
      const user = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
      };

      await makeSignUp(user);

      form.reset();
      setIsSubmitting(false);
      toast.success('Usuário criado!')
      setIsDialogOpen(true);
    } catch (error) {
      setIsSubmitting(false);

      if (error instanceof AxiosError) {
        if (error.status === 409) {
          toast.error('Esse e-mail já está cadastrado');
        }
      } else {
        toast.error('Ocorreu um erro ao tentar cadastrar o usuário')
      }
    }
  }

  return (
    <>
      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bem-vindo ao Gamers&apos; Pub</AlertDialogTitle>
            <AlertDialogDescription>
              Seja muito bem-vindo a comunidade Gamer feita para Gamers de verdade! Para continuar com o processo de cadastro, você deve verificar o seu e-mail para confirmar sua conta!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              type="button"
              onClick={() => setIsDialogOpen(false)}
              className="bg-transparent border-gray-400 hover:bg-gray-400"
            >
              Entendi
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitAction)}
          className="flex flex-col gap-4 py-2"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Insira seu nome..."
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Insira seu sobrenome..."
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
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Insira seu usuário..."
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="w-full h-full relative">
                    <Input
                      placeholder="Confirme sua senha..."
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
                  <Loader2 className="mr-2 animate-spin" /> Cadastrando...
                </>
                : 'Cadastrar'
            }
          </Button>
        </form>
      </Form>
    </>
  )
}
