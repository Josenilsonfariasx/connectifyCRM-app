import { useState } from "react"
import icon_cross from "../../assets/icon-cross.svg"
import { TechCard } from "./TechCard/TechCard"
import { ModalCreate } from "../ModalCreate/ModalCreate"
import { ModalEdit } from "../ModalEdit/ModalEdit"
import style from "./style.module.scss"
import { useUserContext } from "../../providers/UserContext"
import { useTechContext } from "../../providers/TechContext"
export const TechList = () => {
    const [visible, setVisible] = useState(false)
    const [editVisible, setEdit] = useState(false)
    const [EditModaValue, setValueModalEdit] = useState()
    const {tech} = useUserContext()
    return (
        <>
            <section className={style.section}>
                <div>
                    <span className="title two white">Contatos</span>
                    <img
                        src={icon_cross}
                        onClick={() => setVisible(true)}
                    ></img>
                </div>

                <div className={style.list}>
                    <ul>
                        {tech
                            ? tech.map((techs) => (
                                    <TechCard
                                        key={techs.id}
                                        title={techs.nomeCompleto}
                                        status={techs.email}
                                        id={techs.id}
                                        visible = {editVisible}
                                        setVisible = {setEdit}
                                        EditModaValue={setValueModalEdit}
                                    />
                                ))
                            : null}
                    </ul>
                        {visible ? <ModalCreate visible={setVisible} /> : null}
                        {editVisible ? <ModalEdit EditModaValue={EditModaValue} visible={setEdit} />: null}
                </div>
            </section>
        </>
    )
}
