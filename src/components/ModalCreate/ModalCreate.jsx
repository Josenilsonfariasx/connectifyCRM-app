import { MdClose } from "react-icons/md"

import style from "./style.module.scss"
import { Input } from "../Input/Input"
import { useForm } from "react-hook-form"
import { useTechContext } from "../../providers/TechContext"

export const ModalCreate = ({ visible }) => {
    const { register, handleSubmit } = useForm()
    const { createContact } = useTechContext()

    const submit = async (dataForm) => {
        await createContact(dataForm)
        visible(false)
    }
    return (
        <div role="dialog" className={style.modalOverlay}>
            <div className={style.modal}>
                <div className={style.modalHeader}>
                    <span className="title two white">
                        Cadastrar Contato
                    </span>
                    <button onClick={() => visible(false)}>
                        <MdClose />
                    </button>
                </div>
                <div className={style.divForm}>
                    <form onSubmit={handleSubmit(submit)}>
                        <Input
                            label="Nome"
                            type="text"
                            placeholder="Digite o nome do contato"
                            {...register("nome")}
                        />
                        <Input
                            label="email"
                            type="email"
                            placeholder="Digite o email do contato"
                            {...register("email")}
                        />
                        <Input
                            label="Contato"
                            type="text"
                            placeholder="Digite o telefone do contato"
                            {...register("telefone")}
                        />
                        <button className="button">Cadastrar Contato</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
