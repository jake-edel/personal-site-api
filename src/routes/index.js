import express from 'express'
import controllers from '../controllers/index.js'

const router = express.Router()

router
    .route('/:tableName(test-table|posts)')
    .get(controllers.getAllRows)
    .post(controllers.createRow)
    .delete(controllers.deleteRow)
    .put(controllers.updateRow)

router
    .route('/:tableName(test-table|posts)/:id')
    .get(controllers.readRow)

export default router