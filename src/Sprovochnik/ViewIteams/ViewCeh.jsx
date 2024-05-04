import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { service } from '../../services/all.service'

const ViewCeh = ({ maxnum }) => {
	const [nCeh, setNCeh] = useState()
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['delete ceh'],
		mutationFn: () => service.sendDelCeh(nCeh),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['ceh'] })
		},
	})
	const handleDeleteCeh = code => {
		let confirm = confirm(
			`Вы действительно хотите удалить цех под кодом - ${code}?`
		)
		if (confirm) {
			mutate()
		}
	}

	const { data } = useQuery({
		queryKey: ['ceh'],
		queryFn: () => service.getSpravochnikCeh(),
	})

	return (
		<tbody>
			{data?.map(
				(res, idx) =>
					idx < maxnum && (
						<tr key={idx}>
							<td>{idx + 1}</td>
							<td>{res.KCEH}</td>
							<td>{res.NCEH}</td>
							<td>{res.SNCEH}</td>
							<td>
								<input
									type='submit'
									value='Del'
									onClick={() => {
										setNCeh(res.KCEH)
										handleDeleteCeh(res.KCEH)
									}}
								/>
							</td>
						</tr>
					)
			)}
		</tbody>
	)
}

export default ViewCeh
