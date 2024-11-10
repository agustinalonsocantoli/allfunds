import React, { Dispatch, SetStateAction, useContext } from "react";
import { UserInt } from "../../interfaces/UserInt";

export interface UserContext {
    user: UserInt;
    setUser: Dispatch<SetStateAction<UserInt>>
    login: (token: string, user: UserInt, navigate: (path?: string) => void) => void
    logout: (navigate: (path?: string) => void) => void
}

export const UserContext = React.createContext<UserContext>({
    user: {
        auth: false,
        _id: null,
        name: null,
        lastname: null,
        email: null
    },
    setUser: (user: SetStateAction<UserInt>) => { },
    login: (token: string, user: UserInt, navigate: (path?: string) => void) => { },
    logout: (navigate: (path?: string) => void) => { },
})

export const useUserContext = () => useContext(UserContext)