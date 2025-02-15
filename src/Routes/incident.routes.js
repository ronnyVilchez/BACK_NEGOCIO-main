import { Router } from "express";
import { incidentAll, incidentCreate, incidentDelete, incidentFromUs, incidentId, incidentUpdate } from "../controllers/incident.controller.js";
import {upload} from  "../config/multer.js"

const router = Router()

router.get('/all',incidentAll)
router.get('/:id',incidentId)
router.get('/u/:id',incidentFromUs)
router.post('/',upload.single('photo'), incidentCreate)
router.patch('/:id',incidentUpdate)
router.delete('/:id',incidentDelete)

export default router