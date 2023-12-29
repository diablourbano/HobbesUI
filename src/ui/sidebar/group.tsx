import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import {snake} from 'radash';
import {Collapsible} from './collapsible';
import {uiColors} from '../resources';
import {TNavItemsObj, IConfig, NavItemsListProps} from '../../interfaces';

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
  groupCollapsibleText: {
    color: uiColors.primaryText,
    fontSize: 15,
    marginLeft: 36,
  },
  groupChildrenContainer: {
    backgroundColor: uiColors.contentBackground,
  },
});

export const NavItemsGroups = (props: NavItemsListProps) => {
  const {isSearching, navItems, selectedItem, parent, onSelectItem} = props;

  const groupsKeys = Object.keys(navItems[parent as string] as TNavItemsObj);

  const groups = groupsKeys.map((group, groupIdx) => {
    const groupKey = `${snake(parent as string)}_${snake(group)}`;

    const componentsKeys = (navItems[parent as string] as any)[group];

    const components = componentsKeys.map(
      (component: IConfig, compIdx: number) => {
        const componentKey = `${groupKey}_${snake(component.id)}`;

        const isFirst = compIdx === 0;
        const isLast = compIdx === componentsKeys.length - 1;

        const stylesWhenFirst = isFirst
          ? {borderTopWidth: 0}
          : {borderTopWidth: 1, borderTopColor: '#666'};

        const stylesWhenLast = isLast
          ? {borderBottomWidth: 0}
          : {
              borderBottomWidth: 1,
              borderBottomColor: '#333',
            };

        return (
          <View
            key={`${componentKey}-container`}
            style={[
              styles.drawerItemContainer,
              stylesWhenFirst,
              stylesWhenLast,
            ]}>
            {selectedItem === component.id && (
              <View
                key={`${componentKey}-indicator`}
                style={styles.selectedIndicator}
              />
            )}

            <DrawerItem
              key={componentKey}
              label={component.title}
              labelStyle={styles.labelStyle}
              onPress={() => {
                onSelectItem(component.id);
              }}
            />
          </View>
        );
      }
    );

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
        isSearching={isSearching}
        expandedHeight={components.length * 60}
        children={components}
      />
    );
  });

  return <>{groups}</>;
};
