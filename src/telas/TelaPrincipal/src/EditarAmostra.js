import React, { useState, useEffect } from 'react';

import {
    Container,
    TextField,
    Typography,
    Button,
    IconButton
} from '@material-ui/core';

import {
    Delete
} from '@material-ui/icons';

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



    return (
        <Container>
            <Typography>Media: {props.data.media}</Typography>
            <Typography>Desvio Padrão: {props.data.desvio}</Typography>
            <Typography>Qui-Quadrado: {modeloCerto()}, P(x) = {quiQuadrado}</Typography>
            <Typography>Amostras: </Typography>
            {props.data.amostras.map((amostra, index) => 
                <Container>
                    <IconButton 
                        aria-label="delete"
                        onClick={ () => delAmostra(index) }>
                        <Delete />
                    </IconButton>
                    <Typography>Amostra {index+1}:</Typography>
                    {amostra.map((v, i) =>
                        <Container>
                            <IconButton 
                                aria-label="delete"
                                onClick={ () => delItem(index, i) }>
                                <Delete />
                            </IconButton>
                            <TextField
                                value={v}
                                onChange={e => changeItem(e.target.value, index, i) }/>
                        </Container>
                    )}
                    <Button 
                        variant="contained"
                        onClick={ () => addItem(index) }>
                        Nova Entrada
                    </Button>
                </Container>
            )}
            <Button 
                variant="contained"
                onClick={ () => setAmostras([...props.data.amostras, []]) }>
                Nova Amostra
            </Button>
        </Container>
    );
}

export default EditarAmostra;