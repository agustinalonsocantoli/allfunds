import { Router } from "express"
import { AuthToken } from "../app/middlewares/AuthToken.js"
import NewControllers from "../app/controllers/new.controllers.js"
import multer from 'multer'

/** 
 * Utilizamos Multer para poder obtener los archivos Multipart/Form
 * Lo guardamos de forma temporal para obtener el Path que requiere cloudinary
 * https://github.com/expressjs/multer/blob/master/doc/README-es.md
 */
const storage = multer.diskStorage({
    filename: function (_req, file, cb) {
        cb(null, file.fieldname + " - " + Date.now())
    }
})

const upload = multer({ storage: storage })

const router = Router()

router.get("/news", NewControllers.index)
router.post("/news", [AuthToken, upload.single('image')], NewControllers.create)
router.put('/news/:id', NewControllers.update)
router.delete('/news/:id', [AuthToken], NewControllers.destroy)

export default router