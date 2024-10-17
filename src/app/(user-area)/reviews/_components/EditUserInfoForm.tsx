'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/Form";
import { Input } from "@/components/Input";
import { useGlobalStore } from "@/store/globalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleX, Loader2, User2 } from "lucide-react";
import { Button } from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { DropFilesContainer } from "./DropFilesContainer";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/Select";
import { updateUser } from "@/actions/user/updateUser";
import { getPresignedUrl } from "@/actions/upload/getPresignedUrl";
import { uploadFile } from "@/actions/upload/uploadFile";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { queryClient } from "@/lib/queryClient";
import { USER_QUERY_KEY } from "@/lib/queryClientKey";

interface IUpload {
  file: File;
  progress: number;
}

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
  title: z
    .string()
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres',
    })
    .optional(),
});

export function EditUserInfoForm() {
  const { user } = useGlobalStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      username: user?.username,
      title: user?.title,
    },
  });

  const [upload, setUpload] = useState<IUpload | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const convertBytesToMegabytes = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2).replace('.', ',');

  const submitAction: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
    try {
      setIsSubmitting(true);

      const updatedUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        title: values.title ? values.title : user?.title,
      }

      await updateUser({ updatedUser });

      if (upload !== undefined) {
        const { signedUrl } = (await getPresignedUrl(upload.file.name)).data;
        const uploadProfilePictureResponse = await uploadFile(signedUrl, upload.file);

        if (uploadProfilePictureResponse.statusText !== 'OK') {
          toast.error('Erro: Não foi possível fazer o upload da foto.');
          setIsSubmitting(false);
          return
        }
      }
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY })
      window.location.reload();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('ERRO: ' + error.message)
      }
      toast.error('ERRO: ' + error)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitAction)}
        className="w-full h-full flex flex-col gap-4 py-2"
      >
        <div className="w-full h-fit flex justify-between items-center gap-8">
          <div className="w-[150px] h-28 flex flex-col justify-center items-center">
            {
              user?.profilePicture !== undefined
                ? <Image src={user?.profilePicture} alt='Sua foto de perfil' height={100} width={100} />
                : <div className="w-full h-full bg-gray-500 flex justify-center items-center rounded-lg">
                  <User2 color="white" size={50} />
                </div>
            }
          </div>
          <div className="w-full h-28 flex flex-col">
            <DropFilesContainer setUpload={setUpload} />
            {
              upload !== undefined && (
                <div className="w-full flex justify-between items-center">
                  <Button
                    size='icon'
                    variant='destructive'
                    className="h-6 w-6 p-0"
                    onClick={() => setUpload(undefined)}
                  >
                    <CircleX size={18} />
                  </Button>
                  <span className="w-[220px] truncate">
                    {upload?.file.name}
                  </span>
                  <span>{convertBytesToMegabytes(upload?.file.size)} MB</span>
                </div>
              )
            }
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-4 text-start">
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira seu nome..."
                      type="text"
                      className="text-slate-900"
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
                  <FormLabel>Sobrenome:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira seu sobrenome..."
                      className="text-slate-900"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Usuário:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira seu usuário..."
                    className="text-slate-900"
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
            defaultValue={user?.title}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título:</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger defaultValue={field.value} className="text-slate-900">
                      <SelectValue placeholder="Selecione o título." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="🎖️ Top Gamer">🎖️ Top Gamer</SelectItem>
                    <SelectItem value="Platinador">Platinador</SelectItem>
                    <SelectItem value="Sommelier de Indies">Amante dos Indie</SelectItem>
                    <SelectItem value="☣️ Hardcore Gamer ☣️">☣️ Hardcore Gamer ☣️</SelectItem>
                    <SelectItem value="Casual Player">Casual Player</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button variant='outline' type="submit" className="text-slate-900">
          {
            isSubmitting
              ? <>
                <Loader2 className="mr-2 animate-spin" /> Confirmando...
              </>
              : 'Confirmar'
          }
        </Button>
      </form>
    </Form >
  )
}
