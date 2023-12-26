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

export type styles = {
  [key: string]: string | number;
};

export interface IUIprops {
  logo?: any;
  appName?: string;
  appDescription?: string;
  buttonText?: string;
  styles?: {
    container?: styles;
    logoContainer?: styles;
    logo?: styles;
    isoContainer?: styles;
    isoText?: styles;
    isoDesc?: styles;
    button?: styles;
    buttonText?: styles;
  };
}
