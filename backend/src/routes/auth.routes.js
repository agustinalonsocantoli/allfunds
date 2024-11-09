import { Router } from "express"
import AuthControllers from "../app/controllers/auth.controllers.js"

const router = Router()

router.post("/auth/login", AuthControllers.login)

export default router