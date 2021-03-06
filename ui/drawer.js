import React, { Component } from 'react';
import {
  isEmpty,
  filter,
  forEach,
  groupBy,
} from 'lodash';
import { storeLastRoute, retrieveLastRoute } from '../utils/routeStore';
import { ItemComponent } from './drawer/itemComponent';
import { ComponentsGroup } from './drawer/componentsGroups';
import * as styled from './styles';

export class CustomDrawer extends Component {
  state = {
    filterValue: null,
    filteredComps: [],
    isFiltering: false,
  };

  componentDidMount() {
    const { activeItemKey: currentRoute, navigation } = this.props;
    retrieveLastRoute(currentRoute, navigation);
  }

  filterComps = (text) => {
    const { customItems } = this.props;
    const [Welcome, ...componentItems] = customItems; // eslint-disable-line

    const isFiltering = !!text;

    const filterRegex = new RegExp(text, 'i');
    const filteredComps = isFiltering
      ? filter(componentItems,
        (item) => filterRegex.test(item.title) || filterRegex.test(item.group))
      : [];

    this.setState({
      filterValue: text,
      filteredComps,
      isFiltering,
    });
  };

  render() {
    const { isFiltering, filterValue, filteredComps } = this.state;
    const {
      customItems,
      activeItemKey: currentRoute,
      navigation,
      onLeaveHobbes,
    } = this.props;

    if (isEmpty(customItems)) return null;

    const [Welcome, ...componentItems] = customItems;

    const isFirstItemActive = currentRoute === Welcome.key
      || !currentRoute || customItems.length === 1;

    const hierarchy = groupBy(isFiltering
      ? filteredComps : componentItems, 'parent');
    forEach(hierarchy, (group, parent) => {
      hierarchy[parent] = groupBy(group, 'group');
    });

    return (
      <styled.SidebarUI>
        <styled.DrawerScrollView {...this.props}>
          <styled.FilterComps
            placeholder="filter..."
            value={filterValue}
            onChangeText={this.filterComps}
          />

          {!isFiltering && (
            <ItemComponent
              isActive={isFirstItemActive}
              title={Welcome.title}
              onPress={() => {
                storeLastRoute(Welcome.routeName);
                navigation.navigate(Welcome.routeName);
              }}
            />
          )}
          <ComponentsGroup
            hierarchy={hierarchy}
            isFiltering={isFiltering}
            navigation={navigation}
            currentRoute={currentRoute}
          />

        </styled.DrawerScrollView>

        <styled.LeaveBtn onPress={onLeaveHobbes}>
          <styled.LeaveLabel>
            Leave HobbesUI
          </styled.LeaveLabel>
        </styled.LeaveBtn>
      </styled.SidebarUI>
    );
  }
}

CustomDrawer.defaultProps = {
  customItems: [],
  activeItemKey: null,
};
