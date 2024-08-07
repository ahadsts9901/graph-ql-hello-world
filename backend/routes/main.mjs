import { Router } from "express";

const router = Router()

router.get("/todos", (req, res, next) => {

    res.send('hello')

})

export default router