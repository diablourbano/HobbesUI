import { createRef } from 'react';

export const isNavigationReadyRef = createRef();
export const navigationRef = createRef();

export const navigate = (routeName, params) => {
  if (isNavigationReadyRef.current && navigationRef.current) {
    navigationRef.current?.navigate(routeName, params);
  }
};
