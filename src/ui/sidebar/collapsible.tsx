import React, {useRef, useState, useEffect} from 'react';
import {Animated, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {CollapsibleProps} from '../../interfaces';
import {uiColors} from '../resources';

const triangleSize = 12;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  collapsibleButton: {
    height: 60,
    justifyContent: 'center',
  },
  collapsibleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 24,
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: triangleSize,
    borderRightWidth: triangleSize,
    borderBottomWidth: triangleSize,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    transform: [{rotate: '180deg'}],
  },
  trianglePosition: {
    position: 'absolute',
    top: 0,
    left: 26,
    zIndex: 1,
  },
});

/* eslint-disable react-hooks/exhaustive-deps */
export const Collapsible = (props: CollapsibleProps) => {
  const {
    collapsibleKey,
    label,
    children,
    backgroundColor = uiColors.primary,
    expandedHeight,
    bottomDividerColor = uiColors.primaryDarkShadow,
    topDividerColor = uiColors.primaryLightBackground,
    isLast = false,
    isFirst = false,
    isSearching = false,
    styles: {
      container: containerStyle = {},
      collapsibleButton: collapsibleButtonStyle = {},
      collapsibleText: collapsibleTextStyle = {},
      childrenContainer: childrenContainerStyle = {},
    } = {},
  } = props;

  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapsibleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const toggleCollapse = (collapse: boolean) => {
    Animated.timing(collapsibleAnim, {
      toValue: collapse ? 0 : 1,
      duration: collapse ? 600 : 500,
      useNativeDriver: false,
    }).start(() => setIsCollapsed(collapse));
  };

  const toggleOpacity = (opacityIn: boolean) => {
    Animated.timing(opacityAnim, {
      toValue: opacityIn ? 1 : 0,
      duration: opacityIn ? 300 : 1400,
      useNativeDriver: false,
    }).start();
  };

  const toggleColapseState = (shouldCollapse: boolean) => {
    if (shouldCollapse) {
      toggleCollapse(false);
      toggleOpacity(true);
    } else {
      toggleCollapse(true);
      toggleOpacity(false);
    }
  };

  const stylesWhenFirst = isFirst
    ? {borderTopWidth: 0}
    : {borderTopWidth: 1, borderTopColor: topDividerColor};

  const stylesWhenLast =
    isLast || !isCollapsed
      ? {borderBottomWidth: 0}
      : {
          borderBottomWidth: 1,
          borderBottomColor: bottomDividerColor,
        };

  useEffect(() => {
    toggleColapseState(isSearching);
  }, [isSearching]);

  return (
    <View
      key={`${collapsibleKey}-container`}
      style={[
        styles.container,
        stylesWhenFirst,
        stylesWhenLast,
        containerStyle,
        {backgroundColor},
      ]}>
      <TouchableOpacity
        key={`${collapsibleKey}-button`}
        onPress={() => toggleColapseState(isCollapsed)}
        style={[styles.collapsibleButton, collapsibleButtonStyle]}>
        <Text
          key={`${collapsibleKey}-buttonText`}
          style={[styles.collapsibleText, collapsibleTextStyle]}>
          {label}
        </Text>
      </TouchableOpacity>

      <Animated.View
        key={`${collapsibleKey}-children`}
        style={[
          childrenContainerStyle,
          {
            maxHeight: collapsibleAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, expandedHeight],
            }),
            opacity: opacityAnim,
          },
        ]}>
        <View style={[styles.trianglePosition]}>
          <View
            style={[styles.triangle, {borderBottomColor: backgroundColor}]}
          />
        </View>
        {children}
      </Animated.View>
    </View>
  );
};
