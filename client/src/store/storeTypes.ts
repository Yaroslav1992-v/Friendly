import { Action, AnyAction } from "redux";

export type Dispatch<A extends Action = AnyAction> = <T extends A>(
  action: T
) => T;
