type Cancel = () => void;
type LinkProps = {
  to: string;
};
export interface CancelBtnProps {
  props: Cancel | LinkProps;
}
