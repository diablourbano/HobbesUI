import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {map} from 'lodash';
import {HOBBESUI} from '../utils/constants';
import {Welcome} from '../ui/Welcome';
import {CustomDrawer} from '../ui/drawer';
import {Hobbes} from './hobbes';
import {drawerItems} from './navigationUtils';
import {navigationRef, isNavigationReadyRef} from './refs';
import '../../../styleguidesToLoad';

const components = Hobbes.uiComponents();

const customItems = [
  {
    key: HOBBESUI,
    routeName: HOBBESUI,
    title: 'Welcome to HobbesUI',
  },
  ...drawerItems(components),
];

const Drawer = createDrawerNavigator();

export const HobbesNavigator = props => {
  const {onLeaveHobbes} = props;

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
};
