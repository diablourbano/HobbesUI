import React, { Component } from 'react';
import { View } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import * as styled from '../ui/styles';
import { COLORS } from '../utils/variables';

const components = [];

export const Styleguide = {
  add: (config) => {
    const { id, group, title, parent } = config;
    components.push({
      id,
      parent,
      group,
      title,
      component: guideSystem(config),
    });
  },

  uiComponents: () => {
    return components;
  },
}

function guideSystem (config) {
  const { title, component } = config;

  return class StyleguideSystem extends Component {
    static navigationOptions = {
      drawerLabel: title,
    };

    render() {
      return (
        <View>
          {component}

          <styled.ButtonView>
            <styled.SliderButton
              title=">"
              color={COLORS.snowWhite}
              onPress={() => {
                this.props.navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            />
          </styled.ButtonView>
        </View>
      );
    }
  }
};
