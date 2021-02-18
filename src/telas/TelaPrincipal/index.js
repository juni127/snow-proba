import React from 'react';

import {
	Container
} from '@material-ui/core';

import {
	DisplayArea,
	ControlArea
} from './src'

const TelaPrincipal = props => {
	return (
		<Container>
			<DisplayArea />
			<ControlArea />
		</Container>
	);
}

export default TelaPrincipal;