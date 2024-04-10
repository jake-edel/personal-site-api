import express from 'express'
import controllers from '../controllers/index.js'

const router = express.Router()

router
    .route('/testTable')
    .get(controllers.getAllRows)
    .post(controllers.createRow)
    .delete(controllers.deleteRow)
    .put(controllers.updateRow)

router
    .route('/testTable/:id')
    .get(controllers.readRow)

export default router