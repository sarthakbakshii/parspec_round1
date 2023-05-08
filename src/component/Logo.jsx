import React from "react";
import { image } from "../constants";

export const Logo = () => {
  const { LOGO_BASE, LOGO_BASE1X, LOGO_BASE2X } = image;
  return (
    <img
      class="mt-120"
      alt="Google"
      height="92"
      src={LOGO_BASE}
      srcSet={`${LOGO_BASE1X} 1x, ${LOGO_BASE2X} 2x`}
      width="272"
    />
  );
};
