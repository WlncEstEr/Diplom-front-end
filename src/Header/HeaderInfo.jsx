import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import ModalChange from '../Modal/ModalChange'
import ModalCreate from '../Modal/ModalCreate'
import style from '../components/css/Headerinfo.module.scss'
import MianBody from '../main/MainList/MianBody'
import { service } from '../services/all.service'

const HeaderInfo = () => {
	const [currentData, setCurrentData] = useState('')
	const [currentVagon, setCurrentVagon] = useState('')

	const category = useQuery({
		queryKey: ['category'],
		queryFn: () => service.getCategory(),
	})

	const { data } = useQuery({
		queryKey: ['data list'],
		queryFn: () => service.getAllData(),
	})
	let lastdata = useQuery({
		queryKey: ['list'],
		queryFn: () => service.getLastData(),
	})
	lastdata = Number(lastdata.data) + 1
	lastdata = '000' + String(lastdata)
	// const lasTdata = Number(data.data[data.length - 1].NDOC) + 1
	// lasTdata = '000' + String(lasTdata)

	const [tarInfo, setTarInfo] = useState('')
	const [selected, setSelected] = useState()
	const handleChange = event => {
		setSelected(event.target.value)
	}

	const [btnCreate, setBtnCreate] = useState(false)
	const [btnChange, setBtnChange] = useState(false)
	const [statActiv, setStatActiv] = useState(true)

	const queryClient = useQueryClient()
	const del_Nakladnaya = useMutation({
		mutationKey: ['delete data_vagons'],
		mutationFn: () => service.sendDelNakladnaye(currentData.NDOC),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['data list']['vagon list'] })
		},
	})

	const delNakladnaya_vagon = useMutation({
		mutationKey: ['delete data_vagons'],
		mutationFn: () => service.sendDelVagons_Nakladnaya(currentData.NDOC),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['data list']['vagon list'] })
		},
	})

	const delNakladnaya = () => {
		let rez = window.confirm(
			`Вы действительно хотите удалить накладную под номером - ${currentData.NDOC}?`
		)
		if (rez) {
			del_Nakladnaya.mutate()
			delNakladnaya_vagon.mutate()
			alert(`Накладная ${currentData.NDOC} удалена!`)
		}
	}
	const [sorseData, setSorseData] = useState('')
	const changeSelect = value => {
		value.map(item => {
			setSorseData(item.NDOC)
		})
	}
	console.log(sorseData)
	return (
		<div>
			<div className={style.header}>
				<div className={style.HeaderInfo}>
					<select value={selected} onChange={handleChange}>
						<option value='All'>All</option>
						{category.data?.map((res, idx) => (
							<option key={idx} value={res.STATION_INSIDE_NAME}>
								{res.STATION_INSIDE_NAME}
							</option>
						))}
					</select>
					<input type='submit' value='Обновить' />
					<input
						type='submit'
						value='Создать'
						onClick={() => {
							setBtnCreate(true)
						}}
					/>
					<input
						type='submit'
						value='Корректировать'
						onClick={() => {
							setBtnChange(true)
						}}
						disabled={statActiv}
					/>
					<input
						type='submit'
						value='Удалить'
						onClick={() => {
							delNakladnaya()
						}}
						disabled={statActiv}
					/>
					<input
						type='submit'
						value='Печать'
						onClick={() => {
							alert('print ' + currentData)
						}}
						disabled={statActiv}
					/>
					<div className={style.sorse1}>
						<label>Найти накладную</label>
						{/* <input
							type='text'
							maxLength='10'
							value={tarInfo}
							onChange={e => {
								setTarInfo(e.target.value)
							}}
						/> */}
						<ReactSelect
							getOptionLabel={option => option.NDOC}
							getOptionValue={option => option.NDOC}
							options={data}
							name='SorseNakladnaya'
							isMulti
							onChange={e => changeSelect(e)}
						/>
					</div>
				</div>
				<Link to='/about'>Справочник</Link>
			</div>
			<ModalCreate
				active={btnCreate}
				setActive={setBtnCreate}
				lastdata={lastdata}
			/>
			<ModalChange
				active={btnChange}
				setActive={setBtnChange}
				data={currentData}
				vagons={currentVagon}
			/>
			<MianBody
				categorys={selected == null ? 'All' : selected}
				sorse={tarInfo}
				data={data}
				setCurrentData={setCurrentData}
				currentVagon={currentVagon}
				setCurrentVagon={setCurrentVagon}
				setStatActiv={setStatActiv}
			/>
		</div>
	)
}

export default HeaderInfo
