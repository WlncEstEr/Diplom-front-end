import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ReactSelect from 'react-select'
import style from '../components/css/Modal.module.scss'
import { service } from '../services/all.service'
import CompTable from './CompForModal/CompTable'
import way from './SliceWay'

import { v4 as uuidv4 } from 'uuid'

const ModalChange = ({ active, setActive, data, vagons }) => {
	const [showTable, setShowTable] = useState(true)
	const [sendData, setSendData] = useState({
		NDOC: '',
		INSIDE_LOAD_NAME: '',
		INSIDE_LOAD_CODE: '',
		STATION_OTPR: '',
		STATION_NAZN: '',
		STATION_OTPR_NAME: '',
		STATION_NAZN_CODE: '',
		KOTPR: '',
		NOTPR: '',
		KPOL: '',
		NPOL: '',
		WAY_CODE: '',
		USR_CEH_OTPR: '',
		DAT_CEH_OTPR: '',
		DAT_ST_OTPR: '',
		DAT_OFORM: '',
	})
	const [tableList, setTableList] = useState([])
	const [tableSlice, setTableSlice] = useState({
		NDOC: '',
		NVAG: '',
		KODTVAG: '',
		GPOD: '',
		VESVAG: '',
		VES_GROTP: '',
		VES_PROVES: '',
		DAT_CEH_OTPR: '',
		DAT_ST_OTPR: '',
		USR_CEH_OTPR: '',
		VES: '',
		ID: uuidv4(),
	})
	const [currentVagon, setCurrentVagon] = useState('')
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

	const tovar_code = tovar.data?.find(
		item => item.INSIDE_LOAD_NAME === data.INSIDE_LOAD_NAME
	)
	const station_code_otpr = station.data?.find(
		item => item.STATION_INSIDE_NAME === data.STATION_OTPR
	)
	const station_code_nazn = station.data?.find(
		item => item.STATION_INSIDE_NAME === data.STATION_NAZN
	)

	//FIXME: разобраться с хуйней выше
	useEffect(() => {
		setSendData({
			NDOC: data.NDOC,
			INSIDE_LOAD_NAME: data.INSIDE_LOAD_NAME,
			INSIDE_LOAD_CODE: tovar_code?.INSIDE_LOAD_CODE,
			STATION_OTPR: data.STATION_OTPR,
			STATION_OTPR_CODE: station_code_otpr?.STATION_INSIDE_CODE,
			STATION_NAZN: data.STATION_NAZN,
			STATION_NAZN_CODE: station_code_nazn?.STATION_INSIDE_CODE,
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
		setTableList(vagons === '' ? [] : vagons)
		const defData = {
			...tableSlice,
			NDOC: data.NDOC,
			DAT_CEH_OTPR: data.DAT_CEH_OTPR,
			DAT_ST_OTPR: data.DAT_ST_OTPR,
			USR_CEH_OTPR: data.USR_CEH_OTPR,
		}
		setTableSlice(defData)
	}, [data])

	const changeSendSelect = (opt, ctx) => {
		if (ctx.name === 'STATION_OTPR') {
			setSendData({
				...sendData,
				STATION_OTPR: opt.STATION_INSIDE_NAME,
				STATION_OTPR_CODE: opt.STATION_INSIDE_CODE,
			})
		} else if (ctx.name === 'STATION_NAZN') {
			setSendData({
				...sendData,
				STATION_NAZN: opt.STATION_INSIDE_NAME,
				STATION_NAZN_CODE: opt.STATION_INSIDE_CODE,
			})
		} else if (ctx.name === 'INSIDE_LOAD_NAME') {
			setSendData({
				...sendData,
				INSIDE_LOAD_NAME: opt.INSIDE_LOAD_NAME,
				INSIDE_LOAD_CODE: opt.INSIDE_LOAD_CODE,
			})
		} else {
			setSendData({
				...sendData,
				[ctx.name]: opt.wayCode,
			})
		}
	}

	const changeSendSelectCeh = (opt, ctx) => {
		ctx.name === 'NOTPR'
			? setSendData({ ...sendData, [ctx.name]: opt.SNCEH, KOTPR: opt.KCEH })
			: setSendData({ ...sendData, [ctx.name]: opt.SNCEH, KPOL: opt.KCEH })
	}

	const handleDeleteSliceVagon = delID => {
		console.log(tableList)
		setTableList(tableList.filter(incl => incl.ID !== delID))
	}

	const changeSendInput = e => {
		let textName = e.target.value
		setSendData({ ...sendData, [e.target.name]: textName.toUpperCase() })
		if (e.target.name === 'USR_CEH_OTPR') {
			setTableSlice({ ...tableSlice, USR_CEH_OTPR: textName.toUpperCase() })
		}
		console.log(tableList)
	}

	const getValue = () => {
		if (currentVagon) {
			vagon.data?.find(res => res.value === currentVagon)
		}
	}

	const onChangeVagon = newValue => {
		getValue()
		setCurrentVagon(newValue.NVAG)
		const findVagon = vagon.data?.find(item => item.NVAG === newValue.NVAG)
		const listvagon = {
			...tableSlice,
			NVAG: findVagon.NVAG,
			KODTVAG: findVagon.KODTVAG,
			GPOD: findVagon.GPOD,
			VESVAG: findVagon.VESVAG,
			VES_GROTP: findVagon.VES_GROTP,
		}
		setTableSlice(listvagon)
	}

	// ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЕ ДАННЫХ ВЕСА ВАГОНА
	const changeVes = value => {
		console.log(value)
		setVes(value)
		const ves = { ...tableSlice, VES_PROVES: value }
		setTableSlice(ves)
	}

	const addVagonSlice = (currentVagon, Ves) => {
		const id = { ...tableSlice, ID: uuidv4() }
		setTableSlice(id)
		const addvag = () => {
			if (Ves !== '' && currentVagon !== '') {
				tableList.push(tableSlice)
				setVes('')
			} else {
				// setShowTable(false)
				// В БУДУЩЕМ СДЕЛАТЬ ВАЛИДАЦИЮ НА ТИП ВАГОНА И ВЕС ВАГОНА
			}
		}
		addvag()
		tableList.length > 0 ? setShowTable(true) : setShowTable(false)
	}

	// -------------------------------------------------------------------
	const queryClient = useQueryClient()
	const updateNakladnaya = useMutation({
		mutationKey: ['update data'],
		mutationFn: () => service.sendUpdateNakladnaye(sendData),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['data list']['vagon list'] })
		},
	})
	const delNakladnaya_vagon = useMutation({
		mutationKey: ['delete data_vagons'],
		mutationFn: () => service.sendDelVagons_Nakladnaya(sendData.NDOC),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['data list']['vagon list'] })
		},
	})

	const sendVagon = useMutation({
		mutationKey: ['create data_vagons'],
		mutationFn: () => service.sendVagons(tableList),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['data list']['vagon list'] })
		},
	})

	const sendDataFetch = () => {
		updateNakladnaya.mutate()
		delNakladnaya_vagon.mutate()
		sendVagon.mutate()
		// ВСЕ ГОТОВО

		// ДОДЕЛАТЬ НАСТРОЙКУ ДАТЫ ПОД ФОРМАТ КАК В БД ЧЕРЕЗ "slice"
		// ИЛИ ЖЕ СДЕЛАТЬ ЧЕРЕЗ slice ЧИСТО ВЫВОД В ТАБЛИЦУ

		// Н АФИНАЛЬНОМ ЭТАПЕ ДОДЕЛАТЬ АНИМАЦИЮ\ВСПЛЫВАЮЩЕЕ ОКНО О ТОМ ЧТО ЧТО ВСЕ ГОТОВО + ДОБАВИТЬ ВАЛИДАЦИЮ
		setActive(false)
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
						<input type='text' defaultValue={sendData.NDOC} readOnly />
						<label htmlFor=''>Название Груза</label>
						<ReactSelect
							placeholder={sendData.INSIDE_LOAD_NAME}
							options={tovar.data}
							getOptionValue={option => option.INSIDE_LOAD_CODE}
							getOptionLabel={option => option.INSIDE_LOAD_NAME}
							name='INSIDE_LOAD_NAME'
							onChange={changeSendSelect}
						/>
						<label htmlFor=''>Станц. Отпр.</label>
						<ReactSelect
							placeholder={sendData.STATION_OTPR}
							options={station.data}
							getOptionLabel={option => option.STATION_INSIDE_NAME}
							getOptionValue={option => option.STATION_INSIDE_CODE}
							name='STATION_OTPR'
							onChange={changeSendSelect}
						/>
						<label htmlFor=''>Станц. Назн.</label>
						<ReactSelect
							placeholder={sendData.STATION_NAZN}
							options={station.data}
							getOptionLabel={option => option.STATION_INSIDE_NAME}
							getOptionValue={option => option.STATION_INSIDE_CODE}
							name='STATION_NAZN'
							onChange={changeSendSelect}
						/>
					</div>
					<div className={style.colume}>
						<label htmlFor=''>ФИО Отпр.</label>
						<input
							type='text'
							maxLength='15'
							placeholder='SEMENOVA_OA2'
							name='USR_CEH_OTPR'
							defaultValue={sendData.USR_CEH_OTPR}
							onChange={e => changeSendInput(e)}
						/>
						<label htmlFor=''>Цех Отпр.</label>
						<ReactSelect
							placeholder={sendData.NOTPR}
							options={ceh.data}
							getOptionLabel={option => option.NCEH}
							getOptionValue={option => option.SNCEH}
							name='NOTPR'
							onChange={changeSendSelectCeh}
						/>
						<label htmlFor=''>Цех Получ.</label>
						<ReactSelect
							placeholder={sendData.NPOL}
							options={ceh.data}
							getOptionLabel={option => option.NCEH}
							getOptionValue={option => option.SNCEH}
							name='NPOL'
							onChange={changeSendSelectCeh}
						/>
						<label htmlFor=''>Путь</label>
						<ReactSelect
							placeholder={sendData.WAY_CODE}
							options={way}
							name='WAY_CODE'
							getOptionLabel={option => option.wayCode}
							getOptionValue={option => option.wayCode}
							onChange={changeSendSelect}
						/>
					</div>
				</div>
				<div className={style.datarow}>
					<input
						type='datetime-local'
						name='DAT_ST_OTPR'
						defaultValue={sendData.DAT_ST_OTPR}
						onChange={e => changeSendInput(e)}
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
								onChange={onChangeVagon}
							/>
						</div>
						<div className={style.row}>
							<label htmlFor=''>Вес</label>
							<input
								type='number'
								value={Ves}
								onChange={e => changeVes(e.target.value)}
								placeholder='Вес'
								maxLength={5}
							/>
						</div>
						<div className={style.row}>
							<button
								type='button'
								onClick={() => addVagonSlice(currentVagon, Ves)}
							>
								Add
							</button>
						</div>
					</div>
					{showTable && (
						<div className={style.scrole_table}>
							<table>
								<thead>
									<tr>
										<th>N</th>
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
										vagon={tableList}
										deleteClick={handleDeleteSliceVagon}
									/>
								</tbody>
							</table>
						</div>
					)}
				</div>
				<div className={style.button}>
					<button
						type='button'
						// onMouseEnter={() => {
						// 	setSendData({ ...sendData, DAT_CEH_OTPR: dataNow })
						// 	setTableSlice({ ...tableSlice, DAT_CEH_OTPR: dataNow })
						// }}
						onClick={e => sendDataFetch(e)}
					>
						Save
					</button>
				</div>
			</div>
		</div>
	)
}

export default ModalChange
