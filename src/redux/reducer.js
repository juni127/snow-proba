import { ACTIONS } from './actions';

const initialState = {
	variaveis: [
		{
			key: '886c8e3d-73e5-4bc5-bd74-0b988b23fd73', 
			id: 'Crescimento de bactérias', 
			type: 'exponencial', 
			data: {
				amostras: [],
				tamanho: 0,
				media: 0,
				desvio: 0,
			}
		},
		{
			key: 'e833aa8f-f53b-4f59-953a-8478eb054aaa', 
			id: 'Algo na area da comp', 
			type: 'normal', 
			data: {
				amostras: [],
				tamanho: 0,
				media: 0,
				desvio: 0,
			}
		}
	],
	display: [
		'886c8e3d-73e5-4bc5-bd74-0b988b23fd73',
		'e833aa8f-f53b-4f59-953a-8478eb054aaa'
	],
};

const rootReducer = (state = initialState, action) => {
	return state;
}

export default rootReducer;