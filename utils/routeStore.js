import {
  AsyncStorage,
} from 'react-native';
import { HOBBESUI } from './constants';

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
    const lastRoute = value || HOBBESUI;

    if (currentRoute !== lastRoute) {
      navigation.navigate({ routeName: lastRoute });
    }
  } catch (error) {
    console.log({ error }); // eslint-disable-line no-console
  }
};
