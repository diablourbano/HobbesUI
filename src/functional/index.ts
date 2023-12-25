import {group, mapEntries} from 'radash';
import {IConfig} from '../interfaces';

let components: IConfig[] = [];

export const functional = {
  add: (config: IConfig) => {
    if (components.find(c => c.id === config.id)) {
      throw new Error(`Component with id ${config.id} already exists`);
    }

    if (!config.id) {
      return components;
    }

    components.push(config);

    return components;
  },
  getStructuredStories: () =>
    mapEntries(
      group(components, (c: IConfig) => c.parent),
      (key, parent) => [
        key,
        group(parent as IConfig[], (p: IConfig) => p.group),
      ]
    ),
  reset: () => {
    components = [];
  },
};
