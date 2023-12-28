import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {hobbesTheme} from '../navigation/theme';
import {RootDrawerParamList, type IUIprops} from '../interfaces';
import { functional } from '../functional';
import {Hobbes} from './hobbes';
import {Sidebar} from './sidebar';
import {UIPropsContext} from './context';
import {HOME} from 'hobbesui/src/constants';

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export const UI = (props: IUIprops) => {
  const {onLeaveHobbes} = props;

  return (
    <UIPropsContext.Provider value={props}>
      <NavigationContainer theme={hobbesTheme}>
        <Drawer.Navigator
          initialRouteName={HOME}
          screenOptions={{headerShown: false}}
          drawerContent={drawerProps => (
            <Sidebar {...drawerProps} onLeaveHobbes={onLeaveHobbes} />
          )}>
          <Drawer.Screen key={HOME} name={HOME} component={Hobbes} />

          {functional.getRawStories().map(({id, component: Comp}) => (
            <Drawer.Screen
              key={id}
              name={id}
            >
              {_drawerProps => (
                <SafeAreaView style={styles.safeAreaView}>
                  {Comp}
                </SafeAreaView>
              )}
            </Drawer.Screen>
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    </UIPropsContext.Provider>
  );
};
