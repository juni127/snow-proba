import React, { useState } from 'react';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { delComparacao } from '../../../redux/actions';

import {
	Card,
	CardHeader,
	IconButton,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableContainer,
	TableHead,
	Grid,
} from '@material-ui/core';

import { Chart } from 'react-google-charts';

import {
    Cancel,
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

	const media = amostra => amostra.reduce((a, b) => a+b, 0)/amostra.length;
	const mediana = amostra =>
		amostra.length%2?
		amostra.sort((a, b) => a<b?-1:a>b?1:0)[(amostra.length-1)/2]:
		(amostra.sort((a, b) => a<b?-1:a>b?1:0)[amostra.length/2]+amostra.sort((a, b) => a<b?-1:a>b?1:0)[(amostra.length/2)-1])/2;
	const limiteSuperior = amostra => amostra.reduce((a, b) => Math.max(a, b), 0);
	const limiteInferior = amostra => amostra.reduce((a, b) => Math.min(a, b), 1);
	const primeiroQuartil = amostra => amostra.sort((a, b) =>  a<b?-1:a>b?1:0)[Math.round(0.25*amostra.length)];
	const terceiroQuartil = amostra => amostra.sort((a, b) =>  a<b?-1:a>b?1:0)[Math.round(0.75*amostra.length)];

	const toExponencial = x => (-1/props.variavel.data.alpha) * Math.log(1 - x);

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
			<Chart
				width={'500px'}
				height={'300px'}
				chartType="LineChart"
				loader={<div>Loading Chart</div>}
				data={[
					[
					{ type: 'number', label: 'x' },
					{ type: 'number', label: 'values' },
					{ id: 'i1', type: 'number', role: 'interval' },
					{ id: 'i0', type: 'number', role: 'interval' },
					{ id: 'i1', type: 'number', role: 'interval' },
					{ id: 'i0', type: 'number', role: 'interval' },
					{ id: 'i1', type: 'number', role: 'interval' },
					],
					...props.variavel.data.amostras.map((v, i) => 
						[i+1, media(v), limiteInferior(v), primeiroQuartil(v), mediana(v), terceiroQuartil(v), limiteSuperior(v)]
					)
				]}
				options={{
					title: 'Box Plot',
					curveType: 'function',
					intervals: { color: 'series-color' },
					interval: {
						i0: {
							color: '#4374E0',
							barWidth: 1,
							boxWidth: 1,
							lineWidth: 2,
							style: 'boxes'
						},
						i1: {
							color: '#E49307',
							style: 'bars',
							fillOpacity: 1,
							color: '#777'
						},
					},
					legend: 'none',
				}}
				rootProps={{ 'data-testid': '8' }}
				/>
			<Chart
				width={'500px'}
				height={'300px'}
				chartType="ScatterChart"
				loader={<div>Loading Chart</div>}
				data={[
					['Amostrais', 'Esperado'],
					...props.variavel.data.amostras
						.reduce((a, b) => a.concat(b), [])
						.sort((a, b) => a<b?-1:a>b?1:0)
						.map((v, i, a) => [
							v, 
							props.variavel.type=="exponencial"?toExponencial(i/a.length):i/a.length
						]),
				]}
				options={{
					title: 'Normal Probability Plot',
					hAxis: { title: 'Amostra', minValue: 0, maxValue: 1 },
					vAxis: { title: 'Esperado', minValue: 0, maxValue: 1 },
					legend: 'none',
					trendlines: {
					  0: {},
					}
				}}
				rootProps={{ 'data-testid': '1' }}
				/>
			<TableContainer component={Grid}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
				<TableRow>
					<TableCell>{props.variavel.id}</TableCell>
					<TableCell align="right">Media</TableCell>
					<TableCell align="right">Mediana</TableCell>
					<TableCell align="right">Limite Inferior</TableCell>
					<TableCell align="right">Primeiro Quartil</TableCell>
					<TableCell align="right">Terceiro Quartil</TableCell>
					<TableCell align="right">Limite Superior</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{props.variavel.data.amostras.map((amostra, index) => (
					<TableRow key={index}>
					<TableCell component="th" scope="row">
						Amostra: {index+1}
					</TableCell>
					<TableCell align="right">{media(amostra)}</TableCell>
					<TableCell align="right">{mediana(amostra)}</TableCell>
					<TableCell align="right">{limiteInferior(amostra)}</TableCell>
					<TableCell align="right">{primeiroQuartil(amostra)}</TableCell>
					<TableCell align="right">{terceiroQuartil(amostra)}</TableCell>
					<TableCell align="right">{limiteSuperior(amostra)}</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
			</TableContainer>
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