import { InputOTPForm } from "./_components/InputOTPForm";

export default function VerifyAccountPage() {
  return (
    <section className="w-full h-full min-h-full max-h-full flex flex-col justify-center items-center py-6 px-5 ">
      <div className="w-full flex flex-col justify-center items-center gap-4 text-white">
        <h2 className="text-3xl font-semibold text-center">Verificação de Conta</h2>
        <p className="text-lg font-normal text-center w-[90%] lg:w-[600px]">
          Você recebeu um e-mail com o código de verificação, preencha o formulário com o código fornecido para validar sua conta e poder realizar o login.
        </p>
      </div>
      <div className="w-full flex justify-center items-center mt-10">
        <InputOTPForm />
      </div>
    </section>
  )
}
