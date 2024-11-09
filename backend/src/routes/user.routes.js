import { Router } from "express"
import UserControllers from "../app/controllers/user.controllers.js"

const router = Router()

router.get("/users", UserControllers.index)
router.get("/users/:id", UserControllers.show)
router.post("/users", UserControllers.create)

export default router