import React, { Component } from 'react';
import {
  ScrollView,
} from 'react-native';
import filter from 'lodash.filter';
import forEach from 'lodash.foreach';
import groupBy from 'lodash.groupby';
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

  filterStyleguides = (text) => {
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
    } = this.props;

    const [Welcome, ...componentItems] = customItems;

    const hierarchy = groupBy(isFiltering
      ? filteredComps : componentItems, 'parent');
    forEach(hierarchy, (group, parent) => {
      hierarchy[parent] = groupBy(group, 'group');
    });

    return (
      <ScrollView>
        <styled.SafeView
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <styled.FilterComps
            placeholder="filter..."
            value={filterValue}
            onChangeText={this.filterStyleguides}
          />

          {!isFiltering && (
            <ItemComponent
              isActive={currentRoute === Welcome.key}
              title={Welcome.title}
              onPress={() => {
                storeLastRoute(Welcome.routeName);
                navigation.navigate({ routeName: Welcome.routeName });
              }}
            />
          )}
          <ComponentsGroup
            hierarchy={hierarchy}
            isFiltering={isFiltering}
            navigation={navigation}
            currentRoute={currentRoute}
          />
        </styled.SafeView>
      </ScrollView>
    );
  }
}
