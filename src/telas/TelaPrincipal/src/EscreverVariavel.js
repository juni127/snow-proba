import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { addVariavel } from '../../../redux/actions';

import {
    Container,
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';

import EditarAmostra from './EditarAmostra';

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

    return (
        <Container>
                
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
            
            </Select>

            <EditarAmostra
                data={variavel.data}
                setData={setData} />

            <Button 
                variant="contained"
                onClick={ () => props.salvarVariavel(variavel) }>
                Salvar
            </Button>
        </Container>
    );
}

const mapStateToProps = state => ({

});

const mapPropsToDispatch = {
    salvarVariavel: variavel => addVariavel(variavel),
};

export default connect(mapStateToProps, mapPropsToDispatch)(EscreverVariavel);