import React from 'react';
import {Text, View} from 'react-native';
import {stories} from '../functional';
import {type IConfigParams} from '../interfaces';

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
  component: _props => (
    <View>
      <SampleCompNoProps />
    </View>
  ),
};

afterEach(() => {
  stories.reset();
});

describe('functional add components', () => {
  it('should add a view component if config is correct', () => {
    expect(stories.add(config)).toEqual([config]);
  });

  it('should not add a view component if config.id exists', () => {
    stories.add(config);

    expect(() => {
      stories.add(config);
    }).toThrow(`Component with id ${config.id} already exists`);
  });

  it('should add a view component if config.id !exists', () => {
    stories.add(config);

    const config2: IConfigParams = {
      ...config,
      id: 'other-id',
    };

    expect(stories.add(config2)).toEqual([config, config2]);
  });

  it('should set parent to NOPARENT and group to NOGROUP if they are null or undefined', () => {
    const config2: IConfigParams = {
      ...config,
      id: 'other-id',
      parent: null,
      group: undefined,
    };

    expect(stories.add(config2)).toEqual([
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

    expect(stories.add(config2)).toEqual([]);
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

    stories.add(config);
    stories.add(config2);
    stories.add(config3);
    stories.add(config4);

    expect(stories.getStructuredStories()).toEqual({
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

describe('functional get raw stories', () => {
  it('should return the components to render', () => {
    const config2: IConfigParams = {
      ...config,
      id: 'other-id',
    };

    stories.add(config);
    stories.add(config2);

    expect(stories.getRawStories()).toEqual([config, config2]);
  });
});

describe('functional reset components', () => {
  it('should reset components', () => {
    stories.add(config);

    expect(stories.getRawStories()).toEqual([config]);

    stories.reset();

    expect(stories.getRawStories()).toEqual([]);
  });
});
