import React from 'react';
import { capitalize, findIndex, forEach, map } from 'lodash';
import { storeLastRoute } from '../../utils/routeStore';
import { COLORS } from '../../utils/variables';
import { ItemComponent } from './itemComponent';
import Section from './drawerParent';

export const ComponentsGroup = (props) => {
  const { hierarchy, isFiltering, navigation, currentRoute } = props;

  return !hierarchy ? null : map(hierarchy, (parentGroup, parentName) => {
    let intoCurrentRoute = false;
    const parentGroupArr = Object.values(parentGroup);

    forEach(parentGroupArr, (group) => {
      if (findIndex(group, { routeName: currentRoute }) > -1) {
        intoCurrentRoute = true;
        return false;
      }
      return true;
    });

    return (
      <Section
        key={`parent-item-${parentName}`}
        shouldCollapse={!isFiltering && !intoCurrentRoute}
        title={capitalize(parentName)}
      >

        {map(parentGroup, (componentItem, groupName) => {
          const intoCurrentGroup = findIndex(componentItem,
            { routeName: currentRoute }) > -1;

          return (
            <Section
              key={`group-item-${groupName}`}
              title={groupName}
              sectionColor={COLORS.mediumGray}
              sectionHeight={30}
              sectionFontSize={18}
              levelPosition={2}
              shouldCollapse={!isFiltering && !intoCurrentGroup}
            >
              {map(componentItem, ({ key, title, routeName }) => (
                <ItemComponent
                  hasPadding
                  key={`view-item-${key}`}
                  isActive={currentRoute === key}
                  title={title}
                  onPress={() => {
                    storeLastRoute(routeName);
                    navigation.navigate(routeName);
                  }}
                />
              ))}
            </Section>
          );
        })}
      </Section>
    );
  });
};
