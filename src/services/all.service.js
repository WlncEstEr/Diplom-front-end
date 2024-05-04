import axios from 'axios'

class Service {
	#URL_int_trans_doc = 'http://localhost:3000/int_trans_doc'
	#URL_int_trans_str = 'http://localhost:3000/int_trans_str'
	#URL_int_vagon = 'http://localhost:3000/int_vagon'
	#URL_n_inside_loads = 'http://localhost:3000/n_inside_loads'
	#URL_station_ceh = 'http://localhost:3000/station_ceh'
	#URL_station_inside = 'http://localhost:3000/station_inside'
	#URL_slice_Way = 'http://localhost:3000/slice_Way'

	async getAllData() {
		const { data } = await axios.get('http://localhost:3001/date_base')
		return data
	}
	async getAllVagons() {
		const { data } = await axios.get('http://localhost:3001/date_base/vagon')
		return data
	}

	//СПРАВОЧНИК
	async getSpravochnikVagon() {
		const { data } = await axios.get(
			'http://localhost:3001/date_base/spravochnik/vagon'
		)
		return data
	}
	async getSpravochnikTovars() {
		const { data } = await axios.get(
			'http://localhost:3001/date_base/spravochnik/tovars'
		)
		return data
	}
	async getSpravochnikStation() {
		const { data } = await axios.get(
			'http://localhost:3001/date_base/spravochnik/stations'
		)
		return data
	}
	async getSpravochnikCeh() {
		const { data } = await axios.get(
			'http://localhost:3001/date_base/spravochnik/ceh'
		)
		return data
	}
	async getLastData() {
		const { data } = await axios.get('http://localhost:3001/date_base/lastdata')
		return data[0].NDOC
	}
	async getCategory() {
		const { data } = await axios.get(
			'http://localhost:3001/date_base/categorys'
		)
		return data
	}
	//ДОБАВЛЕНИЕ ДЫННЫХ
	//-------------------------------------------------------
	async sendDatas(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/create/nakladnaya',
			{ text }
		)
		return data
	}

	async sendVagons(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/create/nakladnaya_vagon',
			{ text }
		)
		return data
	}
	//-------------------------------------------------------
	async addCeh(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/create/ceh',
			{ text }
		)
		return data
	}

	async addStation(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/create/station',
			{ text }
		)
		return data
	}

	async addTovar(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/create/tovar',
			{ text }
		)
		return data
	}

	async addVagon(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/create/vagon',
			{ text }
		)
		return data
	}
	//УДАЛЕНИЕ СПРАВОЧНИКОВ
	async sendDelCeh(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/delete/ceh',
			{ text }
		)
		return data
	}

	async sendDelTovar(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/delete/tovar',
			{ text }
		)
		return data
	}

	async sendDelStation(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/delete/station',
			{ text }
		)
		return data
	}

	async sendDelVagon(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/delete/vagon',
			{ text }
		)
		return data
	}
	// ОБНОВЛЕНИЕ ДЫННЫХ
	// --------------------------------------------------------------
	async sendUpdateNakladnaye(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/update/nakladnaya',
			{ text }
		)
		return data
	}
	async sendDelVagons_Nakladnaya(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/delete/nakladnaya_vagon',
			{ text }
		)
		return data
	}
	// ОБНОВЛЕНИЕ ДЫННЫХ
	// --------------------------------------------------------------
	async sendDelNakladnaye(text) {
		const { data } = await axios.post(
			'http://localhost:3001/date_base/delete/nakladnaya',
			{ text }
		)
		return data
	}
}

export const service = new Service()
