import express from 'express'
import router from './routes/index.js'
import cors from 'cors'
import AppError from './utils/appError.js'
import errorHandler from './utils/errorHandler.js'
import conn from './services/db.js'

const app = express()

app
	.use(cors())
	.use(express.json())
	.use(errorHandler)
	.use(router)

app.all('*', (req, res, next) => {
	next(new AppError(`The URL ${req.originalUrl} does not exist`, 404))
})

app.listen(process.env.PORT, (err) => {
	if (err) console.log(err);
	console.log('Server listening on PORT: ', process.env.PORT)
})

conn.connect(err => {
    if (err) throw err;
})

// `node app.js` to start API
// Or press F5 to launch debugger and start API