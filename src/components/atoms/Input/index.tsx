import styled, { css } from 'styled-components';

const Input = styled.input<{ $haserror?: boolean; $hasborder?: boolean }>`
  color: ${(props) => {
    const { theme } = props;
    return theme.colors.text;
  }};
  ${(props) => {
    const { theme, $hasborder, $haserror } = props;
    if ($hasborder) {
      return css`
        border: 1px solid
          ${$haserror ? theme.colors.danger : theme.colors.border};
        border-radius: 5px;
      `;
    } else {
      return css`
        border: none;
      `;
    }
  }};
  padding: 11px 12px 12px 9px;
  box-sizing: border-box;
  outline: none;
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 19px;
  &::placeholder {
    color: ${(props) => {
      const { theme } = props;
      return theme.colors.placeholder;
    }};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

Input.defaultProps = {
  $hasborder: true,
  $haserror: false,
};

export default Input;
