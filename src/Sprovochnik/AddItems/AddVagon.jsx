import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import style from '../../components/css/Spravochnik.module.scss'
import { service } from '../../services/all.service'

const AddVagon = () => {
	const [vagon, setVagon] = useState({
		NVAG: '',
		KODTVAG: '',
		GPOD: '',
		VESVAG: '',
		VES_GROTP: '',
	})
	const changeVagon = e => {
		setVagon({ ...vagon, [e.target.name]: e.target.value })
	}

	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['add vagon'],
		mutationFn: () => service.addVagon(vagon),
		// onSuccess() {
		// 	queryClient.refetchQueries({ queryKey: ['vagon'] })
		// },
	})

	return (
		<div>
			<input
				type='number'
				className={style.butons}
				placeholder='Номер вагона'
				name='NVAG'
				maxLength='4'
				min='0001'
				onChange={e => changeVagon(e)}
			/>
			<span>Тип вагона</span>
			<select name='KODTVAG' onChange={e => changeVagon(e)}>
				<option value='ОК АГЛ'>ОК АГЛ</option>
				<option value='ОК ШЛКОН'>ОК ШЛКОН</option>
				<option value='ПЛ ЛОТ К1'>ПЛ ЛОТ К1</option>
				<option value='ПЛЧ СЛ К2'>ПЛЧ СЛ К2</option>
				<option value='ПВ КОДЦ1'>ПВ КОДЦ1</option>
				<option value='ПЛЧ ЛОТ К2'>ПЛЧ ЛОТ К2</option>
			</select>

			<input
				type='number'
				className={style.butons}
				placeholder='Г/л, т (Макс. 3 симв.)'
				name='GPOD'
				max={3}
				onChange={e => changeVagon(e)}
			/>

			<input
				type='number'
				className={style.butons}
				placeholder='Вес вагона '
				name='VESVAG'
				max='5'
				maxLength={5}
				onChange={e => changeVagon(e)}
			/>
			<input
				type='number'
				className={style.butons}
				placeholder='Вес груза нето'
				name='VES_GROTP'
				max='5'
				onChange={e => changeVagon(e)}
			/>
			<input
				type='submit'
				className={style.butons}
				value='+ Добавить товар'
				onClick={() => mutate()}
			/>
		</div>
	)
}

export default AddVagon
