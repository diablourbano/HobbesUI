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
  component: (props: any) => JSX.Element;
}

export interface IConfig extends IConfigParams {
  parent: string;
  group: string;
}

export type Styles = {
  [key: string]: string | number;
};

export type WelcomeProps = {
  appDescription?: string;
  styles?: {
    container?: Styles;
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

export type CollapsibleProps = {
  collapsibleKey: string;
  label: string;
  backgroundColor?: string;
  expandedHeight: number;
  bottomDividerColor?: string;
  topDividerColor?: string;
  isLast?: boolean;
  isFirst?: boolean;
  isSearching?: boolean;
  styles?: {
    container?: object;
    collapsibleButton?: object;
    collapsibleText?: object;
    childrenContainer?: object;
  };
  children: JSX.Element[] | JSX.Element;
};

export type NavItemsListProps = {
  isSearching: boolean;
  navItems: TNavItemsObj;
  selectedItem: string;
  parent?: string;
  onSelectItem: (itemId: string) => void;
};
