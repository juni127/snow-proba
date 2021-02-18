import { connect } from 'react-redux';

import Display from './Display';
import Control from './Control';

/* Developers note on Map Dipatch Actions to Props
   If it’s an object full of action creators, each action creator will be turned into a prop function 
   that automatically dispatches its action when called. 
*/

const MS2PDisplay = state => {

}

const MD2PDisplay = {

}

const MS2PControl = state => {

}

const MD2PControl = {

}

export {
	DisplayArea: connect(MS2PDisplay, MD2PDisplay)(Display),
	ControlArea: connect(MS2PControl, MD2PControl)(Control),
}