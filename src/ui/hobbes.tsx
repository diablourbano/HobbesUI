import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {IUIprops, TNavProps} from '../interfaces';
import {UIPropsContext} from './context';
import {uiColors} from './resources';

const background = require('../assets/hobbesui_bg.png');
const arrow = require('../assets/arrow.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  blankSpace: {
    flexShrink: 0,
    flexGrow: 0.4,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  content: {
    flexGrow: 0.3,
    justifyContent: 'space-around',
  },
  isoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  isoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: uiColors.primary,
    backgroundColor: uiColors.white,
    paddingHorizontal: 6,
    paddingLeft: 10,
    paddingVertical: 2,
    letterSpacing: 1,
  },
  uiText: {
    letterSpacing: 2,
    color: uiColors.white,
    fontSize: 46,
    backgroundColor: uiColors.primary,
    paddingHorizontal: 4,
    paddingVertical: 0,
    paddingLeft: 6,
  },
  isoDesc: {
    fontSize: 16,
    color: uiColors.white,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: uiColors.primary,
    transform: [{translateY: -30}],
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: uiColors.error,
    borderRadius: 12,
    alignSelf: 'flex-start',
    transform: [{translateX: -20}],
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonRight: {
    alignSelf: 'flex-end',
    transform: [{translateX: 20}, {translateY: -30}],
    backgroundColor: uiColors.error,
  },
  arrow: {
    width: 24,
    height: 16,
    marginRight: 4,
  },
  arrowRight: {
    transform: [{rotate: '180deg'}],
    marginRight: 0,
    marginLeft: 4,
  },
  buttonContent: {
    marginLeft: 4,
  },
  buttonContentLeft: {
    marginLeft: 0,
    marginRight: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: uiColors.white,
    textAlign: 'center',
  },
  buttonDesc: {
    fontSize: 12,
    color: uiColors.white,
    textAlign: 'center',
    marginTop: 4,
  },
});

export const Hobbes = (props: TNavProps) => {
  const {navigation} = props;

  const uiProps = useContext(UIPropsContext);

  const {welcome = {}} = (uiProps as IUIprops) || {};

  const {
    appDescription = 'A Rapid Development UI environment',
    styles: customStyles = {},
  } = welcome;

  const {
    container: customContiner = {},
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
    <ImageBackground
      source={background}
      style={[styles.container, customContiner]}
      resizeMode="cover">
      <View style={styles.blankSpace} />

      <View style={styles.content}>
        <View style={[styles.isoContainer, customIsoContainer]}>
          <Text style={[styles.isoText, customIsoText]}>hobbes</Text>
          <Text style={[styles.isoText, styles.uiText, customIsoText]}>UI</Text>
        </View>

        <Text style={[styles.isoDesc, customIsoDesc]}>{appDescription}</Text>

        <TouchableOpacity
          style={[styles.button, styles.buttonRight, customButton]}
          onPress={openSidebar}>
          <View style={[styles.buttonContent, styles.buttonContentLeft]}>
            <Text style={[styles.buttonText, customButtonText]}>OPEN INFO</Text>

            <Text style={styles.buttonDesc}>(swipe from right edge)</Text>
          </View>

          <Image style={[styles.arrow, styles.arrowRight]} source={arrow} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, customButton]}
          onPress={openSidebar}>
          <Image style={styles.arrow} source={arrow} />

          <View style={styles.buttonContent}>
            <Text style={[styles.buttonText, customButtonText]}>
              Open Drawer
            </Text>

            <Text style={styles.buttonDesc}>(swipe from left edge)</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
