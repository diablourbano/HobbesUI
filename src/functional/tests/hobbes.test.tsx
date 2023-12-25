import React from 'react';
import {Text, View} from 'react-native';
import {Functional, type IConfig} from '../index';

const SampleCompNoProps = () => (
  <View>
    <Text>Comp</Text>
  </View>
);

const config: IConfig = {
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
  Functional.reset();
});

describe('Functional add components', () => {
  it('should add a view component if config is correct', () => {
    expect(Functional.add(config)).toEqual([config]);
  });

  it('should not add a view component if config.id exists', () => {
    Functional.add(config);

    expect(() => {
      Functional.add(config);
    }).toThrow(`Component with id ${config.id} already exists`);
  });

  it('should add a view component if config.id !exists', () => {
    Functional.add(config);

    const config2: IConfig = {
      ...config,
      id: 'other-id',
    };

    expect(Functional.add(config2)).toEqual([config, config2]);
  });

  it('should not add a view component if config.id null or undefined', () => {
    const config2: IConfig = {
      ...config,
      id: '',
    };

    expect(Functional.add(config2)).toEqual([]);
  });

  it('should return the components to render structured by parent, group', () => {
    const config2: IConfig = {
      ...config,
      id: 'other-id',
    };

    const config3: IConfig = {
      ...config,
      id: 'another-id',
      parent: 'other_parent',
      group: 'group',
    };

    const config4: IConfig = {
      ...config,
      id: 'is-this-an-id',
      parent: 'other_parent',
      group: 'other_group',
    };

    Functional.add(config);
    Functional.add(config2);
    Functional.add(config3);
    Functional.add(config4);

    expect(Functional.getStructuredStories()).toEqual({
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
