import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { addVariavel } from '../../../redux/actions';

import ReactFileReader from 'react-file-reader';

import {
    Container,
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';

import ListaAmostra from './ListaAmostra';

const LerVariavel = props => {

    const [alpha, setAlpha] = useState(1);
    const [quantidade, setQuantidade] = useState(1);

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

    const setTamanho = tamanho => setVariavel({...variavel, data: {...variavel.data, tamanho}});
    const setMedia = media => setVariavel({...variavel, data: {...variavel.data, media}});
    const setDesvio = desvio => setVariavel({...variavel, data: {...variavel.data, desvio}}); 

    const handleFiles = f => {
        console.log(f);
    }

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


            <ReactFileReader handleFiles={handleFiles}>
                <Button 
                    variant="contained">
                    Abrir arquivo
                </Button>
            </ReactFileReader>

            <ListaAmostra 
                amostras={variavel.data.amostras}
                media={variavel.data.media}
                desvio={variavel.data.desvio} />
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

export default connect(mapStateToProps, mapPropsToDispatch)(LerVariavel);