import { createDrawerNavigator } from 'react-navigation';
import { STYLEGUIDE_SYSTEM } from '../utils/constants';
import { COLORS } from '../utils/variables';
import { Welcome, CustomDrawer, Styleguide } from '../index';
import { styleGuides, drawerItems } from './navigationUtils';

import '../../../styleguidesToLoad';

const components = Styleguide.uiComponents();

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
