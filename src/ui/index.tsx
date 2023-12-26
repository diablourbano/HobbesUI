import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {hobbesTheme} from '../navigation/theme';
import {RootDrawerParamList, type IUIprops} from '../interfaces';
import {Hobbes} from './hobbes';
import {UIPropsContext} from './context';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export const UI = (props: IUIprops) => (
  <UIPropsContext.Provider value={props}>
    <NavigationContainer theme={hobbesTheme}>
      <Drawer.Navigator
        initialRouteName="Welcome"
        screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Welcome" component={Hobbes} />
      </Drawer.Navigator>
    </NavigationContainer>
  </UIPropsContext.Provider>
);
