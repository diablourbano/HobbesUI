import { isEmpty } from 'lodash';

const components = [];

export const Hobbes = {
  add: (config = {}) => {
    if (isEmpty(config)) return;

    const isValidId = !!config.id;
    const isValidComponent = !!config.component;

    if (!isValidId || !isValidComponent) return;

    const { id, group, title, parent, component } = config;
    components.push({
      id,
      parent,
      group,
      title,
      component,
    });
  },

  uiComponents: () => {
    return components;
  },
};
