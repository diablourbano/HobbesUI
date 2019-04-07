import React from 'react';
import { shallow } from 'enzyme';
import { Welcome } from '../Welcome';

describe('Welcome screen', () => {
  it('should match snapshot', () => {
    const component = shallow(<Welcome />);
    expect(component).toMatchSnapshot();
  });
});
