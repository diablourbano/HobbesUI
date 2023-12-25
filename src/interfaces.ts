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
