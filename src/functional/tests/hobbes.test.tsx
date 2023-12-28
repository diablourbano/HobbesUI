import React from 'react';
import {Text, View} from 'react-native';
import {functional} from '../index';
import {type IConfigParams} from '../../interfaces';

const SampleCompNoProps = () => (
  <View>
    <Text>Comp</Text>
  </View>
);

const config: IConfigParams = {
  id: 'some-id',
  parent: 'parent',
  group: 'group',
  title: 'title',
  description: 'description',
  component: (
    <View>
      <SampleCompNoProps />
    </View>
  ),
};

afterEach(() => {
  functional.reset();
});

describe('functional add components', () => {
  it('should add a view component if config is correct', () => {
    expect(functional.add(config)).toEqual([config]);
  });

  it('should not add a view component if config.id exists', () => {
    functional.add(config);

    expect(() => {
      functional.add(config);
    }).toThrow(`Component with id ${config.id} already exists`);
  });

  it('should add a view component if config.id !exists', () => {
    functional.add(config);

    const config2: IConfigParams = {
      ...config,
      id: 'other-id',
    };

    expect(functional.add(config2)).toEqual([config, config2]);
  });

  it('should set parent to NOPARENT and group to NOGROUP if they are null or undefined', () => {
    const config2: IConfigParams = {
      ...config,
      id: 'other-id',
      parent: null,
      group: undefined,
    };

    expect(functional.add(config2)).toEqual([
      {
        ...config2,
        parent: 'NOPARENT',
        group: 'NOGROUP',
      },
    ]);
  });

  it('should not add a view component if config.id null or undefined', () => {
    const config2: IConfigParams = {
      ...config,
      id: '',
    };

    expect(functional.add(config2)).toEqual([]);
  });
});

describe('functional get components', () => {
  it('should return the components to render structured by parent, group', () => {
    const config2: IConfigParams = {
      ...config,
      id: 'other-id',
    };

    const config3: IConfigParams = {
      ...config,
      id: 'another-id',
      parent: 'other_parent',
      group: 'group',
    };

    const config4: IConfigParams = {
      ...config,
      id: 'is-this-an-id',
      parent: 'other_parent',
      group: 'other_group',
    };

    functional.add(config);
    functional.add(config2);
    functional.add(config3);
    functional.add(config4);

    expect(functional.getStructuredStories()).toEqual({
      parent: {
        group: [config, config2],
      },
      other_parent: {
        group: [config3],
        other_group: [config4],
      },
    });
  });
});
