import { Link, useNavigate } from "react-router-dom"
import { Header } from "../../components/Header/Header"
import { Input } from "../../components/Input/Input"
import style from "./style.module.scss"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ValidationLogin } from "./ValidationLogin"
import { useState } from "react"
import { useUserContext } from "../../providers/UserContext"
import { toast } from "react-toastify"
export const SingIn = () => {
    const [loading, setLoading] = useState()
    const { login } = useUserContext()
    const navi = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ValidationLogin),
    })

    const submit = (dataForm) => {
        try {
            setLoading(true)
            const {email, password} = dataForm
            const obj = {
              email: email,
              senha: password
            }
            login(obj)
        } catch (error) {
            toast.warning(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={style.div}>
            <Header visible={false} />
            <main className={style.main}>
                <h1 className="title white">Login</h1>
                <div>
                    <form onSubmit={handleSubmit(submit)}>
                        <div>
                            <Input
                                label="Email"
                                type="text"
                                placeholder="Digite seu email"
                                {...register("email")}
                                error={errors.email}
                            />
                            <Input
                                label="senha"
                                type="password"
                                placeholder="Digite seu senha"
                                {...register("password")}
                                error={errors.password}
                            />
                            <button className="button">
                                {!loading ? "Entrar" : "Tentando conectar"}
                            </button>
                        </div>
                    </form>
                    <span className="title headline grey">
                        Ainda não possui uma conta?
                    </span>
                    <button
                        className="button variant"
                        onClick={() => navi("/register")}
                    >
                        Cadastre-se
                    </button>
                </div>
            </main>
        </div>
    )
}
