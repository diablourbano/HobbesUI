import { Hobbes } from '../hobbes';

describe('Hobbes invalid conditions', () => {
  it('should not add view component if config is empty', () => {
    Hobbes.add({});
    expect(Hobbes.uiComponents()).toEqual([]);
  });

  it('shuld not add component if config is null', () => {
    Hobbes.add(null);
    expect(Hobbes.uiComponents()).toEqual([]);
  });

  it('shuld not add component if config is undefined', () => {
    Hobbes.add();
    expect(Hobbes.uiComponents()).toEqual([]);
  });

  it('shuld not add component if id is null', () => {
    Hobbes.add({ id: null });
    Hobbes.add({ parent: 'something', component: 'something' });
    expect(Hobbes.uiComponents()).toEqual([]);
  });

  it('shuld not add component if component is null or undefined', () => {
    Hobbes.add({ id: 'some_id', parent: 'something', component: null });
    Hobbes.add({ id: 'some_id', parent: 'something' });
    expect(Hobbes.uiComponents()).toEqual([]);
  });
});

describe('Hobbes valid conditions', () => {
  it('should add and return the components', () => {
    Hobbes.add({
      id: 'some_id',
      parent: 'something',
      component: 'some component',
    });
  });
});
