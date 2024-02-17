import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/api";
import { toast } from "react-toastify";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tech, setTech] = useState(null)
    const navi = useNavigate();

    useEffect(() => {
        const authLogin = async () => {
          const token = localStorage.getItem("@crm-token")
          const id = localStorage.getItem("@crm-id")
            if (token) {
                try {
                    const { data } = await Api.get(`/contact/id?id=${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setTech(data);
                    navi("/home");
                } catch (error) {
                    toast.warning(error.message);
                    navi("/");
                }
            } else {
                navi("/");
            }
        };
        authLogin();
    }, []);

    const registerUser = async (form) => {
        try {
            const { data } = await Api.post("/users", form);
            toast.success("Voce foi redirecionado para o login 🚀");
            navi("/");
        } catch (error) {
            toast.warning(`Algo de errado aconteceu, tente novamente😡`);
        }
    };

    const login = async (form) => {
        try {
            const { data } = await Api.post("client/login", form);
            setUser(data);
            localStorage.setItem("@crm-token", data.token);
            localStorage.setItem("@crm-id", data.id);
            toast.success("Logado com sucesso");
            navi("/home");
        } catch (error) {
            {
                'User/Password incorrect'.includes(
                    error.response.data.error
                )
                    ? toast.warning("Email ou Senha incorretos")
                    : null;
            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("@KU-User");
        navi("/");
    };

    return (
        <UserContext.Provider value={{ user, tech, setTech, registerUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
