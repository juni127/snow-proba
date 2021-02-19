import React, { useState } from 'react';

import {
	AppBar,
	Grid,
	Tab,
	Tabs,
	Box,
	Toolbar,
	IconButton,
	Typography
} from '@material-ui/core';

import { 
	ChevronRight,
	ChevronLeft,
} from '@material-ui/icons';

import {
	makeStyles, withTheme
} from '@material-ui/core/styles';

import Variaveis from './Variaveis';
import GerarVariavel from './GerarVariavel';
import EscreverVariavel from './EscreverVariavel';
import LerVariavel from './LerVariavel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
		position: 'absolute',
		right: 0,
		top: 0,
		maxWidth: 720,
		height: '100%',
		backgroundColor: 'white',
		borderLeft: '1px solid grey',
    },
    rootCollapsed: {
		position: 'absolute',
		right: -660,
		top: 0,
		maxWidth: 720,
		height: '100%',
		backgroundColor: 'white',
		borderLeft: '1px solid grey',
    },
	tbPanel: {
		flexGrow: 1,
		width: '100%',
		minHeight: 0,
		flexDirection: 'column',
	}
  }));

const Control = props => {

	const [value, setValue] = useState(0);
	const [collapsed, setCollapsed] = useState(false);

	const handleChange = (e, i) => {
		setValue(i);
	}

	const classes = useStyles();

	return(
		<Grid
			item
			container
			direction="column"
			justify="flex-start"
			alignItems="flex-start"
			className={collapsed?classes.rootCollapsed:classes.root}>

      		<AppBar position="static">
			  <Toolbar>
				  <IconButton edge="start" color="inherit" onClick={() => setCollapsed(!collapsed)}>
					  {collapsed?<ChevronLeft />:<ChevronRight />}
				  </IconButton>
				  <Typography variant="h6">
					  Painel de Controle
				  </Typography>
			  </Toolbar>
      		  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
      		    <Tab label="Variaveis" />
      		    <Tab label="Gerar Variavel" />
      		    <Tab label="Escrever Variavel" />
      		    <Tab label="Ler Variavel" />
      		  </Tabs>
      		</AppBar>
      		<TabPanel value={value} index={0} className={classes.tbPanel}>
      		  <Variaveis />
      		</TabPanel>
      		<TabPanel value={value} index={1} className={classes.tbPanel}>
      		  <GerarVariavel /> 
      		</TabPanel>
      		<TabPanel value={value} index={2} className={classes.tbPanel}>
      		  <EscreverVariavel /> 
      		</TabPanel>
      		<TabPanel value={value} index={3} className={classes.tbPanel}>
      		  <LerVariavel /> 
      		</TabPanel>
		</Grid>
	);
}

export default Control;