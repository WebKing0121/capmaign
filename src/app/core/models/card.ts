
export class CardSubButton {
  label: string;
  icon: string;
  click: () => void;
  hide?: boolean;
  color?: string;
  disabled?: boolean;
}

export class CardButton {
  label: string;
  icon: string;
  click: () => void;
  hide?: boolean;
  color?: string;
  disabled?: boolean;
  child?: CardSubButton[];
}
