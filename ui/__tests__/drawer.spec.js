import React from 'react';
import { shallow } from 'enzyme';
import { CustomDrawer } from '../drawer';

const customItem = [
  {
    key: 'HOBBESUI',
    routeName: 'HOBBESUI',
    title: 'Welcome to HobbesUI',
  },
];

const customItems = [
  customItem[0],
  {
    key: 'FOO',
    parent: 'someparent',
    group: 'somegroup',
    routeName: 'FOO',
    title: 'foo',
  },
  {
    key: 'BAR',
    parent: 'someparent',
    group: 'somegroup',
    routeName: 'BAR',
    title: 'bar',
  },
];

/* eslint no-console: 0 */
describe('ItemComponent', () => {
  it('should be null if no customItems', () => {
    const component = shallow((
      <CustomDrawer
        customItems={[]}
        activeItemKey="SOMETHING"
        navigation={{ navigate: () => null }}
      />
    ));

    expect(component.isEmptyRender()).toEqual(true);
  });

  describe('only one item', () => {
    let component = null;
    let container = null;

    beforeEach(() => {
      component = shallow((
        <CustomDrawer
          customItems={customItem}
          navigation={{ navigate: () => null }}
        />
      ));

      container = component.childAt(0);
    });

    it('should be render only the existent comp', () => {
      const welcomeComponent = container.childAt(1);
      expect(welcomeComponent.props().title).toEqual(customItem[0].title);

      const componentGroups = container.childAt(2).children();
      expect(componentGroups.length).toEqual(0);
    });

    it('should set active to unique item', () => {
      const welcomeComponent = container.childAt(1);
      expect(welcomeComponent.props().isActive).toEqual(true);
    });
  });

  describe('items to show', () => {
    it('should render three items and default route to first item', () => {
      const component = shallow((
        <CustomDrawer
          customItems={customItems}
          navigation={{ navigate: () => null }}
        />
      ));

      const container = component.childAt(0);
      expect(container.children().length).toEqual(3);

      const welcomeComponent = container.childAt(1);
      expect(welcomeComponent.props().isActive).toEqual(true);

      const hierarchyProps = container.childAt(2).props().hierarchy;
      expect(hierarchyProps.someparent.somegroup.length).toEqual(2);
    });

    it('should set active to unique item', () => {
      const component = shallow((
        <CustomDrawer
          customItems={customItems}
          activeItemKey="BAR"
          navigation={{ navigate: () => null }}
        />
      ));

      const container = component.childAt(0);
      expect(container.children().length).toEqual(3);

      const welcomeComponent = container.childAt(1);
      expect(welcomeComponent.props().isActive).toEqual(false);

      const componentGroupsProps = container.childAt(2).props();
      expect(componentGroupsProps.currentRoute).toEqual('BAR');
      const { hierarchy } = componentGroupsProps;
      expect(hierarchy.someparent.somegroup.length).toEqual(2);
    });
  });
});
