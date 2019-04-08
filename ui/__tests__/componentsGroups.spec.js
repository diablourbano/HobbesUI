import React from 'react';
import { shallow } from 'enzyme';
import { ComponentsGroup } from '../drawer/componentsGroups';

describe('ComponentsGroup snapshots', () => {
  it('should return null if hierarchy is undefined', () => {
    const component = shallow((
      <ComponentsGroup />
    ));
    expect(component.isEmptyRender()).toEqual(true);
  });

  it('should return [] if hierarchy is empty', () => {
    const component = shallow((
      <ComponentsGroup hierarchy={[]} />
    ));
    expect(component).toMatchSnapshot();
  });

  // it('should', () => {
  //   const component = shallow(
  //   );

  //   expect(component).toMatchSnapshot();
  // });
});
