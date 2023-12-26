import {DefaultTheme} from '@react-navigation/native';
import {uiColors} from '../ui/resources';

export const hobbesTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: uiColors.secondary,
    background: uiColors.white,
  },
};
