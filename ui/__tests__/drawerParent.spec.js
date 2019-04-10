import React from 'react';
import { shallow } from 'enzyme';
import DrawerSection from '../drawer/drawerParent';

describe('DrawerSection', () => {
  it('should render with default values', () => {
    const component = shallow((
      <DrawerSection>
        This is something
      </DrawerSection>
    ));

    expect(component).toMatchSnapshot();
  });

  it('should render it collapsed', () => {
    const component = shallow((
      <DrawerSection
        shouldCollapsed
        title="foo"
      >
        This is something
      </DrawerSection>
    ));

    expect(component).toMatchSnapshot();
  });
});
