import { v4 as uuidv4 } from 'uuid';

export const ACTIONS = {
	ADD_VARIAVEL: 'ADD_VARIAVEL',
	DEL_VARIAVEL: 'DEL_VARIAVEL',
	ADD_COMP: 'ADD_COMP',
}

export const addVariavel = variavel => {
	return {
		type: ACTIONS.ADD_VARIAVEL,
		payload: {
			...variavel,
			key: uuidv4()
		}
	};
}

export const delVariavel = payload => {
	return {
		type: ACTIONS.DEL_VARIAVEL,
		payload,
	}
}

export const addComparacao = payload => {
	return {
		type: ACTIONS.ADD_COMP,
		payload
	};
}