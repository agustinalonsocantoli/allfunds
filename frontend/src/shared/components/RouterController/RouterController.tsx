import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../../pages/Login/Login";
import { NewsRouter } from "../../../pages/News/News";
import { useUserContext } from "../../context/user.context";

export const RouterController = () => {
    const { user } = useUserContext()

    return (
        <Routes>
            <Route
                path='login/*'
                element={
                    user?.auth
                        ? <Navigate to={"/"} />
                        : <Login />
                }
            />

            <Route
                path='/*'
                element={<NewsRouter />}
            />
        </Routes>
    )
}