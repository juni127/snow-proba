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

import EditarAmostra from './EditarAmostra';

const useStyles = makeStyles((theme) => ({
    root: {
    },
    grupoa: {

    },
    margin: {
        margin: 8,
    },
    salvar: {
        position: 'absolute',
        bottom: 32,
        right: 32,
    }
  }));


const EscreverVariavel = props => {

    const [variavel, setVariavel] = useState({
		id: '', 
		type: 'uniforme', 
		data: {
			amostras: [],
			tamanho: 5,
			media: 0.5,
			desvio: 0,
		}
    });

    const setId = id => setVariavel({...variavel, id});
    const setType = type => setVariavel({...variavel, type});
    const setData = data => setVariavel({...variavel, data});

    const classes = useStyles();

    return (
        <Grid
            item
            container
            xs={12}
            direction="column"
            className={classes.root}>
                
            <Grid
                item
                container
                xs={12}
                direction="row"
                className={classes.grupoa}>

                <TextField 
                    value={variavel.id}
                    onChange={e => setId(e.target.value)}
                    label="Identificador"
                    className={classes.margin}/>

                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={variavel.type}
                onChange={(a, b) => setType(b.props.value)}
                className={classes.margin}>

                <MenuItem value='uniforme'>Uniforme</MenuItem>
                <MenuItem value='exponencial'>Exponencial</MenuItem>
                <MenuItem value='normal'>Normal</MenuItem>
                
                </Select>
            </Grid>

            <EditarAmostra
                data={variavel.data}
                setData={setData} />

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

export default connect(mapStateToProps, mapPropsToDispatch)(EscreverVariavel);