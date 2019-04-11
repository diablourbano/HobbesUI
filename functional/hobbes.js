import React, { Component } from 'react';
import { View } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import isEmpty from 'lodash.isempty';
import * as styled from '../ui/styles';
import { COLORS } from '../utils/variables';

const components = [];

function guideSystem(config) {
  const { title, component } = config;

  return class HobbesUISystem extends Component {
    static navigationOptions = {
      drawerLabel: title,
    };

    render() {
      const { navigation } = this.props;
      return (
        <View>
          {component}

          <styled.ButtonView>
            <styled.SliderButton
              title=">"
              color={COLORS.snowWhite}
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            />
          </styled.ButtonView>
        </View>
      );
    }
  };
}

export const Hobbes = {
  add: (config = {}) => {
    if (isEmpty(config)) return;

    const isValidId = !!config.id;
    const isValidComponent = !!config.component;

    if (!isValidId || !isValidComponent) return;

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
};
