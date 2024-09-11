import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import { SignInForm } from "./_components/SignInForm";
import { SignUpForm } from "./_components/SignUpForm";

export default function SignInPage() {
  return (
    <section className="w-full min-h-full max-h-full flex flex-1 justify-center items-center pt-6">
      <div className="w-full min-h-full max-h-full flex flex-1 justify-center items-center">
        <Tabs defaultValue="signIn" className="w-[400px] h-full">
          <TabsList className="w-full h-12 mb-2">
            <TabsTrigger className="text-lg" value="signIn">
              Login
            </TabsTrigger>
            <TabsTrigger className="text-lg" value="signUp">
              Cadastrar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signIn">
            <div className="w-full flex flex-col justify-center items-center text-white gap-3 mb-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Faça seu Login!!</h2>
              <p className="text-lg">Efetue o Login para acessar o Gamers&apos; Pub.</p>
            </div>
            <SignInForm />
          </TabsContent>
          <TabsContent value="signUp">
            <div className="w-full flex flex-col justify-center items-center text-white gap-3 mb-3">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Bem-vindo(a)!!</h2>
              <p className="text-lg text-center">Para começar a utilizar o Gamers&apos; Pub, é preciso fazer seu cadastro preenchendo o formulário abaixo.</p>
            </div>
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </section >
  )
}
