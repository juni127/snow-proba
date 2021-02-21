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

const variaveisReducer = (state, action) => {
	let switcher = {
		[ACTIONS.ADD_VARIAVEL]: () => [
			...state,
			action.payload
		],
		[ACTIONS.DEL_VARIAVEL]: () => state.filter(item => item.key != action.payload.key), 
		'default': () => state,
	};
	return (switcher[action.type] || switcher['default'])();
}

const displayReducer = (state, action) => {
	let switcher = {
		[ACTIONS.DEL_VARIAVEL]: () => state.filter(item => item != action.payload.key),
		[ACTIONS.ADD_COMP]: () => [
			...state,
			action.payload
		],
		[ACTIONS.DEL_COMP]: () => state.filter(key => key != action.payload),
		'default': () => state,
	};
	return (switcher[action.type] || switcher['default'])();
}

const rootReducer = (state = initialState, action) => {
	return {
		variaveis: variaveisReducer(state.variaveis, action),
		display: displayReducer(state.display, action)
	};
}

export default rootReducer;