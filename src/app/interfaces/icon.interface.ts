export interface iIconV1{
  type: 'fa' | 'ion' | 'svg' | 'img',
  src: string
};

export interface iHeaderV1{
  show?: boolean,    // true by default
  back?: boolean,   // true by default
  user?: boolean,   // true by default
  test?: boolean,   // false by default

  heading?: string,
  subheading?: string,
  backlink?: string,

  icon?: iIconV1,
};

export interface iMenu1 {
  text: string;
  route?: any;
  click?: any;
  dropdown: iMenu1[] | null;
  icon?:  iIconV1
};



