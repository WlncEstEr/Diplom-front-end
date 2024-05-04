import { useState } from 'react'
import { Link } from 'react-router-dom'
import style from '../components/css/Spravochnik.module.scss'
import AddCeh from './AddItems/AddCeh'
import AddStation from './AddItems/AddStation'
import AddTovar from './AddItems/AddTovar'
import AddVagon from './AddItems/AddVagon'
import ViewCeh from './ViewIteams/ViewCeh'
import ViewGrus from './ViewIteams/ViewGrus'
import ViewStation from './ViewIteams/ViewStation'
import ViewVagon from './ViewIteams/ViewVagon'
import menu from './menu_spravochnik'

const SpravochnikFull = () => {
	const [status, setStatus] = useState('Station')
	const [maxvivod, setMaxvivod] = useState(15)

	const handchange = idx => {
		status === idx ? setStatus('') : setStatus(idx)
		setMaxvivod(15)
	}

	return (
		<div>
			<Link to='/'>Back</Link>
			<div className={style.textcols}>
				<div className={style.textcols_item}>
					{menu.map(res => (
						<span
							key={res.product}
							className={status === res.product ? style.active : ''}
							onClick={() => handchange(res.product)}
						>
							{res.name}
						</span>
					))}
				</div>
				<div className={style.textcols_item}>
					{!status === '' && (
						<table>
							<thead>
								<tr>
									<th>№ </th>
									<th>
										{status === 'Ceh'
											? 'Код цеха'
											: status === 'Vagon'
											? 'Номер вагона'
											: 'Код станции'}
									</th>
									<th>
										{status === 'Station'
											? 'Название станции'
											: status === 'Grus'
											? 'Название товара'
											: status === 'Ceh'
											? 'Название товара'
											: status === 'Vagon'
											? 'Тип Вагона'
											: ''}
									</th>
									<th>
										{status === 'Vagon'
											? 'Г/л, т'
											: status !== 'Ceh'
											? 'KOD_AR'
											: 'Сокр. цеха'}{' '}
									</th>
									<th>
										{' '}
										{status === 'Grus'
											? 'LOAD_GROUP_CODE'
											: status === 'Vagon'
											? 'Вес вагона'
											: ''}
									</th>
									<th>{status === 'Vagon' ? 'Вес массы нето' : ''}</th>
								</tr>
							</thead>

							{status === 'Station' ? (
								<ViewStation maxnum={maxvivod} />
							) : status === 'Grus' ? (
								<ViewGrus maxnum={maxvivod} />
							) : status === 'Ceh' ? (
								<ViewCeh maxnum={maxvivod} />
							) : status === 'Vagon' ? (
								<ViewVagon maxnum={maxvivod} />
							) : (
								''
							)}
						</table>
					)}
					{status !== '' && (
						<div>
							<input
								type='submit'
								value='Показать еще'
								onClick={() => {
									setMaxvivod(maxvivod + 10)
								}}
							/>
							<input
								type='submit'
								value='Сбросить'
								onClick={() => {
									setMaxvivod(15)
								}}
							/>
						</div>
					)}
				</div>
				<div className={style.textcols_item}>
					{status === 'Station' ? (
						<AddStation />
					) : status === 'Grus' ? (
						<AddTovar />
					) : status === 'Ceh' ? (
						<AddCeh />
					) : status === 'Vagon' ? (
						<AddVagon />
					) : (
						''
					)}
				</div>
			</div>
		</div>
	)
}

export default SpravochnikFull
