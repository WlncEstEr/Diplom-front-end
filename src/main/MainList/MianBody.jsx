import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import style from '../../components/css/MainBody.module.scss'
import { service } from '../../services/all.service'
import SecondBodyVagon from '../VagoList/SecondBodyVagon'
import OnceSlice from './OnceSlice'

const MianBody = ({
	data,
	categorys,
	sorse,
	setStatActiv,
	setCurrentData,
	setCurrentVagon,
}) => {
	const [status, setStatus] = useState([])

	const vagons = useQuery({
		queryKey: ['vagon list'],
		queryFn: () => service.getAllVagons(),
	})
	const changeStatus = (date, NDOC) => {
		const curvagons = vagons.data?.filter(item => item.NDOC === NDOC)
		if (status === NDOC) {
			setStatus('')
			setCurrentData('')
			setCurrentVagon([])
			setStatActiv(true)
		} else {
			setStatus(NDOC)
			setCurrentData(date)
			setCurrentVagon(curvagons)
			setStatActiv(false)
		}
		// status === ndoc ? setStatus('') : setStatus(ndoc)
	}

	return (
		<div className={style.table}>
			<table>
				<thead>
					<tr>
						<th>Накладная</th>
						<th>Груз</th>
						<th>Станция отпр.</th>
						<th>Станция назн.</th>
						<th>Отпр.</th>
						<th>Получ.</th>
						<th>Путь</th>
						<th>ФИО отпр-ля</th>
						<th>Дата цеха</th>
						<th>Дата ст.отпр.</th>
						<th>Дата ст.назн.</th>
						<th>Дата цеха назн.</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((date, idx) =>
						sorse === '' ? (
							categorys === 'All' ? (
								idx < 15 && (
									<OnceSlice
										key={idx}
										date={date}
										status={status}
										changeStatus={changeStatus}
									/>
								)
							) : date.STATION_OTPR === categorys ? (
								<OnceSlice
									key={idx}
									date={date}
									status={status}
									changeStatus={changeStatus}
								/>
							) : (
								''
							)
						) : sorse === date.NDOC ? (
							<OnceSlice
								key={idx}
								date={date}
								status={status}
								changeStatus={changeStatus}
							/>
						) : (
							''
						)
					)}
				</tbody>
			</table>
			<table>
				<thead>
					<tr>
						<th>Вагон</th>
						<th>Тип вагона</th>
						<th>Г/л, т</th>
						<th>Вес тары</th>
						<th>Вес груза нето</th>
						<th>Вес из провески</th>
						<th>Дата цеха-отпр.</th>
						<th>Дата станции назн.</th>
						<th>Дата цеха назн.</th>
						<th>Вес</th>
					</tr>
				</thead>
				<tbody>
					<SecondBodyVagon index={status} />
				</tbody>
			</table>
		</div>
	)
}
// СДЕЛАТЬ РАСШИРЕНИЕ СПИСКА НАКЛАДНЫХ, ТОБИШ 0-15, 16-30 И ...

export default MianBody
