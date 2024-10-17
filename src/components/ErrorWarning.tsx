export function ErrorWarning({ errorCause }: { errorCause: string }) {
  return (
    <div className="w-full h-fit flex flex-col justify-center items-center gap-2 text-center mt-6">
      <h3 className="text-red-500 font-medium text-lg">Opa ... parece que temos um problema :/</h3>
      <p>A requisição acabou gerando um erro, tente reiniciar a página.</p>
      <p>Causa do Error: {errorCause}</p>
    </div>
  )
}
