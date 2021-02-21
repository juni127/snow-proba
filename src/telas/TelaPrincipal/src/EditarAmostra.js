import React, { useState, useEffect } from 'react';

import {
    Grid,
    TextField,
    Typography,
    Button,
    IconButton
} from '@material-ui/core';

import {
    Delete
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    amostra: {
        paddingLeft: 32,
    },
    margin: {
        margin: 8,
    }
  }));

const EditarAmostra = props => {

    const [quiQuadrado, setQuiQuadrado] = useState(0);

    const setAmostras = amostras => props.setData({...props.data, amostras}); 
    const setTamanho = tamanho => props.setData({...props.data, tamanho});

    const calcMedia = amostras => amostras.reduce(
        (acc, cur) => acc + (cur.reduce((a, c) => a+parseFloat(c), 0.0)/cur.length), 0.0
    )/amostras.length;

    const calcDesvio = (amostras, media) =>  Math.sqrt(amostras.reduce(
        (acc, cur) => acc + cur.reduce((a, c) => a + Math.pow(parseFloat(c) - media, 2), 0.0), 0.0
    )/amostras.reduce((a, c) => a+c.length, 0.0));

    const calcQuiQuadrado = () => {
        return 0;
    }
    
    const updateMedidas = amostras => {
        let media = calcMedia(amostras);
        let desvio = calcDesvio(amostras, media);
        props.setData({...props.data, amostras, media, desvio});
    }
    
    const changeItem = (v, i, i2) => {
        let a = props.data.amostras;
        let b = a[i];
        b[i2] = v;
        a[i] = b;
        updateMedidas(a);
    }

    const addItem = index => {
        let a = props.data.amostras;
        a[index].push(0);
        updateMedidas(a);
    }

    const delItem = (i, i2) => {
        let a = props.data.amostras;
        a[i].splice(i2, 1);
        updateMedidas(a);
    }

    const delAmostra = index => {
        let a = props.data.amostras;
        a.splice(index, 1);
        updateMedidas(a);
    }

    const modeloCerto = () => {
        return "Modelo correto";
    }

    const classes = useStyles();

    return (
        <Grid
            item
            container
            xs={12}
            direction="column">
            <Typography variant="h6"><b>Media:</b> {props.data.media}</Typography>
            <Typography variant="h6"><b>Desvio Padrão:</b> {props.data.desvio}</Typography>
            
            <Grid
                item
                container
                xs={12}
                direction="row"
                justify="space-between">
                <Typography variant="h4" >Amostras: </Typography>
                <Button 
                    variant="contained"
                    onClick={ () => setAmostras([...props.data.amostras, []]) }
                    className={classes.margin}>
                    Nova Amostra
                </Button>
            </Grid>
            {props.data.amostras.map((amostra, index) => 
                <Grid
                    item
                    container
                    xs={12}
                    direction="column">
                    <Grid 
                        item
                        container
                        xs={12}
                        direction="row"
                        justify="space-between"
                        alignItems="center">
                        <Grid
                            item
                            container
                            xs={8}
                            direction='row'
                            alignItems='center'>
                            <IconButton 
                                aria-label="delete"
                                onClick={ () => delAmostra(index) }>
                                <Delete />
                            </IconButton>
                            <Typography variant="h5">Amostra {index+1}:</Typography>
                        </Grid>
                        

                        <Button 
                            variant="contained"
                            onClick={ () => addItem(index) }
                            className={classes.margin}>
                            Nova Entrada
                        </Button>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        direction="row">
                    {amostra.map((v, i) =>
                        <Grid
                            item
                            container
                            direction="row"
                            xs={6}
                            className={classes.amostra}>
                            <IconButton 
                                aria-label="delete"
                                onClick={ () => delItem(index, i) }>
                                <Delete />
                            </IconButton>
                            <TextField
                                value={v}
                                onChange={e => changeItem(e.target.value, index, i) }/>
                        </Grid>
                    )}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}

export default EditarAmostra;