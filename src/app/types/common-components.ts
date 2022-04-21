export interface TopElem{
  text: string;
  heading: string;
  icon: string;
  sub?: string;
  subColor?: 'danger' | 'info' | 'success';
  click?: () => void
}

export interface CaroselList{
  text: string;
  heading: string;
  icon?: string;
  img?: string;
  cta?: string;
  route?: string[]
}

export interface MultiStepElem {
  title: string;
  formContentSelector: string;
}
