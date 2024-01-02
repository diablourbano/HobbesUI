import React from 'react';
import {StyleSheet} from 'react-native';
import {get, snake} from 'radash';
import {Collapsible} from './collapsible';
import {NavItemsGroups} from './group';
import {uiColors} from '../resources';
import {TNavItemsObj, NavItemsListProps} from '../../interfaces';

const styles = StyleSheet.create({
  collapsibleText: {
    color: uiColors.primaryDarkText,
  },
  childrenContainer: {
    flex: 1,
  },
});

export const NavItemsList = (props: NavItemsListProps) => {
  const {isSearching, navItems, selectedItem, onSelectItem} = props;

  const parents = Object.keys(navItems);

  const comps = parents.map((parent, parentIdx) => {
    const parentKey = snake(parent);

    const groupsKeys = Object.keys(navItems[parent] as TNavItemsObj);

    const totalComponents = groupsKeys.reduce((acc, group) => {
      return acc + get(navItems, `${parent}.${group}`, []).length;
    }, 0);

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
        expandedHeight={groupsKeys.length * 60 + totalComponents * 60}
        isFirst={parentIdx === 0}
        isLast={parentIdx === parents.length - 1}
        isSearching={isSearching}>
        <NavItemsGroups
          isSearching={isSearching}
          navItems={navItems}
          selectedItem={selectedItem}
          parent={parent}
          onSelectItem={onSelectItem}
        />
      </Collapsible>
    );
  });

  return <>{comps}</>;
};
