import * as React from 'react';
import styled, { css } from 'styled-components';

const StyledSpinner = styled.svg<{ size: number; isautocentering: boolean }>`
  animation: rotate 2s linear infinite;
  ${(props) => {
    console.log(props);

    const { isautocentering, size } = props;
    return isautocentering
      ? css`
          margin: -${size / 2}px 0 0 -${size / 2}px;
        `
      : ``;
  }}
  width:${(props) => {
    const { size } = props;
    return size;
  }}px;
  height: ${(props) => {
    const { size } = props;
    return size;
  }}px;

  &.path {
    stroke: #000000;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

type SpinnerProps = {
  size?: number;
  strokeWidth?: number;
  isautocentering?: boolean;
};

/**
 * スピナー
 */
const Spinner = (props: SpinnerProps) => {
  const { size = 50, strokeWidth = 4, isautocentering = false } = props;
  return (
    <StyledSpinner
      size={size}
      isautocentering={isautocentering}
      viewBox={`0 0 ${size} ${size}`}
      className="path"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth / 2}
        fill="none"
        strokeWidth={strokeWidth}
      />
    </StyledSpinner>
  );
};

export default Spinner;
