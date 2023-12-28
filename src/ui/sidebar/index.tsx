import React, {useEffect, useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {snake} from 'radash';
import {functional} from '../../functional';
import {Collapsible} from './collapsible';
import {uiColors} from '../resources';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: uiColors.primary,
    paddingTop: 48,
    paddingBottom: 40,
  },
  searchContainer: {
    height: 100,
    justifyContent: 'center',
  },
  searchInput: {
    height: 40,
    marginHorizontal: 18,
    marginVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: uiColors.primaryLightBackground,
    color: uiColors.primaryDarkText,
    fontWeight: '600',
  },
  footerContainer: {
    height: 60,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: uiColors.primaryLightBackground,
  },
  drawerScrollView: {
    backgroundColor: uiColors.primary,
    borderBottomWidth: 1,
    borderBottomColor: uiColors.primaryDarkShadow,
  },
  drawerContentContainer: {
    backgroundColor: uiColors.primary,
    paddingTop: 0,
  },
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

  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [navItems, setNavItems] = useState(functional.getStructuredStories());

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
            key={`${componentKey}-container`}
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
          isSearching={isSearching}
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
        isSearching={isSearching}
        children={groups}
      />
    );
  });

  const hasTerm = (term: string) =>
    term.toLowerCase().includes(searchText.toLowerCase());

  useEffect(() => {
    if (searchText.length > 0) {
      setIsSearching(true);

      const origNavItems = functional.getRawStories();

      const filteredNavItems = origNavItems.filter(story => {
        const {parent, group, title} = story;

        return hasTerm(parent) || hasTerm(group) || hasTerm(title);
      });

      setNavItems(functional.getStructuredStories(filteredNavItems));
    } else {
      setIsSearching(false);
      setNavItems(functional.getStructuredStories());
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search…"
          placeholderTextColor={uiColors.primaryText}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <DrawerContentScrollView
        {...props}
        style={styles.drawerScrollView}
        contentContainerStyle={styles.drawerContentContainer}>
        {navItemsList}
      </DrawerContentScrollView>

      <View style={styles.footerContainer}>
        <Text style={{color: uiColors.white, marginLeft: 18}}>Hobbes</Text>
      </View>
    </View>
  );
};
