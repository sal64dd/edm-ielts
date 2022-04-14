export interface TopElem{
  text: string;
  heading: string;
  icon: string;
  sub?: string;
  subColor?: 'danger' | 'info' | 'success';
}

export interface CaroselList{
  text: string;
  heading: string;
  icon?: string;
  img?: string;
  cta?: string;
  route?: string[]
}
