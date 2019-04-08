export const styleGuides = (componentsToParse = []) => {
  const uiComponents = {};

  componentsToParse.forEach(({ id, component = null }) => {
    uiComponents[id] = component;
  });

  return uiComponents;
};

export const drawerItems = (componentsToParse = []) => {
  return componentsToParse.map(({
    id,
    group = 'UNGROUPED',
    title,
    parent = 'NOPARENT',
  }) => (
    {
      key: id,
      routeName: id,
      group,
      title: title || id,
      parent,
    }
  ));
};
