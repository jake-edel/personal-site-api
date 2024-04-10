import conn from '../services/db.js'
import AppError from '../utils/appError.js'

const getAllRows = (req, res, next) => {
	conn.query('SELECT * FROM test_table', (err, data, fields) => {
		if (err) return next(new Error(err))
		res.status(200).json({
			status: 'success',
			length: data?.length,
			data: data,
			controller: 'getAllRows'
		})
	})
}

const createRow = (req, res, next) => {
	if (!req.body) return next(new AppError('No form data found', 404 ))

	conn.query(
		'INSERT INTO test_table (data) VALUES(?)',
		[req.body.data],
		(err, data, fields) => {
			if (err) return next(new AppError(err, 500));
			res.status(201).json({
				status: 'success',
				message: 'Row created',
				controller: 'createRow'
			})
		}
	)
}

const updateRow = (req, res, next) => {
	if (!req.body.id) return next(new AppError('No Row id found', 404))
	
	if (!Number.isInteger(parseFloat(req.body.id))) return next(new AppError('Row id must be an integer'), 400)

	const values = [req.body.data, req.body.id]
	conn.query(
		'UPDATE test_table SET data = ? WHERE id = ?',
		values,
		(err, data, fields) => {
			if (err) return next(new AppError(err, 500))
			res.status(201).json({
				status: 'success',	
				message: 'Row updated',
				controller: 'updateRow'
			})
		}
	)
}

const readRow = (req, res, next) => {
	if (!req.params.id) return next(new AppError('No row id found', 404))

	if (!Number.isInteger(parseFloat(req.params.id))) return next(new AppError('Row id must be an integer'), 400)
	conn.query(
		'SELECT * FROM test_table WHERE id = ?',
		[req.params.id],
		(err, data, fields) => {
			if (err) return next(new AppError(err, 500))
			res.status(200).json({
				status: 'successs',
				length: data?.length,
				data: data,
				controller: 'readRow'
			})
		}
	)
}

const deleteRow = (req, res, next) => {
	if (!req.body.id) return next(new AppError('No Row id found', 404))

	if (!Number.isInteger(parseFloat(req.body.id))) return next(new AppError('Row id must be an integer'), 400)

	conn.query(
		'DELETE FROM test_table WHERE id = ?',
		[req.body.id],
		(err, fields) => {
			if (err) return next(new AppError(err, 500))
			res.status(201).json({
				status: 'success',
				message: 'Row deleted',
				controller: 'deleteRow'
			})
		}
	)
}

export default {
	getAllRows,
	createRow,
	readRow,
	updateRow,
	deleteRow
}