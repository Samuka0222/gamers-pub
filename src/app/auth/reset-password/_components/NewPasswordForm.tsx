"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/Button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/Form"
import { makeNewPassword } from "@/actions/auth/makeNewPassword"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useSearchParams } from "next/navigation";
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/Input"

const FormSchema = z.object({
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
})

export function NewPasswordForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const email = useSearchParams().get('email');
  const code = useSearchParams().get('code');
  if (!email || !code) {
    toast.error('Houve um erro com o e-mail ou o código, tente acessar novamente.')
  };

  const [showPassword, setShowPassword] = useState<"password" | "text">('password')
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submitAction = async (values: z.infer<typeof FormSchema>) => {
    if (values.password !== values.confirmPassword) {
      toast.error('As duas senhas estão diferentes, favor corrigir.')
      return;
    }
    try {
      setIsSubmitting(true);
      const data = {
        email: email!,
        code: code!,
        newPassword: values.password,
      };
      await makeNewPassword(data);
      toast.success('Nova senha criada com sucesso!')
      form.reset();
      setIsSubmitting(false);
      router.push('/auth/sign-in');
    } catch (error) {
      setIsSubmitting(false);
      if (error instanceof AxiosError) {
        toast.error(error.message)
      } else {
        toast.error('Houve um erro ao tentar criar a nova senha.')
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitAction)} className="w-full md:w-[90%] lg:w-[500px] flex flex-col justify-center items-center space-y-6">
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
        <Button variant='outline' type="submit">
          {
            isSubmitting
              ? <>
                <Loader2 className="mr-2 animate-spin" /> Confirmando...
              </>
              : 'Confirmar nova senha'
          }
        </Button>
      </form>
    </Form>
  )
}
