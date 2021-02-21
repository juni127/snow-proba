import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { addVariavel } from '../../../redux/actions';

import ReactFileReader from 'react-file-reader';
import XLSX from 'xlsx';

import {
    Container,
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

    const handleFiles = f => {
        let res = {};
        let file = f[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, {type: 'array'});
          Object.entries(Object.values(workbook.Sheets)[0])
            .forEach(v => {
                if (typeof res[v[0].replace(/[0-9]/g, '')] === 'undefined')res[v[0].replace(/[0-9]/g, '')] = [];
                res[v[0].replace(/[0-9]/g, '')] = [...res[v[0].replace(/[0-9]/g, '')], v[1].v];
            });
          delete res['!margins'];
          delete res['!ref'];
          let amostras = [];
          Object.entries(res).forEach(v => {
              amostras.push(v[1])
          });
          let tamanho = amostras[0].length;
          let media = amostras.reduce(
            (acc, cur) => acc + (cur.reduce((a, c) => a+c, 0.0)/cur.length), 0.0
          )/amostras.length;
          let somaDesvio = amostras.reduce(
            (acc, cur) => acc + (cur.reduce((a, c) => a + Math.pow(c - media, 2), 0.0)), 0.0
          );
          let desvio = Math.sqrt(somaDesvio/(amostras.length*tamanho));
          setVariavel({
              ...variavel,
              data:{
                  amostras,
                  tamanho,
                  media,
                  desvio,
              }
          });
        };
        reader.readAsArrayBuffer(file);
    }

    const classes = useStyles();

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
              <MenuItem value='normal'>Normal</MenuItem>
            
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
                onClick={ () => props.salvarVariavel(variavel) }
                className={classes.salvar}>
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