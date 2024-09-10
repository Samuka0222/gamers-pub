"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "./InputOtp"
import { makeVerifyAccount } from "@/actions/auth/makeVerifyAccount"
import { toast } from "sonner"
import { AxiosError } from "axios"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "O código deve possuir 6 digitos.",
  }),
})

export function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  const submitAction = async (values: z.infer<typeof FormSchema>) => {
    try {
      const data = {
        email: 'mmachado0222@gmail.com',
        code: values.pin
      };
      await makeVerifyAccount(data);
      toast.success('Usuário confirmado!')
      form.reset();
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        toast.error(error.message)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitAction)} className="w-fit flex flex-col justify-center items-center space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center items-center">
              <FormLabel className="text-center w-full">Código de Verificação</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Insira o código fornecido através do seu e-mail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant='outline' type="submit">Enviar</Button>
      </form>
    </Form>
  )
}
