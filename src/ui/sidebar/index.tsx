import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {functional} from '../../functional';
import {uiColors} from '../resources';
import {HOME} from '../../constants';
import {TSidebarProps} from '../../interfaces';
import {NavItemsList} from './parent';

const homeIcon = require('../../assets/home.png');
const logoutIcon = require('../../assets/logout.png');

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
  drawerScrollView: {
    backgroundColor: uiColors.primary,
  },
  drawerContentContainer: {
    backgroundColor: uiColors.primary,
    paddingTop: 0,
  },
  footerContainer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 4,
  },
  footerButton: {
    height: 60,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 36,
    width: 36,
  },
  footerText: {
    color: uiColors.primaryText,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },
});

export const Sidebar = (props: TSidebarProps) => {
  const {
    onLeaveHobbes,
    navigation: {navigate},
  } = props;

  const [selectedItem, setSelectedItem] = useState('home');

  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [navItems, setNavItems] = useState(functional.getStructuredStories());

  const goToHome = () => {
    setSelectedItem('home');
    navigate(HOME);
  };

  const onSelectItem = (itemId: string) => {
    setSelectedItem(itemId);
    navigate(itemId);
  };

  useEffect(() => {
    const hasTerm = (term: string) =>
      term.toLowerCase().includes(searchText.toLowerCase());

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
        <NavItemsList
          isSearching={isSearching}
          navItems={navItems}
          selectedItem={selectedItem}
          onSelectItem={onSelectItem}
        />
      </DrawerContentScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton} onPress={goToHome}>
          <Image style={styles.icon} source={homeIcon} />
          <Text style={styles.footerText}>home</Text>
        </TouchableOpacity>

        {onLeaveHobbes && (
          <TouchableOpacity style={styles.footerButton} onPress={onLeaveHobbes}>
            <Image style={styles.icon} source={logoutIcon} />
            <Text style={styles.footerText}>exit</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
