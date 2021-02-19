import React from 'react';

import {
    Container,
    Typography
} from '@material-ui/core';

const ListaAmostra = props => {
    return (
        <Container>
            <Typography>Média: {props.media}</Typography>
            <Typography>Desvio Padrão: {props.desvio}</Typography>
            <Typography>Amostras:</Typography>
            {props.amostras.map((amostra, index) =>
                <Container>
                    <Typography>Amostra {index+1}:</Typography>
                    {amostra.map((v, i) => 
                        <Typography>{i+1}: {v}</Typography>
                    )}
                </Container>
            )}
        </Container>
    );
}

export default ListaAmostra;