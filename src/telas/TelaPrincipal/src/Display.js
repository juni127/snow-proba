import React from 'react';

import {
	Grid
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import VariavelCard from './VariavelCard';

const useStyles = makeStyles((theme) => ({
    root: {
	  flex: 1,
	  flexDirection: 'row',
      width: '50%',
	  paddingRight: 60,
    },
}));

const Display = props => {

	const classes = useStyles();

	return(
		<Grid
			item
			container
			direction='row'
			justify='center'
			className={classes.root}>
			{props.variaveis.map(variavel =>
				<VariavelCard variavel={variavel} />	
			)}
		</Grid>
	);
}


export default Display;