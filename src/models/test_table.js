import conn from '../services/db.js'

function selectAllRows (req, res, next) {
	const tableName = req.params[0].replace('-', '_')

	conn.query(`SELECT * FROM ${tableName}`,
		(err, data, fields) => {
			if (err) return next(new Error(err))
			res.status(200).json({
				status: 'success',
				length: data?.length,
				data: data,
				controller: 'getAllRows'
			})
		}
	)
}

export {
	selectAllRows
}