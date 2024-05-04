import style from '../components/css/Modal.module.scss'

import { useEffect, useState } from 'react'

import way from './SliceWay'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ReactSelect from 'react-select'
import { service } from '../services/all.service'
import CompTable from './CompForModal/CompTable'

import { v4 as uuidv4 } from 'uuid'

const ModalCreate = ({ active, setActive, lastdata }) => {
	const [dataTime, setDataTime] = useState()
	const [sendData, setSendData] = useState({
		NDOC: '',
		INSIDE_LOAD_NAME: '',
		STATION_OTPR: '',
		STATION_NAZN: '',
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
	let dataNow = new Date()
	dataNow = `${
		dataNow.getFullYear() +
		'-' +
		(dataNow.getMonth() < 9 ? '0' + dataNow.getMonth() : dataNow.getMonth()) +
		'-' +
		dataNow.getDate() +
		'T' +
		dataNow.getHours() +
		':' +
		(dataNow.getMinutes() < 9
			? '0' + dataNow.getMinutes()
			: dataNow.getMinutes()) +
		':' +
		'00'
	}`
	dataNow.slice(0, 16)

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
	useEffect(() => {
		let data = new Date()
		data = data.toISOString().slice(0, 16)
		//ДОДЕЛАТЬ ОКРУГЛЕНИЕ ПО МИНУТАМ

		setDataTime(data)
		setSendData({ ...sendData, DAT_ST_OTPR: data })
		setTableSlice({ ...tableSlice, DAT_ST_OTPR: data })
	}, [])

	// ДОДЕЛАТЬ ЗАПРОС О НАКЛАДНОЙ И ВАГОНОВ НАКЛАДЫНОЙ В БАЗУ ДЫННЫХ

	const [showTable, setShowTable] = useState(false)
	const [currentVagon, setCurrentVagon] = useState()
	const [Ves, setVes] = useState('')
	const [tableList, setTableList] = useState([])

	const getValue = () => {
		if (currentVagon) {
			vagon.data?.find(res => res.value === currentVagon)
		}
	}
	// ОТСЛЕЖИВАНИЕ ИЗМЕНЕНИЯ ТИПА ВАГОНА
	const onChangeVagon = newValue => {
		//РАЗОБРАТЬСЯ ПОЧЕМУ НЕ ВЫБИРАЮТЬСЯ ВАГОНЫ ИЛИ ПЕРЕДЕЛАТЬ
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
		setVes(value)
		const ves = { ...tableSlice, VES_PROVES: value }
		setTableSlice(ves)
	}
	// ДОБАВЛЕНИЕ ВАГОНОВ В СПИСОК
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
	// УДАЛЕНИЕ ВАГОНОВ ИЗ СПИСКА
	const handleDeleteSliceVagon = delID => {
		console.log(tableList)
		setTableList(tableList.filter(incl => incl.ID !== delID))
		// ДОДЕЛАТЬ ХУЙНЮ ЧТО ПРИ УДАЛЕНИИ ВСЕГО СПИСКА ВАГОНОВ, ТАБЛИЦА НЕ СКРЫВАЕТСЯ
	}
	// --------------------------------------------------------------------

	// С ОКНОМ ДОБАВЛЕНИЯ ДАННЫХ ЗАКОНЧИЛ, НА ФИНАЛЬНОМ ЭТАПЕ ТОЛЬКО ВЕРНУСЬ

	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['create data'],
		mutationFn: () => service.sendDatas(sendData),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['data list']['vagon list'] })
		},
	})
	const sendVagon = useMutation({
		mutationKey: ['create data_vagons'],
		mutationFn: () => service.sendVagons(tableList),
	})

	const sendDataFetch = () => {
		mutate()
		sendVagon.mutate()
		setActive(false)
		//  С НОВЫМ БЕКЕНДОМ ПОПРОБЫВАТЬ ИСПРАВИЬТ БАГ В ЭТОМ МЕСТЕ ПУТЕМ МАССИВА И ПООЧЕРЕДНОГО ВЫЗОВА ФУНКЦИИ С ДАННЫМИ ИЗ МАССИВА ПО ИНДЕКСУ
	}

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
		ID: '',
	})

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
				NDOC: lastdata,
			})
		} else {
			setSendData({
				...sendData,
				[ctx.name]: opt.wayCode,
			})
		}
		setTableSlice({ ...tableSlice, NDOC: lastdata })
		// ПРОВЕРЕНО! - СЮДАП НЧИГО ДЛЯ ВАГОНОВ НЕ ДОБАВЛЯТЬ
	}

	const changeSendSelectCeh = (opt, ctx) => {
		ctx.name === 'NOTPR'
			? setSendData({ ...sendData, [ctx.name]: opt.SNCEH, KOTPR: opt.KCEH })
			: setSendData({ ...sendData, [ctx.name]: opt.SNCEH, KPOL: opt.KCEH })
	}

	const changeSendInput = e => {
		let textName = e.target.value
		setSendData({ ...sendData, [e.target.name]: textName.toUpperCase() })
		if (e.target.name === 'USR_CEH_OTPR') {
			setTableSlice({ ...tableSlice, USR_CEH_OTPR: textName.toUpperCase() })
		}
	}

	// --------------------------------------------------------------------
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
						<input type='text' value={lastdata} readOnly />
						<label htmlFor=''>Название Груза</label>
						<ReactSelect
							options={tovar.data}
							getOptionValue={option => option.INSIDE_LOAD_CODE}
							getOptionLabel={option => option.INSIDE_LOAD_NAME}
							name='INSIDE_LOAD_NAME'
							onChange={changeSendSelect}
						/>
						<label htmlFor=''>Станц. Отпр.</label>
						<ReactSelect
							getOptionLabel={option => option.STATION_INSIDE_NAME}
							getOptionValue={option => option.STATION_INSIDE_CODE}
							options={station.data}
							name='STATION_OTPR'
							onChange={changeSendSelect}
						/>
						<label htmlFor=''>Станц. Назн.</label>
						<ReactSelect
							getOptionLabel={option => option.STATION_INSIDE_NAME}
							getOptionValue={option => option.STATION_INSIDE_CODE}
							options={station.data}
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
							value={sendData.USR_CEH_OTPR}
							onChange={e => changeSendInput(e)}
						/>
						<label htmlFor=''>Цех Отпр.</label>
						<ReactSelect
							getOptionLabel={option => option.NCEH}
							getOptionValue={option => option.SNCEH}
							options={ceh.data}
							name='NOTPR'
							onChange={changeSendSelectCeh}
						/>
						<label htmlFor=''>Цех Получ.</label>
						<ReactSelect
							getOptionLabel={option => option.NCEH}
							getOptionValue={option => option.SNCEH}
							options={ceh.data}
							name='NPOL'
							onChange={changeSendSelectCeh}
						/>
						<label htmlFor=''>Путь</label>
						<ReactSelect
							options={way}
							getOptionLabel={option => option.wayCode}
							getOptionValue={option => option.wayCode}
							name='WAY_CODE'
							onChange={changeSendSelect}
						/>
					</div>
				</div>
				<div className={style.datarow}>
					<input
						type='datetime-local'
						name='DAT_ST_OTPR'
						defaultValue={dataTime}
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
								onChange={onChangeVagon}
								getOptionLabel={option => option.NVAG}
								getOptionValue={option => option.NVAG}
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
									vagon={tableList}
									deleteClick={handleDeleteSliceVagon}
								/>
							</tbody>
						</table>
					)}
				</div>
				<div className={style.button}>
					<button
						type='button'
						onMouseEnter={() => {
							setSendData({ ...sendData, DAT_CEH_OTPR: dataNow })
							setTableSlice({ ...tableSlice, DAT_CEH_OTPR: dataNow })
						}}
						onClick={() => sendDataFetch()}
					>
						Create
					</button>
				</div>
			</div>
		</div>
	)
}

export default ModalCreate
