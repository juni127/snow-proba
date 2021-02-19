import React from 'react';

import { connect } from 'react-redux';

import {
    Container
} from '@material-ui/core';

import VariavelItem from './VariavelItem';

const Variaveis = props => {
    return (
        <Container>
            {props.variaveis.map(item => 
                <VariavelItem variavel={item} delVariavel={props.delVariavel}/>
            )}
        </Container>
    );
}

const mapStateToProps = state => ({
    variaveis: state.variaveis,
});

const mapPropsToDispatch = {
};

export default connect(mapStateToProps, mapPropsToDispatch)(Variaveis);