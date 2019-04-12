import { createDrawerNavigator } from 'react-navigation';
import { HOBBESUI } from '../utils/constants';
import { COLORS } from '../utils/variables';
import { Welcome, CustomDrawer, Hobbes } from '../index';
import { styleGuides, drawerItems } from './navigationUtils';

import '../../../styleguidesToLoad';

const components = Hobbes.uiComponents();

export const HobbesFlow = createDrawerNavigator({
  [HOBBESUI]: Welcome,
  ...styleGuides(components),
}, {
  drawerBackgroundColor: COLORS.lightGray,
  contentComponent: CustomDrawer,
  contentOptions: {
    customItems: [
      {
        key: HOBBESUI,
        routeName: HOBBESUI,
        title: 'Welcome to HobbesUI',
      },
      ...drawerItems(components),
    ],
  },
});
