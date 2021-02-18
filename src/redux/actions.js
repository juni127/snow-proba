import { v4 as uuidv4 } from 'uuid';

export const ACTIONS = {
	ADD_VARIAVEL: 'ADD_VARIAVEL',
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