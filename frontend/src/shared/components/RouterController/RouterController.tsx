import { Route, Routes } from "react-router-dom";
import { Login } from "../../../pages/Login/Login";
import { NewsRouter } from "../../../pages/News/News";

export const RouterController = () => {

    return (
        <Routes>
            <Route
                path='login/*'
                element={<Login />}
            />

            <Route
                path='/*'
                element={<NewsRouter />}
            />
        </Routes>
    )
}