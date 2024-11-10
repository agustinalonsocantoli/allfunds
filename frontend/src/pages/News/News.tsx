import { Route, Routes } from "react-router-dom"
import { RequireAuth } from "../../shared/components/RequireAuth/RequireAuth"
import { NewsIndex } from "./views/Index/Index"
import { CreateNew } from "./views/Create/CreateNew"
import { NewsArchived } from "./views/Archived/Archived"

export const NewsRouter = () => {
    return (
        <Routes>
            <Route
                index
                element={<NewsIndex />}
            />

            <Route
                path="/archived"
                element={<NewsArchived />}
            />

            <Route
                element={<RequireAuth />}
            >
                <Route path="/create" element={<CreateNew />} />
            </Route>
        </Routes>
    )
}