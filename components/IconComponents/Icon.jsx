import React, { HTMLProps, Ref } from "react";
import styled from "styled-components";

export default function Icon({ _ref, ...rest }) {
  return <IconWrapper type="button" {...rest} {...(_ref && { ref: _ref })} />;
}

const IconWrapper = styled.button`
  border: none;
  background-color: transparent;
  width: 4rem;
`;
