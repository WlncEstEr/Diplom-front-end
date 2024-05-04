import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { service } from '../../services/all.service'

const ViewVagon = ({ maxnum }) => {
	const [vagon, setVagon] = useState([])
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['delete vagon'],
		mutationFn: () => service.sendDelVagon(vagon),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['vagon'] })
		},
	})
	const handleDeleteVagon = code => {
		let confirm = confirm(
			`Вы действительно хотите удалить вагон под кодом - ${code}?`
		)
		if (confirm) {
			mutate()
		}
	}

	const { data } = useQuery({
		queryKey: ['vagon'],
		queryFn: () => service.getSpravochnikVagon(),
	})
	return (
		<tbody>
			{data?.map(
				(res, idx) =>
					idx < maxnum && (
						<tr key={idx}>
							<td>{idx + 1}</td>
							<td>{res.NVAG}</td>
							<td>{res.KODTVAG}</td>
							<td>{res.GPOD}</td>
							<td>{res.VESVAG}</td>
							<td>{res.VES_GROTP}</td>
							<td>
								<input
									type='submit'
									value='Del'
									onClick={() => {
										setVagon(res.NVAG)
										handleDeleteVagon(res.NVAG)
									}}
								/>
							</td>
						</tr>
					)
			)}
		</tbody>
	)
}

export default ViewVagon
