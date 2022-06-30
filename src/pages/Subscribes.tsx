import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated-types";


interface VariablesParams{
  nome:string;
  email:string;
}

export const Subscribe =  () => {
  const navigate = useNavigate()
  const [name, setName] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  
  const [createSubscriber,{loading}] = useCreateSubscriberMutation()
  
  
  // função para mutation
  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();
  await  createSubscriber({
      variables:{
       name,
       email
      }
    })
    navigate('/event')
  
  }

  return (
    <div className="min-h-screen bg-blur bg-cover flex flex-col items-center">
      <div className="w-full max-w-[1100px] flex justify-between mt-20 mx-auto">
        <div className="max-w-[640px]">
          <Logo />
          <h1 className="mt-8 text-[2.5rem] leading-tight">
            Construa uma{" "}
            <strong className="text-blue-500">aplicação completa,</strong> do
            zero, com <strong className="text-blue-500">React </strong>
          </h1>
          <p className="mt-4 text-gray-200 leading-relaxed">
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>
        <div className="">
          <div className="p-8 bg-gray-700 border-gray-500 rounded">
            <strong className="text-2xl">Inscrva-se Gratuitamente</strong>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-2 w-full"
            >
              <input
                type="text"
                className="bg-gray-900 rounded px-5 h-14 "
                placeholder="Seu nome completo"
                onChange={(event) => setName(event.target.value)}
              />
              <input
                type="email"
                className="bg-gray-900 rounded px-5 h-14"
                placeholder="Digite seu email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Garantir minha Vaga
              </button>
            </form>
          </div>
        </div>
      </div>
      <img
        src="/src/assets/code-mockup.png"
        alt="vs-code studio com codigo react js um icone do react e um card simbolisando um formulario de login"
      />
    </div>
  );
};
