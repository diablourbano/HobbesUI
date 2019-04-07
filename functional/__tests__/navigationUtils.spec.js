import { styleGuides, drawerItems } from '../navigationUtils';

describe('prepare drawerItems', () => {
  it('should return empty drawer items', () => {
    const drawer = drawerItems();
    expect(drawer).toEqual([]);
  });

  it('should return drawer items with default values', () => {
    const drawer = drawerItems([
      {
        id: 'foobar',
      },
    ]);
    expect(drawer).toEqual([{
      key: 'foobar',
      routeName: 'foobar',
      group: 'UNGROUPED',
      title: 'foobar',
      parent: 'NOPARENT',
    }])
  });

  it('should return drawer items', () => {
    const drawer = drawerItems([
      {
        id: 'foobar',
        group: 'GROUP',
        title: 'foo',
        parent: 'SOMETHING',
      },
    ]);
    expect(drawer).toEqual([{
      key: 'foobar',
      routeName: 'foobar',
      group: 'GROUP',
      title: 'foo',
      parent: 'SOMETHING',
    }])
  });
});

describe('prepare styleGuides', () => {
  it('should prepare components with default', () => {
    const components = [{
      id: 'foobar',
    }];
    const componentsToLoad = styleGuides(components);

    expect(componentsToLoad).toEqual({
      foobar: null,
    });
  });

  it('should prepare components', () => {
    const components = [{
      id: 'foobar',
      component: "hi, this is the component",
    }];
    const componentsToLoad = styleGuides(components);

    expect(componentsToLoad).toEqual({
      foobar: "hi, this is the component",
    });
  });
});
