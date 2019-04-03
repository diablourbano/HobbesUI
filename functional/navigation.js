import { createDrawerNavigator } from 'react-navigation';
import { STYLEGUIDE_SYSTEM } from '../utils/constants';
import { COLORS } from '../utils/variables';
import { Welcome, CustomDrawer, Styleguide } from '../index';

import '../../../styleguidesToLoad';

const components = Styleguide.uiComponents();

export const styleGuides = (componentsToParse) => {
  const uiComponents = {};

  componentsToParse.forEach(({ id, component }) => {
    uiComponents[id] = component;
  });

  return uiComponents;
}

export const drawerItems = (componentsToParse) => {
  return componentsToParse.map(({
    id,
    group = 'UNGROUPED',
    title,
    parent = 'NOPARENT',
  }) => (
    {
      key: id,
      routeName: id,
      group,
      title,
      parent,
    }
  ));
}

export const StyleguideFlow = createDrawerNavigator({
  [STYLEGUIDE_SYSTEM]: Welcome,
  ...styleGuides(components),
}, {
  drawerBackgroundColor: COLORS.lightGray,
  contentComponent: CustomDrawer,
  contentOptions: {
    customItems: [
      {
        key: STYLEGUIDE_SYSTEM,
        routeName: STYLEGUIDE_SYSTEM,
        title: 'Welcome to Styleguide',
      },
      ...drawerItems(components),
    ],
  },
});
