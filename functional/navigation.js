import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { map, isEqual } from 'lodash';
import {HOBBESUI} from '../utils/constants';
import {Welcome} from '../ui/Welcome';
import {CustomDrawer} from '../ui/drawer';
import {Hobbes} from './hobbes';
import {drawerItems} from './navigationUtils';
import {navigationRef, isNavigationReadyRef} from './refs';
import '../../../styleguidesToLoad';

const Drawer = createDrawerNavigator();

export class HobbesNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      components:  Hobbes.uiComponents(),
    };
  }

  componentDidUpdate() {
    const { components } = this.state;
    const newComponents = Hobbes.uiComponents();

    if (!isEqual(components, newComponents)) {
      this.setState({ components: Hobbes.uiComponents() });
    }
  }


  render() {
    const {onLeaveHobbes} = this.props;
    const { components } = this.state;

    const customItems = [
      {
        key: HOBBESUI,
        routeName: HOBBESUI,
        title: 'Welcome to HobbesUI',
      },
      ...drawerItems(components),
    ];

    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isNavigationReadyRef.current = true;
        }}
      >
        <Drawer.Navigator
          initialRouteName={HOBBESUI}
          headerMode="screen"
          headerShown={false}
          drawerContent={drawerProps => (
            <CustomDrawer
              {...drawerProps}
              customItems={customItems}
              onLeaveHobbes={onLeaveHobbes}
            />
          )}
        >
          <Drawer.Screen
            options={{headerTitle: null}}
            key={HOBBESUI}
            name={HOBBESUI}
            component={Welcome}
          />

          {map(components, ({id: ScreenId, component: ScreenComponent}) => (
            <Drawer.Screen
              options={{headerTitle: null}}
              key={ScreenId}
              name={ScreenId}
            >
              {props => ScreenComponent}
            </Drawer.Screen>
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
