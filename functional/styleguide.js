import React, { Component } from 'react';

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
      return component;
    }
  }
};
