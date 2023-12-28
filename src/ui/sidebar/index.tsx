import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {snake} from 'radash';
import {functional} from '../../functional';
import {Collapsible} from './collapsible';
import {uiColors} from '../resources';

const styles = StyleSheet.create({
  drawerItemContainer: {
    height: 60,
    justifyContent: 'center',
  },
  labelStyle: {
    color: uiColors.white,
    marginLeft: 18,
  },
  selectedIndicator: {
    height: 30,
    width: 4,
    backgroundColor: uiColors.secondary,
    borderRadius: 2,
    position: 'absolute',
    top: 15,
    left: 18,
  },
  collapsibleText: {
    color: uiColors.primaryDarkText,
  },
  childrenContainer: {
    flex: 1,
  },
  groupCollapsibleText: {
    color: uiColors.primaryText,
    fontSize: 15,
    marginLeft: 36,
  },
  groupChildrenContainer: {
    backgroundColor: uiColors.contentBackground,
  },
});

export const Sidebar = props => {
  const {
    onLeaveHobbes,
    navigation: {navigate},
  } = props;

  const [selectedItem, setSelectedItem] = useState('home');

  const navItems = functional.getStructuredStories();

  const parents = Object.keys(navItems);

  const navItemsList = parents.map((parent, parentIdx) => {
    const parentKey = snake(parent);

    const groupsKeys = Object.keys(navItems[parent]);

    const groups = groupsKeys.map((group, groupIdx) => {
      const groupKey = `${parentKey}_${snake(group)}`;

      const componentsKeys = navItems[parent][group];
      const components = componentsKeys.map((component, compIdx) => {
        const componentKey = `${groupKey}_${snake(component.id)}`;

        const isFirst = compIdx === 0;
        const isLast = compIdx === componentsKeys.length - 1;

        return (
          <View
            style={[
              styles.drawerItemContainer,
              isFirst
                ? {borderTopWidth: 0}
                : {borderTopWidth: 1, borderTopColor: '#666'},
              isLast
                ? {borderBottomWidth: 0}
                : {
                    borderBottomWidth: 1,
                    borderBottomColor: '#333',
                  },
            ]}>
            {selectedItem === component.id && (
              <View style={styles.selectedIndicator} />
            )}

            <DrawerItem
              key={componentKey}
              label={component.title}
              labelStyle={styles.labelStyle}
              onPress={() => {
                setSelectedItem(component.id);
                navigate(component.id);
              }}
            />
          </View>
        );
      });

      return (
        <Collapsible
          key={groupKey}
          collapsibleKey={groupKey}
          label={group.toUpperCase()}
          backgroundColor={uiColors.primaryLightBackground}
          topDividerColor={uiColors.primaryLighterShadow}
          bottomDividerColor={uiColors.primaryLightShadow}
          styles={{
            collapsibleText: styles.groupCollapsibleText,
            childrenContainer: styles.groupChildrenContainer,
          }}
          isFirst={groupIdx === 0}
          isLast={groupIdx === groupsKeys.length - 1}
          expandedHeight={components.length * 60}
          children={components}
        />
      );
    });

    const totalComponents = Object.keys(navItems[parent]).reduce(
      (acc, group) => {
        return acc + navItems[parent][group].length;
      },
      0,
    );

    return (
      <Collapsible
        key={parentKey}
        collapsibleKey={parentKey}
        label={parent.toUpperCase()}
        backgroundColor={uiColors.primary}
        styles={{
          collapsibleText: styles.collapsibleText,
          childrenContainer: styles.childrenContainer,
        }}
        expandedHeight={groups.length * 60 + totalComponents * 60}
        isFirst={parentIdx === 0}
        isLast={parentIdx === parents.length - 1}
        children={groups}
      />
    );
  });

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: uiColors.primary}}
      contentContainerStyle={{backgroundColor: uiColors.primary}}>
      {navItemsList}
    </DrawerContentScrollView>
  );
};
