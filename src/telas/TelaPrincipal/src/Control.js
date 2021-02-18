import React from 'react';

import {
	AppBar,
	Container,
	Tab,
	Tabs,
} from '@material-ui/core';

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Control = props => {
	return(
		<Container>

      		<AppBar position="static">
      		  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
      		    <Tab label="Item One" {...a11yProps(0)} />
      		    <Tab label="Item Two" {...a11yProps(1)} />
      		    <Tab label="Item Three" {...a11yProps(2)} />
      		  </Tabs>
      		</AppBar>
      		<TabPanel value={value} index={0}>
      		  Item One
      		</TabPanel>
      		<TabPanel value={value} index={1}>
      		  Item Two
      		</TabPanel>
      		<TabPanel value={value} index={2}>
      		  Item Three
      		</TabPanel>
		</Container>
	);
}

export default Control;