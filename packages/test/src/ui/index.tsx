import { styled } from "@stitches/react";
export const Box = styled("div", {
  display: "flex",
});

export const Row = styled(Box, { alignItems: "center" });
export const Col = styled(Box, { flexDirection: "column", alignItems: "center" });
export const Image = styled("img");
export const Text = styled("p");
