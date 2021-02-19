import React, { useState } from 'react';

import { connect } from 'react-redux';
import { delVariavel, addComparacao } from '../../../redux/actions';

import clsx from 'clsx';

import {
    Card,
    CardHeader,
    IconButton,
    CardActions,
    Collapse,
    Typography,
    CardContent,
} from '@material-ui/core';

import {
    Delete,
    Favorite,
    ExpandMore
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      margin: 8,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }));

const VariavelItem = props => {

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = e => {
        setExpanded(!expanded);
    }

    return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton 
            aria-label="delete"
            onClick={() => props.delVariavel(props.variavel)}>
            <Delete />
          </IconButton>
        }
        title={props.variavel.id}
        subheader={props.variavel.type}
      />
      <CardActions disableSpacing>
        <IconButton 
            aria-label="add to favorites"
            onClick={() => props.addComparacao(props.variavel.key)}>
          <Favorite />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {props.variavel.data.amostras.map((amostra, index) => 
          <div>
          <Typography paragraph>Amostra {index+1}:</Typography>
          {amostra.map((item, i) => 
            <Typography>{i+1}: {item}</Typography>
          )}
          </div>
          )}
        </CardContent>
      </Collapse>
    </Card>
    );
}

const mapStateToProps = state => ({
});

const mapPropsToDispatch = {
    delVariavel,
    addComparacao,
};

export default connect(mapStateToProps, mapPropsToDispatch)(VariavelItem);