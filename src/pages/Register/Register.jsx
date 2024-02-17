import { useForm } from "react-hook-form"
import { Header } from "../../components/Header/Header"
import { Input } from "../../components/Input/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Validation } from "../../components/ValidationZot"
import { Api } from "../../services/api"
import style from "./style.module.scss"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Register = () => {
    const [loading, setLoading] = useState()
    const navi = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(Validation),
    })
    const registerUser = async (form) => {
      try {
        setLoading(true)
        const { data } = await Api.post("/client", form)
            toast.success("Voce foi redirecionado para o login 🚀")
            navi("/")
        } catch (error) {
            toast.warning(`${error.message} 😡`)
        } finally {
            setLoading(false)
        }
    }
    const submit = (dataForm) => {
        const { email, password, name, telefone } = dataForm
        const newForm = {
            email:email,
            senha:password,
            nome:name,
            telefone:telefone,
        }
        console.log(newForm)
        registerUser(newForm)
    }

    return (
        <div className={style.div}>
            <Header visible={true} />
            <main className={style.main}>
                <h1 className="title white">Crie uma conta</h1>
                <span className="title headline grey">
                    Rapido e gratis, vamos nessa 🚀
                </span>
                <div>
                    <form onSubmit={handleSubmit(submit)}>
                        <div>
                            <Input
                                label="Nome completo"
                                type="text"
                                placeholder="Digite seu Nome Completo"
                                {...register("name")}
                                error={errors.name}
                            />
                            <Input
                                label="Email"
                                type="text"
                                placeholder="Digite seu email"
                                {...register("email")}
                                error={errors.email}
                            />
                            <Input
                                label="Senha"
                                type="password"
                                placeholder="Digite seu senha"
                                {...register("password")}
                                error={errors.password}
                            />
                            <Input
                                label="Confirme sua senha"
                                type="password"
                                placeholder="Confirme sua senha"
                                {...register("confirmPassword")}
                                error={errors.confirmPassword}
                            />
                            <Input
                                label="Contato"
                                type="text"
                                placeholder="Opção de contato contato"
                                {...register("telefone")}
                                error={errors.telefone}
                            />
                            <button className="button">
                                {loading ? "Cadastrando" : "Cadastre-se"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
