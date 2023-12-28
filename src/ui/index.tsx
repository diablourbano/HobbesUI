import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {hobbesTheme} from '../navigation/theme';
import {RootDrawerParamList, type IUIprops} from '../interfaces';
import {Hobbes} from './hobbes';
import {Sidebar} from './sidebar';
import {UIPropsContext} from './context';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export const UI = (props: IUIprops) => {
  const {onLeaveHobbes} = props;

  return (
    <UIPropsContext.Provider value={props}>
      <NavigationContainer theme={hobbesTheme}>
        <Drawer.Navigator
          initialRouteName="Welcome"
          screenOptions={{headerShown: false}}
          drawerContent={drawerProps => (
            <Sidebar {...drawerProps} onLeaveHobbes={onLeaveHobbes} />
          )}>
          <Drawer.Screen name="Welcome" component={Hobbes} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UIPropsContext.Provider>
  );
};
