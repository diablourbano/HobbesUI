import React, {useRef, useState, useEffect} from 'react';
import {Animated, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
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
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: triangleSize,
    borderRightWidth: triangleSize,
    borderBottomWidth: triangleSize,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
    transform: [{ rotate: "180deg" }],
  },
  trianglePosition: {
    position: "absolute",
    top: 0,
    left: 26,
    zIndex: 1,
  },
});

type CollapsibleProps = {
  collapsibleKey: string;
  label: string;
  backgroundColor?: string;
  expandedHeight: number;
  bottomDividerColor?: string;
  topDividerColor?: string;
  isLast?: boolean;
  isFirst?: boolean;
  isSearching?: boolean;
  styles?: {
    container?: object;
    collapsibleButton?: object;
    collapsibleText?: object;
    childrenContainer?: object;
  };
  children: JSX.Element[];
};

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

  const collapse = () => {
    Animated.timing(collapsibleAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: false,
    }).start(() => setIsCollapsed(true));
  };

  const expand = () => {
    Animated.timing(collapsibleAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => setIsCollapsed(false));
  };

  const opacityIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const opacityOut = () => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 1400,
      useNativeDriver: false,
    }).start();
  };

  const toggleParent = () => {
    if (isCollapsed) {
      expand();
      opacityIn();
    } else {
      collapse();
      opacityOut();
    }
  };

  useEffect(() => {
    if (isSearching) {
      expand();
      opacityIn();
    } else {
      collapse();
      opacityOut();
    }
  }, [isSearching]);

  return (
    <View
      key={`${collapsibleKey}-container`}
      style={[
        styles.container,
        isFirst
          ? {borderTopWidth: 0}
          : {borderTopWidth: 1, borderTopColor: topDividerColor},
        isLast || !isCollapsed
          ? {borderBottomWidth: 0}
          : {
              borderBottomWidth: 1,
              borderBottomColor: bottomDividerColor,
            },
        containerStyle,
        {backgroundColor},
      ]}>
      <TouchableOpacity
        key={`${collapsibleKey}-button`}
        onPress={toggleParent}
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
          <View style={[
            styles.triangle,
            {borderBottomColor: backgroundColor},
          ]} />
        </View>
        {children}
      </Animated.View>
    </View>
  );
};
