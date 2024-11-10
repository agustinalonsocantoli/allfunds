import React, { Dispatch, SetStateAction, useContext } from "react";
import { UserInt } from "../../interfaces/UserInt";
import { NavigateFunction } from "react-router-dom";

export interface UserContext {
    user: UserInt;
    setUser: Dispatch<SetStateAction<UserInt>>
    login: (token: string, user: UserInt, navigate: NavigateFunction) => void
    logout: (navigate: NavigateFunction) => void
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
    login: (token: string, user: UserInt, navigate: NavigateFunction) => { },
    logout: (navigate: NavigateFunction) => { },
})

export const useUserContext = () => useContext(UserContext)