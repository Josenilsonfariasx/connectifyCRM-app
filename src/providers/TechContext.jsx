import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Api } from "../services/api"
import { useUserContext } from "./UserContext"
import { toast } from "react-toastify"

export const TechContext = createContext({})

export const TechProvider = ({ children }) => {
    const { tech, setTech } = useUserContext()
    let newTech = {}

    const navi = useNavigate()
    const token = localStorage.getItem("@crm-token")
    const id = localStorage.getItem("@crm-id")
    const createContact = async (form) => {
      const IdUsers = localStorage.getItem("@crm-id")
        if (token) {
            try {
                const { data } = await Api.post(`/contact/id?id=${IdUsers}`, form, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                const { nomeCompleto, email, id, telefone, clientId, communications } = data
                newTech = {
                    id,
                    nomeCompleto,
                    email,
                    telefone,
                    clientId,
                    communications
                }
                const add = { ...newTech }
                setTech([...tech, add])
                toast.success("Adicionado com sucesso")
            } catch (error) {
              console.log(error)
            }
        } else {
            toast.warning("Voce precisa estar logado para criar")
            navi("/")
        }
    }

    const removeContact = async (idTech) =>{
        if(token) {
            try {
                const {data} = await Api.delete(`/contact/id?id=${idTech}`, {
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                })
                const newTech = tech.filter((techs)=>{
                    return techs.id != idTech
                })
                setTech(newTech)
                toast.success("Apagado com sucesso")
            } catch (error) {
                toast.warning("Ocerreu um problema, tente novamente mais tarde")
            }
        }else{
            toast.warning("Voce precisa estar logado")
        }
    }

    const editTech = async (idTech, status) =>{
        if(token){
            try {
                const {data} = await Api.put(`/contact/update/`,status, {
                    headers:{ 
                        Authorization: `Bearer ${token}`
                    }
                })
                const updatedTech = data;
                const techs = tech.map((techItem) => {
                    if (techItem.id === idTech) {
                        return updatedTech;
                    } else {
                        return techItem;
                    }
                });
                setTech(techs);
                toast.success("Editado com sucesso")
            } catch (error) {
              {'Failed to Update Contact:All fields are required'.includes(error.response.data.error) ? toast.warning("Preencha pelo menos um dos campos") : null}
            }
        }
    }
    return (
        <TechContext.Provider value={{ createContact: createContact, removeTech: removeContact, editTech}}>
            {children}
        </TechContext.Provider>
    )
}

export const useTechContext = () => useContext(TechContext)
