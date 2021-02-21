import React, { useState } from 'react';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { delComparacao } from '../../../redux/actions';

import {
	Card,
	CardHeader,
	IconButton,
	CardActions,
	Collapse,
	CardContent,
    Typography
} from '@material-ui/core';

import { Chart } from 'react-google-charts';

import {
    Cancel,
    Favorite,
    ExpandMore
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '46%',
      margin: 8,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));

const VariavelCard = props => {

	const classes = useStyles();

	const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);
	const subtitle = () => "Distribuição: " + capitalizeFirstLetter(props.variavel.type);

	const switcher = amostra => {
		let r = 1;
		if(amostra < 0.1)return r;
		r = r + 1;
		if(amostra < 0.2)return r;
		r = r + 1;
		if(amostra < 0.3)return r;
		r = r + 1;
		if(amostra < 0.4)return r;
		r = r + 1;
		if(amostra < 0.5)return r;
		r = r + 1;
		if(amostra < 0.6)return r;
		r = r + 1;
		if(amostra < 0.7)return r;
		r = r + 1;
		if(amostra < 0.8)return r;
		r = r + 1;
		if(amostra < 0.9)return r;
		r = r + 1;
		return r;
	}

	const histo = amostras => {
		let a = [
			['Intervalo', 'Resultados'],
			['[0 - 0.1)', 0],
			['[0.1 - 0.2)', 0],
			['[0.2 - 0.3)', 0],
			['[0.3 - 0.4)', 0],
			['[0.4 - 0.5)', 0],
			['[0.5 - 0.6)', 0],
			['[0.6 - 0.7)', 0],
			['[0.7 - 0.8)', 0],
			['[0.8 - 0.9)', 0],
			['[0.9 - 1]', 0],
		];
		amostras.forEach(
			amostra => amostra.forEach(
				elemento => a[switcher(elemento)][1] = a[switcher(elemento)][1] + 1
			)
		);
		console.log(a);
		return a;
	}

	return(
		<Card className={classes.root}>
		  <CardHeader
			action={
			  <IconButton 
				aria-label="delete"
				onClick={() => props.delComparacao(props.variavel.key)}>
				<Cancel />
			  </IconButton>
			}
			title={props.variavel.id}
			subheader={subtitle()}
		  />
		  <CardContent>
		  	<Chart
  				width={'500px'}
  				height={'300px'}
  				chartType="Histogram"
  				loader={<div>Loading Chart</div>}
  				data={
					props.variavel.data.amostras.reduce(
						(a, c) => a.concat(c.map((v, i) => [v])),
						[['Resultado']]
					)
				}
  				options={{
    				title: 'Histograma das amostras',
    				legend: { position: 'none' },
  				}}
  				rootProps={{ 'data-testid': '1' }}/>
		  	<Chart
  				width={'500px'}
  				height={'300px'}
  				chartType="Histogram"
  				loader={<div>Loading Chart</div>}
  				data={
					props.variavel.data.amostras.reduce(
						(a, c) => a.concat([[c.reduce((v, i) => v+i, 0)/c.length]]),
						[['Resultado']]
					)
				}
  				options={{
    				title: 'Histograma das medias amostrais',
    				legend: { position: 'none' },
  				}}
  				rootProps={{ 'data-testid': '1' }}/>
		  </CardContent>
		</Card>
	);
}

const mapPropsToDispatch = {
	delComparacao,
}

const mapStateToProps = state => {
	return {
	};
}

export default connect(mapStateToProps, mapPropsToDispatch)(VariavelCard);