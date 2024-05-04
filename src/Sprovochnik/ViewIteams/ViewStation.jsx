import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { service } from '../../services/all.service'

const ViewStation = ({ maxnum }) => {
	const [stations, setStations] = useState([])
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['delete station'],
		mutationFn: () => service.sendDelStation(stations),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['station'] })
		},
	})

	const handleDeleteStation = code => {
		let confirm = confirm(
			`Вы действительно хотите удалить станцию под кодом - ${code}?`
		)
		if (confirm) {
			mutate()
		}
	}

	const { data } = useQuery({
		queryKey: ['station'],
		queryFn: () => service.getSpravochnikStation(),
	})

	return (
		<tbody>
			{data?.map(
				(res, idx) =>
					idx < maxnum && (
						<tr key={idx}>
							<td>{idx + 1}</td>
							<td>{res.STATION_INSIDE_CODE}</td>
							<td>{res.STATION_INSIDE_NAME}</td>
							<td>{res.KOD_AR}</td>
							<td>
								<input
									type='submit'
									value='Del'
									onClick={() => {
										setStations(res.STATION_INSIDE_CODE)
										handleDeleteStation(res.STATION_INSIDE_CODE)
									}}
								/>
							</td>
						</tr>
					)
			)}
		</tbody>
	)
}

export default ViewStation
