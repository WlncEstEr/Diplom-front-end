import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import ReactSelect from 'react-select'
import style from '../components/css/Modal.module.scss'
import { service } from '../services/all.service'
import CompTable from './CompForModal/CompTable'
import way from './SliceWay'
const ModalChange = ({ active, setActive, data, vagons }) => {
	const [tableList, setTableList] = useState([])
	const [sendData, setSendData] = useState({})
	setSendData({
		NDOC: data.NDOC,
		INSIDE_LOAD_NAME: data.INSIDE_LOAD_NAME,
		STATION_OTPR: data.STATION_OTPR,
		STATION_NAZN: data.STATION_NAZN,
		KOTPR: data.KOTPR,
		NOTPR: data.NOTPR,
		KPOL: data.KPOL,
		NPOL: data.NPOL,
		WAY_CODE: data.WAY_CODE,
		USR_CEH_OTPR: data.USR_CEH_OTPR,
		DAT_CEH_OTPR: data.DAT_CEH_OTPR,
		DAT_ST_OTPR: data.DAT_ST_OTPR,
		DAT_OFORM: data.DAT_CEH_OTPR,
	})

	console.log(sendData)

	const [getVagon, setgetVagon] = useState([])
	const [getWay, setgetWay] = useState()
	const [optionsArrayVagon, setOptionsArray] = useState()
	const [optionsArrayTovar, setOptionsArrayTovar] = useState()
	const [optionsArrayStation, setOptionsArrayStation] = useState()
	const [optionsArrayCeh, setOptionsArrayCeh] = useState()

	const [showTable, setShowTable] = useState(false)
	const [currentVagon, setCurrentVagon] = useState()
	const [Ves, setVes] = useState('')

	const vagon = useQuery({
		queryKey: ['vagon'],
		queryFn: () => service.getSpravochnikVagon(),
	})
	const tovar = useQuery({
		queryKey: ['tovar'],
		queryFn: () => service.getSpravochnikTovars(),
	})
	const station = useQuery({
		queryKey: ['station'],
		queryFn: () => service.getSpravochnikStation(),
	})

	const ceh = useQuery({
		queryKey: ['ceh'],
		queryFn: () => service.getSpravochnikCeh(),
	})

	// useEffect(() => {
	// 	setSendData({
	// 		NDOC: data.NDOC,
	// 		INSIDE_LOAD_NAME: data.INSIDE_LOAD_NAME,
	// 		STATION_OTPR: data.STATION_OTPR,
	// 		STATION_NAZN: data.STATION_NAZN,
	// 		KOTPR: data.KOTPR,
	// 		NOTPR: data.NOTPR,
	// 		KPOL: data.KPOL,
	// 		NPOL: data.NPOL,
	// 		WAY_CODE: data.WAY_CODE,
	// 		USR_CEH_OTPR: data.USR_CEH_OTPR,
	// 		DAT_CEH_OTPR: data.DAT_CEH_OTPR,
	// 		DAT_ST_OTPR: data.DAT_ST_OTPR,
	// 		DAT_OFORM: data.DAT_CEH_OTPR,
	// 	})
	// 	//ДАННЫЕ НАКЛАДНОЙ ПРИШЛИ И РАСТАСОВАНЫ - ГОТОВЫ( sendData )!!
	// }, [data])

	const [tableSlice, setTableSlice] = useState({
		NDOC: '',
		NVAG: '',
		KODTVAG: '',
		GPOD: '',
		VESVAG: '',
		VES_GROTP: '',
		DAT_CEH_OTPR: '',
		DAT_ST_OTPR: '',
		USR_CEH_OTPR: '',
		VES: '',
	})

	const changeVes = value => {
		setVes(value)
		const ves = { ...tableSlice, VES: value }
		setTableSlice(ves)
	}

	return (
		<div
			className={active ? style.modal_active : style.modal}
			onClick={() => {
				setActive(false)
			}}
		>
			<div className={style.form} onClick={e => e.stopPropagation()}>
				<button className={style.close_button}>
					<span
						onClick={() => {
							setActive(false)
						}}
					>
						X
					</span>
				</button>
				<div className={style.rows}>
					<div className={style.colume}>
						<label htmlFor=''>Номер</label>
						<input type='text' value={sendData.NDOC} readOnly />
						<label htmlFor=''>Название Груза</label>
						<ReactSelect
							options={tovar.data}
							getOptionValue={option => option.INSIDE_LOAD_CODE}
							getOptionLabel={option => option.INSIDE_LOAD_NAME}
							defaultValue={sendData.INSIDE_LOAD_NAME}
							name='INSIDE_LOAD_NAME'
							// onChange={changeSendSelect}
						/>
						<label htmlFor=''>Станц. Отпр.</label>
						<ReactSelect
							options={station.data}
							getOptionLabel={option => option.STATION_INSIDE_NAME}
							getOptionValue={option => option.STATION_INSIDE_CODE}
							defaultValue={sendData.STATION_OTPR}
							name='STATION_OTPR'
							// onChange={changeSendSelect}
						/>
						<label htmlFor=''>Станц. Назн.</label>
						<ReactSelect
							options={station.data}
							getOptionLabel={option => option.STATION_INSIDE_NAME}
							getOptionValue={option => option.STATION_INSIDE_CODE}
							defaultValue={sendData.STATION_NAZN}
							name='STATION_NAZN'
							// onChange={changeSendSelect}
						/>
					</div>
					<div className={style.colume}>
						<label htmlFor=''>ФИО Отпр.</label>
						<input
							type='text'
							maxLength='15'
							placeholder='SEMENOVA_OA2'
							name='USR_CEH_OTPR'
							value={sendData.USR_CEH_OTPR}
							// onChange={e => changeSendInput(e)}
						/>
						<label htmlFor=''>Цех Отпр.</label>
						<ReactSelect
							options={ceh.data}
							getOptionLabel={option => option.NCEH}
							getOptionValue={option => option.SNCEH}
							defaultValue={sendData.NOTPR}
							name='NOTPR'
							// onChange={changeSendSelectCeh}
						/>
						<label htmlFor=''>Цех Получ.</label>
						<ReactSelect
							options={ceh.data}
							getOptionLabel={option => option.NCEH}
							getOptionValue={option => option.SNCEH}
							defaultValue={sendData.NPOL}
							name='NPOL'
							// onChange={changeSendSelectCeh}
						/>
						<label htmlFor=''>Путь</label>
						<ReactSelect
							options={way}
							name='WAY_CODE'
							getOptionLabel={option => option.wayCode}
							getOptionValue={option => option.wayCode}
							defaultValue={sendData.WAY_CODE}
							// onChange={changeSendSelect}
						/>
					</div>
				</div>
				<div className={style.datarow}>
					<input
						type='datetime-local'
						name='DAT_ST_OTPR'
						// defaultValue={dataTime}
						// onChange={e => changeSendInput(e)}
					/>
				</div>
				<div className={style.viewvagon}>
					<h3>Вагоны</h3>
					<div className={style.colume}>
						<div className={style.row}>
							<label htmlFor=''>Номер вагона</label>
							<ReactSelect
								options={vagon.data}
								getOptionLabel={option => option.NVAG}
								getOptionValue={option => option.NVAG}
								// onChange={onChangeVagon}
							/>
						</div>
						<div className={style.row}>
							<label htmlFor=''>Вес</label>
							<input
								type='number'
								// value={Ves}
								// onChange={e => changeVes(e.target.value)}
								placeholder='Вес'
								maxLength={5}
							/>
						</div>
						<div className={style.row}>
							<button
							// type='button'
							// onClick={() => addVagonSlice(currentVagon, Ves)}
							>
								Add
							</button>
						</div>
					</div>
					{showTable && (
						<table>
							<thead>
								<tr>
									<th>NVAG</th>
									<th>KODTVAG</th>
									<th>GPOD</th>
									<th>VESVAG</th>
									<th>VES_GROTP</th>
									<th>VES</th>
									<th>DEL</th>
								</tr>
							</thead>
							<tbody>
								<CompTable
								// vagon={tableList}
								// deleteClick={handleDeleteSliceVagon}
								/>
							</tbody>
						</table>
					)}
				</div>
				<div className={style.button}>
					<button
					// type='button'
					// onMouseEnter={() => {
					// 	setSendData({ ...sendData, DAT_CEH_OTPR: dataNow })
					// 	setTableSlice({ ...tableSlice, DAT_CEH_OTPR: dataNow })
					// }}
					// onClick={e => sendDataFetch(e)}
					>
						Create
					</button>
				</div>
			</div>
		</div>
	)
}

export default ModalChange
