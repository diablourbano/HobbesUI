import React from 'react';
import { shallow } from 'enzyme';
import { ItemComponent } from '../drawer/itemComponent';

/* eslint no-console: 0 */
describe('ItemComponent snapshots', () => {
  it('should be null if no title', () => {
    const component = shallow((
      <ItemComponent
        hasPadding
        onPress={() => console.log('press item')}
      />
    ));

    expect(component.isEmptyRender()).toEqual(true);
  });

  it('should be null if no onPress', () => {
    const component = shallow((
      <ItemComponent
        title="foo"
      />
    ));

    expect(component.isEmptyRender()).toEqual(true);
  });

  it('should have hasPadding', () => {
    const component = shallow((
      <ItemComponent
        hasPadding
        onPress={() => console.log('press item')}
        title="something"
      />
    ));

    expect(component).toMatchSnapshot();
  });

  it('should be active', () => {
    const component = shallow((
      <ItemComponent
        hasPadding
        isActive
        onPress={() => console.log('press item')}
        title="something"
      />
    ));

    expect(component).toMatchSnapshot();
  });
});
