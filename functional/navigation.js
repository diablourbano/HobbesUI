import { createDrawerNavigator } from 'react-navigation';
import { STYLEGUIDE_SYSTEM } from '../utils/constants';
import { COLORS } from '../utils/variables';
import { Welcome } from '../index';
import { CustomDrawer } from '../index';
import { Styleguide } from '../index';

import 'navigation/guidesToLoad';

const components = Styleguide.uiComponents();

function styleGuides() {
  const uiComponents = {};

  components.forEach(({ id, component }) => {
    uiComponents[id] = component;
  });

  return uiComponents;
}

function drawerItems() {
  return components.map(({ id, group = 'UNGROUPED', title, parent = 'NOPARENT' }) => (
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
  ...styleGuides(),
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
      ...drawerItems(),
    ],
  },
});
