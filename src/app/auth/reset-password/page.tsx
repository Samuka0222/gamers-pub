// import { InputOTPForm } from "./_components/InputOTPForm";

import { NewPasswordForm } from "./_components/NewPasswordForm";

export default function ResetPasswordPage() {
  return (
    <section className="w-full h-full min-h-full max-h-full flex flex-col justify-center items-center py-6 px-5 ">
      <div className="w-full flex flex-col justify-center items-center gap-4 text-white">
        <h2 className="text-3xl font-semibold text-center">Crie sua nova senha!</h2>
        <div className="w-full flex flex-col justify-center gap-2 items-center">
          <h3 className="text-white text-xl font-medium">4º passo: Preencha o formulário abaixo:</h3>
          <p className="text-lg font-normal text-center w-[90%] lg:w-[600px]">
            Com o código em mãos que você obteve pelo e-mail de recuperação de conta, agora você deve criar sua nova senha através do formulário abaixo.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-5">
        <NewPasswordForm />
      </div>
    </section>
  )
}
