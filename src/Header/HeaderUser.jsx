import style from '../components/css/HeaderUser.module.scss'

const HeaderUser = () => {
	return (
		<div className={style.header}>
			<label>Дата отгрузки</label>
			<input type='text' className={style.once} />
			<label>Оформитель</label>
			<input className={style.big} type='text' />
			<input className={style.small} width='15px' type='text' />
			<label>Цех</label>
			<input className={style.big} type='text' />
			<input className={style.small} type='text' />
			<label>Участок</label>
			<input className={style.big} type='text' />
			<input className={style.small} type='text' />
			<label>Ст.назн.</label>
			<input className={style.big} type='text' />
			<input className={style.small} type='text' />
		</div>
	)
}

export default HeaderUser

// ВПРИНЦИПЕ ИЗМЕНИТЬ ЭТУ ЗАЛУПУ НА ДАННЫЕ ПОЛЬЗОВАТЕЛЯ ПОСЛЕ АВТОРИЗАЦИИ
