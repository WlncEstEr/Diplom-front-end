import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import style from '../../components/css/Spravochnik.module.scss'
import { service } from '../../services/all.service'

const AddStation = () => {
	const [station, setStation] = useState({
		STATION_INSIDE_CODE: '',
		STATION_INSIDE_NAME: '',
		KOD_AR: '',
	})
	const changeStation = e => {
		setStation({ ...station, [e.target.name]: e.target.value })
	}

	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['add station'],
		mutationFn: () => service.addStation(station),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['station'] })
		},
	})

	return (
		<div>
			<input
				type='number'
				className={style.butons}
				placeholder='Код станции '
				name='STATION_INSIDE_CODE'
				onChange={e => changeStation(e)}
			/>
			<input
				type='text'
				className={style.butons}
				placeholder='Название станции '
				name='STATION_INSIDE_NAME'
				onChange={e => changeStation(e)}
				maxLength={18}
			/>
			<input
				type='text'
				className={style.butons}
				placeholder='KOD_AR '
				name='KOD_AR'
				onChange={e => changeStation(e)}
				maxLength={1}
			/>
			<input
				type='submit'
				className={style.butons}
				value='+ Добавить станцию'
				onClick={() => mutate()}
			/>
		</div>
	)
}

export default AddStation
