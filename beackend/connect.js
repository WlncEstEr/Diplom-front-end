const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'Diplom',
})

// ПОПРОБЫВАТЬ ПРОВЕРИТЬ ЧЕРЕЗ PHP ПОДКЛЮЧЕНИЕ К БД НА ХОСТИНГЕ

app.get('/', (req, res) => {
	res.send('Hello Peace!')
})
// ЗАГРУЗКА ДАННЫХ

//ЗАГРУЗКА ПОСЛЕДНЕЙ НАКЛАДНОЙ
app.get('/date_base/lastdata', (req, res) => {
	db.query(
		'SELECT NDOC FROM `int_trans_doc` ORDER BY NDOC DESC LIMIT 1;',
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send(result)
			}
		}
	)
})

app.get('/date_base', (req, res) => {
	db.query(
		'SELECT `int_trans_doc`.NDOC, `n_inside_loads`.INSIDE_LOAD_NAME, s1.STATION_INSIDE_NAME STATION_OTPR, s2.STATION_INSIDE_NAME STATION_NAZN , int_trans_doc.KOTPR, int_trans_doc.KPOL, `int_trans_doc`.NOTPR,	`int_trans_doc`.NPOL , `int_trans_doc`.WAY_CODE , `int_trans_doc`.USR_CEH_OTPR , `int_trans_doc`.DAT_CEH_OTPR , `int_trans_doc`.DAT_ST_OTPR , `int_trans_doc`.DAT_ST_NAZN , 	`int_trans_doc`.DAT_CEH_NAZN 	FROM `int_trans_doc` LEFT JOIN `station_inside` AS s1 ON int_trans_doc.STATION_OTPR = s1.STATION_INSIDE_CODE LEFT JOIN `station_inside` AS s2 ON int_trans_doc.STATION_NAZN = s2.STATION_INSIDE_CODE LEFT JOIN `n_inside_loads` ON int_trans_doc.INSIDE_LOAD_CODE = n_inside_loads.INSIDE_LOAD_CODE ORDER BY int_trans_doc.NDOC DESC',
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send(result)
			}
		}
	)
})

app.get('/date_base/vagon', (req, res) => {
	db.query('SELECT * FROM `int_trans_str` ORDER BY NDOC', (err, result) => {
		if (err) {
			console.log(err)
		} else {
			res.send(result)
		}
	})
})

app.get('/date_base/categorys', (req, res) => {
	db.query(
		'SELECT STATION_INSIDE_NAME FROM `station_inside` ORDER BY STATION_INSIDE_NAME',
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send(result)
			}
		}
	)
})

app.get('/date_base/spravochnik/stations', (req, res) => {
	db.query('SELECT * FROM `station_inside`', (err, result) => {
		if (err) {
			console.log(err)
		} else {
			res.send(result)
		}
	})
})

app.get('/date_base/spravochnik/tovars', (req, res) => {
	db.query('SELECT * FROM `n_inside_loads`', (err, result) => {
		if (err) {
			console.log(err)
		} else {
			res.send(result)
		}
	})
})

app.get('/date_base/spravochnik/ceh', (req, res) => {
	db.query(
		'SELECT * FROM `station_ceh`	ORDER BY `station_ceh`.`KCEH`',
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send(result)
			}
		}
	)
})

app.get('/date_base/spravochnik/vagon', (req, res) => {
	db.query('SELECT * FROM `int_vagon`', (err, result) => {
		if (err) {
			console.log(err)
		} else {
			res.send(result)
		}
	})
})
// ДОБАВЛЕНИЕ ДАННЫХ
app.post('/date_base/create/station', (req, res) => {
	const CODE = req.body.text.STATION_INSIDE_CODE
	const NAME = req.body.text.STATION_INSIDE_NAME
	const KOD_AR = req.body.text.KOD_AR
	db.query(
		'INSERT INTO station_inside (STATION_INSIDE_CODE,STATION_INSIDE_NAME,KOD_AR,IP_GATEWAY,IDE) VALUES (?,?,?,?,?)',
		[CODE, NAME, KOD_AR, 0, 0],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send('All good :)')
			}
		}
	)
})

app.post('/date_base/create/tovar', (req, res) => {
	const CODE = req.body.text.INSIDE_LOAD_CODE
	const NAME = req.body.text.INSIDE_LOAD_NAME
	const PRIZN_SERT = req.body.text.PRIZN_SERT
	const LOAD_GROUP_CODE = req.body.text.LOAD_GROUP_CODE
	db.query(
		'INSERT INTO n_inside_loads (INSIDE_LOAD_CODE,INSIDE_LOAD_NAME,PRIZN_SERT,LOAD_GROUP_CODE,ETSNG,EMRG_CARD,AXL_COVER) VALUES (?,?,?,?,"","","")',
		[CODE, NAME, PRIZN_SERT, LOAD_GROUP_CODE],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send('All good :)')
			}
		}
	)
})

app.post('/date_base/create/ceh', (req, res) => {
	const KCEH = req.body.text.KCEH
	const NCEH = req.body.text.NCEH
	const SHCEH = req.body.text.SHCEH

	db.query(
		'INSERT INTO station_ceh (KCEH, NCEH, SNCEH, IDE) VALUES (?,?,?,0)',
		[KCEH, NCEH, SHCEH],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send('All good :)')
			}
		}
	)
})

app.post('/date_base/create/vagon', (req, res) => {
	const NVAG = req.body.text.NVAG
	const KODTVAG = req.body.text.KODTVAG
	const GPOD = req.body.text.GPOD
	const VESVAG = req.body.text.VESVAG
	const VES_GROTP = req.body.text.VES_GROTP
	db.query(
		'INSERT INTO `int_vagon` (`NVAG`, `KODTVAG`, `GPOD`, `VESVAG`, `VES_GROTP`) VALUES (?, ?, ?, ?, ?)',
		[NVAG, KODTVAG, GPOD, VESVAG, VES_GROTP],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send('All good :)')
			}
		}
	)
})

// ДОБАВАЛЕНИЕ НАКЛАДНЫХ
app.post('/date_base/create/nakladnaya', (req, res) => {
	const data = req.body.text
	db.query(
		'INSERT INTO `int_trans_doc` (`NDOC`, `NDOCP`, `WAY_DEFINITION_CODE`, `INSIDE_LOAD_CODE`, `KPRICH`, `STATION_OTPR`, `STATION_NAZN`, `DOC_ID`, `KOTPR`, `NOTPR`, `KPOL`, `NPOL`, `WAY_CODE`, `DAT_OFORM`, `WAY_CLIENT`, `DAT_CEH_OTPR`, `DAT_ST_OTPR`, `DAT_ST_NAZN`, `DAT_CEH_NAZN`, `USR_CEH_OTPR`, `USR_ST_OTPR`, `USR_ST_NAZN`, `USR_CEH_NAZN`, `NSOST`, `NUM_NDOC`, `PNSOST`, `PRZAP`, `NUDOS`, `SITE_CODE`, `BRIG`, `SMEN`, `STATION_OUTSIDE`, `TIMESTAMP`, `ID_TYPE`, `HEATING`, `LIFTING`, `ID_REASON`, `NAME_REASON`, `IDZ`, `MOVEMENT_SCHEME_CODE`, `ALLOWED`, `COBL`) VALUES (?, "", ?, ?, 3, ?, ?, "", ?, ?, ?, ?, ?, ?, "", ?, ?, "", "", ?, "", "", "", 3, ?, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "")',
		[
			data.NDOC,
			data.INSIDE_LOAD_CODE,
			data.INSIDE_LOAD_CODE,
			data.STATION_OTPR_CODE,
			data.STATION_NAZN_CODE,
			data.KOTPR,
			data.NOTPR,
			data.KPOL,
			data.NPOL,
			data.WAY_CODE,
			data.DAT_OFORM,
			data.DAT_CEH_OTPR,
			data.DAT_ST_OTPR,
			data.USR_CEH_OTPR,
			parseInt(data.NDOC),
		],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send('All good :)')
			}
		}
	)
})
// ДОБАВЛЕНИЕ НАКЛАДНЫХ ВАГОНАХ
//TODO: ить ение новых нных нивиалного через "UUID()"
app.post('/date_base/create/nakladnaya_vagon', (req, res) => {
	const allfiles = req.body.text
	// console.log(allfiles)
	allfiles.map(item => {
		db.query(
			'INSERT INTO `int_trans_str` (`NDOC`, `NSTR`, `SCALES_ID`, `TRAIN_ID`, `CAR_ID`, `ID` , `NVAG`, `KODTVAG`, `GPOD`, `VESVAG`, `PRIM`, `VES_GROTP`, `VES_PROVES`, `NEPR`, `DAT_CEH_OTPR`, `DAT_ST_OTPR`, `DAT_ST_NAZN`, `DAT_CEH_NAZN`, `USR_CEH_OTPR`, `USR_ST_OTPR`, `USR_ST_NAZN`, `USR_CEH_NAZN`, `PARENT_NDOC`, `PARENT_NSTR`, `NUCH`, `OBJ_VYGR`, `KMEST`, `PROCZ`, `NUM_DOC`, `INID`, `FR1`, `FR2`, `TIMESTAMP`, `NNAK`, `NPP`, `REG_NOM_DC`, `DATE_REG_NOM`, `REQUESTID`, `PATHCODE`, `LOADINGDATE`, `DATEREQUESTID`, `DELIVERYDATETIME`, `SHIFTNUMBER`, `FRAME_LOAD1`, `COUNT_FRAMES1`, `FRAME_LOAD2`, `COUNT_FRAMES2`) VALUES (?, 1, "", "", "", ?, ?, ?, ?, ?, "", ?, ?, "", ?, ?, "", "", ?, "", "", "", "", "", "", "", "", "", ?, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "")',
			[
				item.NDOC,
				item.ID,
				item.NVAG,
				item.KODTVAG,
				item.GPOD,
				item.VESVAG,
				item.VES_GROTP,
				item.VES_PROVES,
				item.DAT_CEH_OTPR,
				item.DAT_ST_OTPR,
				item.USR_CEH_OTPR,
				parseInt(item.NDOC),
			],
			(err, result) => {
				if (err) {
					console.log(err)
				} else {
					console.log('All good :)')
				}
			}
		)
	})
})

// УДАЛЕНИЕ ДАННЫХ
app.post('/date_base/delete/station', (req, res) => {
	const id = req.body.text
	db.query(
		`DELETE FROM station_inside WHERE STATION_INSIDE_CODE = ${id}`,
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				console.log('Send sorse :)')
			}
		}
	)
})

app.post('/date_base/delete/tovar', (req, res) => {
	const id = req.body.text
	db.query(
		`DELETE FROM n_inside_loads WHERE INSIDE_LOAD_CODE = ${id}`,
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				console.log('Send sorse :)')
			}
		}
	)
})

app.post('/date_base/delete/ceh', (req, res) => {
	const id = req.body.text

	db.query(`DELETE FROM station_ceh WHERE KCEH = ${id}`, (err, result) => {
		if (err) {
			console.log(err)
		} else {
			console.log('Send sorse :)')
		}
	})
})

app.post('/date_base/delete/vagon', (req, res) => {
	const id = req.body.text
	db.query(`DELETE FROM int_vagon WHERE NVAG = ${id}`, (err, result) => {
		if (err) {
			console.log(err)
		} else {
			console.log('Send sorse :)')
		}
	})
})

app.post('/date_base/delete/nakladnaya', (req, res) => {
	const id = req.body.text
	db.query(`DELETE FROM int_trans_doc WHERE NDOC = ${id}`, (err, result) => {
		if (err) {
			console.log(err)
		} else {
			console.log('Send sorse :)')
		}
	})
})

// ОБНОВЛЕНИЕ ДЫННЫХ

app.post('/date_base/update/nakladnaya', (req, res) => {
	const data = req.body.text
	db.query(
		'UPDATE int_trans_doc SET INSIDE_LOAD_CODE = ?, STATION_OTPR = ?,  STATION_NAZN = ?, KOTPR = ?, NOTPR = ?, KPOL = ?, NPOL = ?, WAY_CODE = ?, DAT_OFORM = ?, DAT_CEH_OTPR = ?, DAT_ST_OTPR = ?, USR_CEH_OTPR = ? WHERE NDOC = ?',
		[
			data.INSIDE_LOAD_CODE,
			data.STATION_OTPR_CODE,
			data.STATION_NAZN_CODE,
			data.KOTPR,
			data.NOTPR,
			data.KPOL,
			data.NPOL,
			data.WAY_CODE,
			data.DAT_OFORM,
			data.DAT_CEH_OTPR,
			data.DAT_ST_OTPR,
			data.USR_CEH_OTPR,
			data.NDOC,
		],
		(err, result) => {
			if (err) {
				console.log(err)
			} else {
				res.send('All good update :)')
			}
		}
	)
	// console.log(data)
})

app.post('/date_base/delete/nakladnaya_vagon', (req, res) => {
	const NDOC = req.body.text
	db.query(`DELETE FROM int_trans_str WHERE NDOC = ${NDOC}`, (err, result) => {
		if (err) {
			console.log(err)
		} else {
			console.log('Send sorse :)')
		}
	})
})

app.listen(3001, () => {
	console.log(`Server start on port 3001`)
})
