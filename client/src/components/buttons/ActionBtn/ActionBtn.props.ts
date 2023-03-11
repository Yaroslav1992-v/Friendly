export interface ActionBtnProps {
  Icon: JSX.Element;
  action: (() => void) | { from: string; to: string };
}
