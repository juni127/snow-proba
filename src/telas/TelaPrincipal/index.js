import React from 'react';

import {
	Grid
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import {
	DisplayArea,
	ControlArea
} from './src';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      padding: 8,
    },
  }));

const TelaPrincipal = props => {

	const classes = useStyles();

	return (
		<Grid
			container
			direction="row" 
			className={classes.root}>
			<DisplayArea />
			<ControlArea />
		</Grid>
	);
}

export default TelaPrincipal;