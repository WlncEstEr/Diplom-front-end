import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { service } from '../../services/all.service'

const ViewGrus = ({ maxnum }) => {
	const [tovar, setTovar] = useState([])
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['delete tovar'],
		mutationFn: () => service.sendDelTovar(tovar),
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['tovar'] })
		},
	})
	const { data } = useQuery({
		queryKey: ['tovar'],
		queryFn: () => service.getSpravochnikTovars(),
	})

	const handleDeleteTovar = code => {
		let confirm = confirm(
			`Вы действительно хотите удалить товар под кодом - ${code}?`
		)
		if (confirm) {
			mutate()
		}
	}

	return (
		<tbody>
			{data?.map(
				(res, idx) =>
					idx < maxnum && (
						<tr key={idx}>
							<td>{idx + 1}</td>
							<td>{res.INSIDE_LOAD_CODE}</td>
							<td>{res.INSIDE_LOAD_NAME}</td>
							<td>{res.PRIZN_SERT}</td>
							<td>{res.LOAD_GROUP_CODE}</td>
							<td>
								<input
									type='submit'
									value='Del'
									onClick={() => {
										setTovar(res.INSIDE_LOAD_CODE)
										handleDeleteTovar(res.INSIDE_LOAD_CODE)
									}}
								/>
							</td>
						</tr>
					)
			)}
		</tbody>
	)
}

export default ViewGrus
