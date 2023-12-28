export interface IProps {
  type: string;
  default?: any;
  required?: boolean;
}

export interface IConfig {
  id: string;
  parent: string;
  group: string;
  title: string;
  description?: string;
  component: JSX.Element;
  props?: {[key: string]: IProps};
}

export interface IConfigParams {
  id: string;
  parent?: string | null;
  group?: string | null;
  title: string;
  description?: string;
  component: JSX.Element;
  props?: {[key: string]: IProps};
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
  onLeaveHobbes: () => void;
}

export type RootDrawerParamList = {
  Welcome: undefined;
};
