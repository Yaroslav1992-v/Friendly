export interface Data {
  [key: string]: string;
}

export interface ValidationConfig {
  [key: string]: {
    [key: string]: {
      message: string;
      value?: number;
    };
  };
}
