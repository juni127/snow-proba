import React from 'react';

import { connect } from 'react-redux';

import {
    Grid
} from '@material-ui/core';

import VariavelItem from './VariavelItem';

const Variaveis = props => {
    return (
        <Grid
            item
            container
            direction="column"
            xs={12}>
            {props.variaveis.map(item => 
                <VariavelItem variavel={item} delVariavel={props.delVariavel}/>
            )}
        </Grid>
    );
}

const mapStateToProps = state => ({
    variaveis: state.variaveis,
});

const mapPropsToDispatch = {
};

export default connect(mapStateToProps, mapPropsToDispatch)(Variaveis);