import React from 'react';

import {
    Grid,
    Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 8,
        paddingTop: 16,
    },
    amostra: {
        paddingLeft: 16
    }
}));

const ListaAmostra = props => {

    const classes = useStyles();

    return (
        <Grid
            item
            container
            xs={12}
            direction="column"
            className={classes.root}>
            <Typography variant="h6"><b>Média:</b> {props.media}</Typography>
            <Typography variant="h6"><b>Desvio Padrão:</b> {props.desvio}</Typography>
            <Typography variant="h4">Amostras:</Typography>
            {props.amostras.map((amostra, index) =>
                <Grid
                    item
                    container
                    xs={12}
                    direction="column"
                    className={classes.amostra}>
                    <Typography variant="h5">Amostra {index+1}:</Typography>
                    <Grid
                        item
                        container
                        direction="row">
                    {amostra.map((v, i) => 
                        <Grid
                            item
                            container
                            xs={6}>
                                <Typography><b>{i+1}:</b> {v}</Typography>
                        </Grid>
                    )}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}

export default ListaAmostra;