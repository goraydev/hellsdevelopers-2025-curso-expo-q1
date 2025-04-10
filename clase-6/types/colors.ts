export interface Colors {
  background: string;
  primary: string;
  secondary: string;
  [key: string]: string;
}

export interface GetColorsOptions {
  fallback: string;
  cache: boolean;
  key: string;
}
