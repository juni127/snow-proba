import React from 'react';

import { connect } from 'react-redux';

import {
	Container,
    Typography
} from '@material-ui/core';

const VariavelCard = props => {
	return(
		<Container>
            <Typography>{props.variavel.id}</Typography>
		</Container>
	);
}

const mapPropsToDispatch = {

}

const mapStateToProps = state => {
	return {
	};
}

export default connect(mapStateToProps, mapPropsToDispatch)(VariavelCard);