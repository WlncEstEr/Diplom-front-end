import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import style from '../../components/css/Spravochnik.module.scss'
import { service } from '../../services/all.service'

const AddTovar = () => {
	const [station, setStation] = useState({
		INSIDE_LOAD_CODE: '',
		INSIDE_LOAD_NAME: '',
		PRIZN_SERT: '',
		LOAD_GROUP_CODE: '',
	})
	const changeStation = e => {
		setStation({ ...station, [e.target.name]: e.target.value })
	}
	//ПОЗЖН ДОБАВИТЬ ДОБАВЛЕНИЕ ID ПО АНАЛОГИИ КАК С ПОСЛЕДНЕЙ НАКЛАДНОЙ
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['add tovar'],
		mutationFn: () => service.addTovar(station),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['station'] })
		},
	})

	return (
		<div>
			<input
				type='number'
				className={style.butons}
				placeholder='Код товара '
				name='INSIDE_LOAD_CODE'
				onChange={e => changeStation(e)}
			/>
			<input
				type='text'
				className={style.butons}
				placeholder='Название товара '
				name='INSIDE_LOAD_NAME'
				onChange={e => changeStation(e)}
			/>
			<input
				type='text'
				className={style.butons}
				placeholder='KOD_AR '
				name='PRIZN_SERT'
				onChange={e => changeStation(e)}
			/>
			<input
				type='text'
				className={style.butons}
				placeholder='LOAD_GROUP_CODE '
				name='LOAD_GROUP_CODE'
				onChange={e => changeStation(e)}
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

export default AddTovar
