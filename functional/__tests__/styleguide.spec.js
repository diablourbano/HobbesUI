import { Styleguide } from '../styleguide';

describe('Styleguide invalid conditions', () => {
  it('should not add view component if config is empty', () => {
    Styleguide.add({});
    expect(Styleguide.uiComponents()).toEqual([]);
  });

  it('shuld not add component if config is null', () => {
    Styleguide.add(null);
    expect(Styleguide.uiComponents()).toEqual([]);
  });

  it('shuld not add component if config is undefined', () => {
    Styleguide.add();
    expect(Styleguide.uiComponents()).toEqual([]);
  });

  it('shuld not add component if id is null', () => {
    Styleguide.add({ id: null });
    Styleguide.add({ parent: 'something', component: 'something' });
    expect(Styleguide.uiComponents()).toEqual([]);
  });

  it('shuld not add component if component is null or undefined', () => {
    Styleguide.add({ id: 'some_id', parent: 'something', component: null });
    Styleguide.add({ id: 'some_id', parent: 'something' });
    expect(Styleguide.uiComponents()).toEqual([]);
  });
});

describe('Styleguide valid conditions', () => {
  it('should add and return the components', () => {
    Styleguide.add({
      id: 'some_id',
      parent: 'something',
      component: 'some component',
    });
  });
});
