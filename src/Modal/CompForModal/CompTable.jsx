const CompTable = ({ vagon, deleteClick }) => {
	return vagon?.map((res, idx) => (
		<tr key={res.ID}>
			<td>{idx + 1}</td>
			<td>{res.NVAG}</td>
			<td>{res.KODTVAG}</td>
			<td>{res.GPOD}</td>
			<td>{res.VESVAG}</td>
			<td>{res.VES_GROTP}</td>
			<td>{res.VES || res.VESVAG}</td>
			<td>
				<button type='button' onClick={() => deleteClick(res.ID)}>
					X
				</button>
			</td>
		</tr>
	))
}

export default CompTable
