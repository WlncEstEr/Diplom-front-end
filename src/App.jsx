import { QueryClient } from '@tanstack/react-query'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HeaderInfo from './Header/HeaderInfo'
import HeaderUser from './Header/HeaderUser'

import SpravochnikFull from './Sprovochnik/SpravochnikFull'

const queryClient = new QueryClient()

function App() {
	return (
		<div>
			{/* <TryUseQuery /> */}
			<HeaderUser />
			<Router>
				<Routes>
					<Route path='/' exact={true} element={<HeaderInfo />} />
					<Route path='/about' element={<SpravochnikFull />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
