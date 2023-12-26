import {createContext} from 'react';
import {IUIprops} from '../interfaces';

export const UIPropsContext = createContext<IUIprops | {}>({});
