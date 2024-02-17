import icon_paint from "../../../assets/paint.svg"
import icon_trash from "../../../assets/trash.svg"
import { useTechContext } from "../../../providers/TechContext"
import { useUserContext } from "../../../providers/UserContext"
import style from "./style.module.scss"

export const TechCard = ({title, status, id, visible, setVisible, EditModaValue}) => {
    const {removeTech, editTech} = useTechContext()
    const { tech, setTech } = useUserContext()
    return (
        <>
            <li className={style.li}>
                <div>
                    <div>
                        <span className="title two white">{title}</span>
                    </div>
                    <div>
                        <span className="title handline grey">{status}</span>
                        <img src={icon_paint} alt="pincel" onClick={(()=>{
                            const editModal = tech.filter ((techs)=>{
                                return techs.id === id
                            })
                            EditModaValue(editModal)
                            setVisible(true)
                        })}/>
                        <img src={icon_trash} alt="lixeira" onClick={(()=> {
                            removeTech(id)
                        })} />
                    </div>
                </div>
            </li>
        </>
    )
}
