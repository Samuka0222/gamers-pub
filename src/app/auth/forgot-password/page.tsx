import { ForgotPasswordForm } from "./_components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <section className="w-full h-full min-h-full max-h-full flex flex-col justify-center items-center py-6 px-5 gap-4">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h2 className="text-3xl font-semibold text-center text-white">Recuperação de Conta</h2>
        <p className="text-lg font-normal text-center w-[90%] lg:w-[600px] text-white">
          Siga o passo a passo abaixo para poder recuperar a sua conta.
        </p>
        <div className="w-full flex flex-col gap-2 justify-center items-center">
          <h3 className="text-white text-xl font-medium">1º passo: Informe o e-mail da sua conta abaixo:</h3>
          <ForgotPasswordForm />
        </div>
        <div className="w-full flex flex-col gap-2 justify-center items-center">
          <h3 className="text-white text-xl font-medium">2º passo: Você receberá um e-mail com novas instruções.</h3>
          <p className="text-lg font-normal text-center w-[90%] lg:w-[600px] text-white">Verifique seu e-mail para continuar o processo de recuperação de conta!</p>
        </div>
      </div>
    </section>
  )
}
