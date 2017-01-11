/*
 *  NavigationDrawer.js
 *
 *  Author: Sam Heilbron
 *  Last Updated: 10-04-2016
 *
 *  The framework for the Navigation Drawer which slides out from the left
 */

'use strict';

import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer, Actions } from 'react-native-router-flux';
import StomperSideNavContent from './content/StomperSideNavContent';
import StompApiStore from '../../stores/StompApiStore';

const propTypes = {
  navigationState: PropTypes.object
};

class StomperNavigationDrawer extends React.Component {
    render() {
        const state = this.props.navigationState;
        const children = state.children;
        
        return (
            <Drawer
        		ref={ (ref) => this.drawer = ref}
        		type="displace"
        		onOpen={() => Actions.refresh({ key: state.key, open: true })}
        		onClose={() => Actions.refresh({ key: state.key, open: false })}
        		content={<StomperSideNavContent firstName={StompApiStore.getUserFirstName()} />}
        		tapToClose
        		openDrawerOffset={0.4}
        		panCloseMask={0.4}
        		negotiatePan
        		tweenHandler={(ratio) => ({
          			main: { opacity: Math.max(.2, 1 - ratio) },
        		})}
      		>
         		<DefaultRenderer navigationState={children[children.length-1]} onNavigate={this.props.onNavigate}/>
      		</Drawer>
    	);
  	}
}

StomperNavigationDrawer.propTypes = propTypes;
export default StomperNavigationDrawer;