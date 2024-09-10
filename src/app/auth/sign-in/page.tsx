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
            <SignInForm />
          </TabsContent>
          <TabsContent value="signUp">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
