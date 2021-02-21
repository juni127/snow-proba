import React, { useState } from 'react';

import { connect } from 'react-redux';
import { delVariavel, addComparacao } from '../../../redux/actions';

import clsx from 'clsx';

import {
    Card,
    Grid,
    CardHeader,
    IconButton,
    CardActions,
    Collapse,
    Typography,
    CardContent,
} from '@material-ui/core';

import {
    Delete,
    AddCircleOutline,
    ExpandMore
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '100%',
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
        subheader={'Distribuição: ' + props.variavel.type}
      />
      <CardActions disableSpacing>
        <IconButton 
            aria-label="add to favorites"
            onClick={() => props.addComparacao(props.variavel.key)}>
          <AddCircleOutline />
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
          <Grid
            item
            container
            xs={12}
            direction="column">
          <Typography variant='h5' paragraph>Amostra {index+1}:</Typography>
            <Grid
              item
              container
              direction='row'>
            {amostra.map((item, i) => 
              <Grid
                item
                container
                xs={6}>
                <Typography>{i+1}: {item}</Typography>
              </Grid>
            )}
            </Grid>
          </Grid>
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