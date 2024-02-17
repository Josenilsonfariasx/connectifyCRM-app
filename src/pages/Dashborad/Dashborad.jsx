import { useEffect, useState } from "react"
import { Header } from "../../components/Header/Header"
import style from "./style.module.scss"
import { useUserContext } from "../../providers/UserContext"
import { useNavigate } from "react-router-dom"
import { TechList } from "../../components/TechList/TechList"

export const Dashboard = () => {
    const navi = useNavigate()
    const { user } = useUserContext()
    return (
        <div className={style.div}>
            <Header visible={true} />
            <main className={style.main}>
                <div className={style.user_}>
                    <div className="container">
                        <h2 className="title white">Olá {user.name}</h2>
                        <span className="title grey headline">
                            {user.course_module}
                        </span>
                    </div>
                </div>
                <div className={style.info}>
                    <TechList />
                </div>
            </main>
        </div>
    )
}
