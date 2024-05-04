import style from '../../components/css/MainBody.module.scss'

const OnceSlice = ({ date, status, changeStatus }) => {
	return (
		<tr
			className={status === date.NDOC ? style.active : ''}
			onClick={() => changeStatus(date, date.NDOC)}
		>
			<td>{date.NDOC}</td>
			<td>{date.INSIDE_LOAD_NAME}</td>
			<td>
				{date.STATION_OTPR === '' || date.STATION_OTPR === null
					? '-'
					: date.STATION_OTPR}
			</td>

			<td>
				{date.STATION_NAZN === '' || date.STATION_NAZN === null
					? '-'
					: date.STATION_NAZN}
			</td>
			<td>{date.NOTPR}</td>
			<td>{date.NPOL}</td>
			<td>{date.WAY_CODE}</td>
			<td>{date.USR_CEH_OTPR}</td>
			<td>{date.DAT_CEH_OTPR}</td>
			<td>
				{date.DAT_ST_OTPR === '' || date.DAT_ST_OTPR === null
					? '-'
					: date.DAT_ST_OTPR}
			</td>
			<td>
				{date.DAT_ST_NAZN === '' || date.DAT_ST_NAZN === null
					? '-'
					: date.DAT_ST_NAZN}
			</td>
			<td>
				{date.DAT_CEH_NAZN === '' || date.DAT_CEH_NAZN === null
					? '-'
					: date.DAT_CEH_NAZN}
			</td>
		</tr>
	)
}

export default OnceSlice
