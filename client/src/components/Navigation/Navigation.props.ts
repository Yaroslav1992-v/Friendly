export interface NavigationProps {
  navName: string;
  Icon: JSX.Element;
  active: boolean;
  to: string;
  count?: number;
}
export interface TopNavigationProps {
  firstElement?: JSX.Element;
  title: string;
  secondElement?: JSX.Element;
}
