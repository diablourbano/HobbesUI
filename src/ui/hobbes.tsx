import {DrawerScreenProps} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {IUIprops, RootDrawerParamList} from '../interfaces';
import {UIPropsContext} from './context';
import {uiColors} from './resources';

const hobbesuiLogo = require('../assets/hobbesui.png');
const {width} = Dimensions.get('window');

const logoSquare = width * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  logoContainer: {
    flexShrink: 0,
    flexGrow: 0.4,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  logo: {
    width: logoSquare,
    height: logoSquare,
  },
  content: {
    flexGrow: 0.25,
    justifyContent: 'space-around',
  },
  isoContainer: {
    marginTop: 32,
  },
  isoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: uiColors.primary,
  },
  isoDesc: {
    fontSize: 16,
    color: uiColors.secondary,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: uiColors.note,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: uiColors.error,
    textAlign: 'center',
  },
});

export const Hobbes = (props: DrawerScreenProps<RootDrawerParamList>) => {
  const {navigation} = props;

  const uiProps = useContext(UIPropsContext);

  const {welcome = {}} = (uiProps as IUIprops) || {};

  const {
    logo = hobbesuiLogo,
    appName = 'HobbesUI',
    appDescription = 'A Rapid Development UI environment',
    buttonText = 'Open Drawer',
    styles: customStyles = {},
  } = welcome;

  const {
    container: customContiner = {},
    logoContainer: customLogoContainer = {},
    logo: customLogo = {},
    isoContainer: customIsoContainer = {},
    isoText: customIsoText = {},
    isoDesc: customIsoDesc = {},
    button: customButton = {},
    buttonText: customButtonText = {},
  } = customStyles;

  const openSidebar = () => {
    navigation.openDrawer();
  };

  return (
    <View style={[styles.container, customContiner]}>
      <View style={[styles.logoContainer, customLogoContainer]}>
        <Image style={[styles.logo, customLogo]} source={logo} />
      </View>

      <View style={styles.content}>
        <View style={[styles.isoContainer, customIsoContainer]}>
          <Text style={[styles.isoText, customIsoText]}>{appName}</Text>
          <Text style={[styles.isoDesc, customIsoDesc]}>{appDescription}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, customButton]}
          onPress={openSidebar}>
          <Text style={[styles.buttonText, customButtonText]}>
            {buttonText.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
