import {group, mapEntries} from 'radash';
import {type IConfigParams, type IConfig} from '../interfaces';

let components: IConfig[] = [];

export const functional = {
  add: (config: IConfigParams) => {
    if (components.find(c => c.id === config.id)) {
      throw new Error(`Component with id ${config.id} already exists`);
    }

    if (!config.id) {
      return components;
    }

    if (!config.parent) {
      config.parent = 'NOPARENT';
    }

    if (!config.group) {
      config.group = 'NOGROUP';
    }

    components.push(config as IConfig);

    return components;
  },
  getRawStories: () => components,
  getStructuredStories: (stories = components) =>
    mapEntries(
      group(stories, (c: IConfig) => c.parent),
      (key, parent) => [
        key,
        group(parent as IConfig[], (p: IConfig) => p.group),
      ]
    ),
  reset: () => {
    components = [];
  },
};
