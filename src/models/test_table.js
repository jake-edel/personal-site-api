import conn from '../services/db.js'

function selectAllRows (res, next) {
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

export {
	selectAllRows
}