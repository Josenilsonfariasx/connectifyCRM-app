import { MdClose } from "react-icons/md"

import style from "./style.module.scss"
import { Input } from "../Input/Input"
import { useForm } from "react-hook-form"
import { useTechContext } from "../../providers/TechContext"

export const ModalEdit = ({ visible, EditModaValue }) => {
    const { register, handleSubmit } = useForm()
    const { editTech } = useTechContext()

    const submit = (valueInputs) => {
        const id = EditModaValue[0].id
        const newObj = {
          contactId: id,
          ...Object.fromEntries(Object.entries(valueInputs).filter(([key, value]) => value !== ''))
        }
        editTech(id, newObj)
        visible(false)
    }
    return (
        <div role="dialog" className={style.modalOverlay}>
            <div className={style.modal}>
                <div className={style.modalHeader}>
                    <span className="title two white">Editar Contato</span>
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
                        value={EditModaValue}
                        edit={false}
                        {...register("name")}
                        />
                        <Input
                        label="Email"
                        type="email"
                        placeholder="Digite o email do contato"
                        value={EditModaValue}
                        edit={false}
                        {...register("email")}
                        />
                        <Input
                        label="Telefone"
                        type="text"
                        placeholder="Digite o telefone do contato"
                        value={EditModaValue}
                        edit={false}
                        {...register("telphone")}
                        />
                        <button className="button">Salvar Alterações</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
