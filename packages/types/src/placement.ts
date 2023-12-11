export type Alignment = "start" | "end";
export type Side =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";
export type AlignedPlacement = `${Side}-${Alignment}`;
export type Placement = Side | AlignedPlacement | "center";
