export type Alignment = "start" | "end";
export type Side =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "left-start" //TODO:DELETE,use AlignedPlacement
  | "left-end" //TODO:DELETE,use AlignedPlacement
  | "right-start" //TODO:DELETE,use AlignedPlacement
  | "right-end";//TODO:DELETE,use AlignedPlacement
export type AlignedPlacement = `${Side}-${Alignment}`;
export type Placement = Side | AlignedPlacement | "center";
