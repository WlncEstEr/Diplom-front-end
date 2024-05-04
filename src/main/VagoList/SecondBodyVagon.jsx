import { useQuery } from '@tanstack/react-query'
import { service } from '../../services/all.service'

const SecondBodyVagon = ({ index }) => {
	const { data } = useQuery({
		queryKey: ['vagon list'],
		queryFn: () => service.getAllVagons(),
	})

	return data?.map(
		(vagon, idx) =>
			vagon.NDOC === index && (
				<tr key={idx}>
					<td>{vagon.NVAG}</td>
					<td>{vagon.KODTVAG}</td>
					<td>{vagon.GPOD}</td>
					<td>{vagon.VESVAG}</td>
					<td>{vagon.VES_GROTP}</td>
					<td>{vagon.VES_PROVES !== '' ? vagon.VES_PROVES : '-'}</td>
					<td>{vagon.DAT_CEH_OTPR}</td>
					<td>{vagon.DAT_ST_NAZN !== '' ? vagon.DAT_ST_NAZN : '-'}</td>
					<td>{vagon.DAT_CEH_NAZN !== '' ? vagon.DAT_CEH_NAZN : '-'}</td>
					<td>{vagon.VESVAG}</td>
				</tr>
			)
	)
}

export default SecondBodyVagon
