import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../context/user.context";

export const RequireAuth = () => {
    const { user } = useUserContext();

    return (
        !user?.auth
            ? <Navigate to={"/login"} />
            : <Outlet />
    )
};