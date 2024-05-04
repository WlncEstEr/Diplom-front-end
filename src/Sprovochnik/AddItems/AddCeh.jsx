import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import style from '../../components/css/Spravochnik.module.scss'
import { service } from '../../services/all.service'

const AddCeh = () => {
	const [station, setStation] = useState({
		KCEH: '',
		NCEH: '',
		SHCEH: '',
	})
	const changeStation = e => {
		setStation({ ...station, [e.target.name]: e.target.value })
	}
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['add ceh'],
		mutationFn: () => service.addCeh(station),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['ceh'] })
		},
	})

	return (
		<div>
			<input
				type='number'
				className={style.butons}
				placeholder='Код цеха '
				name='KCEH'
				onChange={e => changeStation(e)}
			/>
			<input
				type='text'
				className={style.butons}
				placeholder='Название цеха '
				name='NCEH'
				onChange={e => changeStation(e)}
			/>
			<input
				type='text'
				className={style.butons}
				placeholder='Сокращение цеха'
				name='SHCEH'
				onChange={e => changeStation(e)}
			/>
			<input
				type='submit'
				className={style.butons}
				value='+ Добавить цех'
				onClick={() => mutate()}
			/>
		</div>
	)
}

export default AddCeh
