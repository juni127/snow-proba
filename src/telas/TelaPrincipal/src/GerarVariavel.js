import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { addVariavel } from '../../../redux/actions';

import {
    Grid,
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import ListaAmostra from './ListaAmostra';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    children: {
    },
    salvar: {
        position: 'absolute',
        bottom: 32,
        right: 32,
    }
}));

const GerarVariavel = props => {

    const classes = useStyles();

    const [quantidade, setQuantidade] = useState(1);
    const [seedNormal, setSeedNormal] = useState(100);

    const [variavel, setVariavel] = useState({
		id: '', 
		type: 'uniforme', 
		data: {
			amostras: [],
			tamanho: 5,
			media: 0.5,
			desvio: 0,
            alpha: 1,
		}
    });

    const setId = id => setVariavel({...variavel, id});

    const setType = type => setVariavel({...variavel, type});

    const setTamanho = tamanho => setVariavel({...variavel, data: {...variavel.data, tamanho}});
    const setAlpha = alpha => setVariavel({...variavel, data: {...variavel.data, alpha}})

    // Distribuição quase uniforme entre [0, 1)
    const randomNumber = () => {
        let arr = new Uint32Array(2);
        window.crypto.getRandomValues(arr);
        let mantissa = (arr[0] * Math.pow(2, 20)) + (arr[1] >> 12);
        return mantissa * Math.pow(2, -52);
    }

    const normal = () => {
        let tmp = new Array(parseInt(seedNormal)).fill(0);
        tmp = tmp.map(v => randomNumber());
        return tmp.reduce((a, c) => a+c, 0)/tmp.length;
    }

    const toExponencial = x => (-1/variavel.data.alpha) * Math.log(1 - x);

    const gerarVariavel = () => {
        let amostras = 
            new Array(parseInt(quantidade)).fill(
                new Array(parseInt(variavel.data.tamanho)).fill(0)
            );

        const switcher = {
            'uniforme': () => randomNumber(),
            'exponencial': () => toExponencial(randomNumber()),
            'normal': () => normal(),
        };

        amostras = amostras.map(amostra => amostra.map(i => switcher[variavel.type]()));
        
        let somaMedia = amostras.reduce(
            (acc, cur) => acc + (cur.reduce((a, c) => a+c, 0.0)/cur.length), 0.0
        );

        let media = somaMedia/amostras.length;

        let somaDesvio = amostras.reduce(
            (acc, cur) => acc + (cur.reduce((a, c) => a + Math.pow(c - media, 2), 0.0)), 0.0
        );

        let desvio = Math.sqrt(somaDesvio/(quantidade*variavel.data.tamanho));

        setVariavel({...variavel, data: {...variavel.data, amostras, media, desvio}});
    }        

    return (
        <Grid
            item
            xs={12}
            container
            direction="column"
            justify="flex-start"
            className={ classes.root }>
                
            <Grid
                item
                xs={12}
                container
                direction="row"
                className={classes.children}>
                <TextField 
                    value={variavel.id}
                    onChange={e => setId(e.target.value)}
                    label="Identificador"/>

                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={variavel.type}
                onChange={(a, b) => setType(b.props.value)}>

                <MenuItem value='uniforme'>Uniforme</MenuItem>
                <MenuItem value='exponencial'>Exponencial</MenuItem>
                <MenuItem value='normal'>Normal</MenuItem>
                
                </Select>
            </Grid>

            <Grid
                item
                xs={12}
                container
                direction="row"
                className={classes.children}>
                <TextField 
                    value={quantidade}
                    onChange={e => setQuantidade(e.target.value)}
                    label="Quantidade de Amostras"/>

                <TextField 
                    value={variavel.data.tamanho}
                    onChange={e => setTamanho(e.target.value)}
                    label="Tamanho das Amostras"/>
            </Grid>

            { variavel.type == 'exponencial' && <TextField 
                value={variavel.data.alpha}
                onChange={e => setAlpha(e.target.value)}
                label="Alfa"/>
            }

            { variavel.type == 'normal' && <TextField 
                value={seedNormal}
                onChange={e => setSeedNormal(e.target.value)}
                label="Tamanho da Amostra"/>
            }

            <Button 
                variant="contained"
                onClick={ () => gerarVariavel() }>
                Gerar
            </Button>

            <ListaAmostra 
                amostras={variavel.data.amostras}
                media={variavel.data.media}
                desvio={variavel.data.desvio} />

            <Button 
                variant="contained"
                onClick={ () => props.salvarVariavel(variavel) }
                className={classes.salvar}>
                Salvar
            </Button>
        </Grid>
    );
}

const mapStateToProps = state => ({

});

const mapPropsToDispatch = {
    salvarVariavel: variavel => addVariavel(variavel),
};

export default connect(mapStateToProps, mapPropsToDispatch)(GerarVariavel);