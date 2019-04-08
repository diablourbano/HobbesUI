import {
  AsyncStorage,
} from 'react-native';
import { STYLEGUIDE_SYSTEM } from './constants';

export const storeLastRoute = async (currentRoute) => {
  try {
    await AsyncStorage.setItem('LAST_ROUTE', currentRoute);
  } catch (error) {
    // Error saving data
  }
};

export const retrieveLastRoute = async (currentRoute, navigation) => {
  try {
    const value = await AsyncStorage.getItem('LAST_ROUTE');
    const lastRoute = value || STYLEGUIDE_SYSTEM;

    if (currentRoute !== lastRoute) {
      navigation.navigate({ routeName: lastRoute });
    }
  } catch (error) {
    console.log({ error }); // eslint-disable-line no-console
  }
};
