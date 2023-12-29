import {DrawerScreenProps} from '@react-navigation/drawer';

export interface IProps {
  type: string;
  default?: any;
  required?: boolean;
}

export interface IConfigParams {
  id: string;
  parent?: string | null;
  group?: string | null;
  title: string;
  description?: string;
  component: (props: any) => JSX.Element;
  props?: {[key: string]: IProps};
}

export interface IConfig extends IConfigParams {
  parent: string;
  group: string;
}

export type Styles = {
  [key: string]: string | number;
};

export type WelcomeProps = {
  logo?: any;
  appName?: string;
  appDescription?: string;
  buttonText?: string;
  styles?: {
    container?: Styles;
    logoContainer?: Styles;
    logo?: Styles;
    isoContainer?: Styles;
    isoText?: Styles;
    isoDesc?: Styles;
    button?: Styles;
    buttonText?: Styles;
  };
};

export interface IUIprops {
  welcome?: WelcomeProps;
  onLeaveHobbes?: () => void;
}

export type RootDrawerParamList = {
  Welcome: undefined;
  [key: string]: undefined;
};

export type TNavProps = DrawerScreenProps<RootDrawerParamList>;

export type TSidebarProps = {
  onLeaveHobbes: () => void;
} & TNavProps;

export type TNavItemsObj = {
  [key: string]: {
    [key: string]: any;
  };
};
