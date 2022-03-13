export interface Art {
  id: number;
  img?: any;
  color?: string;
  file?: File;
  title: string;
  date?: string;
  link?: string;
  toUpdate?: boolean;
}

export interface Config {
  textscroll: string;
}