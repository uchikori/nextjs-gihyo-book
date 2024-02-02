import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 最小行数
   */
  minRows: number;
  /**
   * 最大行数
   */
  maxRows: number;
  /**
   * バリデーションエラーフラグ
   */
  $haserror: boolean;
}

const StyledTextArea = styled.textarea<{ $haserror?: boolean }>`
  color: ${(props) => {
    const { theme } = props;
    return theme.colors.text;
  }};
  border: 1px solid
    ${(props) => {
      const { theme, $haserror } = props;
      if ($haserror) {
        return theme.colors.danger;
      } else {
        return theme.colors.border;
      }
    }};
  border-radius: 5px;
  box-sizing: border-box;
  outline: none;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  padding: 9px 12px 10px 12px;
  resize: none;
  overflow: auto;
  height: auto;

  &:placeholder {
    color: ${(props) => {
      const { theme } = props;
      return theme.colors.text;
    }};
  }
`;

/**
 * テキストエリア
 */
const Textarea = (props: TextAreaProps) => {
  const {
    rows = 5,
    minRows = 5,
    maxRows = 10,
    children,
    $haserror,
    onChange,
    ...rest
  } = props;

  //rowsとminRowsの小さい方を初期値にセット
  const [textareaRows, setTextareaRows] = useState(Math.min(rows, minRows));

  console.assert(
    !(rows < minRows),
    'TextArea: rows should be greater than minRows.',
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const textareaLineHeight = 24;
      const previousRows = e.target.rows;

      console.log(e.target.scrollHeight);

      e.target.rows = minRows; //行数のリセット

      //テキスト全体を表示するのに必要な行数
      const currentRows = Math.floor(
        //テキストエリア全体の高さを行の高さで割る
        e.target.scrollHeight / textareaLineHeight,
      );
      console.log(currentRows);

      //現在の行数が前の行数と同じなら
      if (currentRows === previousRows) {
        e.target.rows = currentRows;
      }

      //現在の行数が最大行数を超えたら
      if (currentRows >= maxRows) {
        e.target.rows = maxRows;
        e.target.scrollTop = e.target.scrollHeight;
      }

      setTextareaRows(currentRows < maxRows ? currentRows : maxRows);
      onChange && onChange(e);
    },
    [onChange, minRows, maxRows],
  );

  return (
    <StyledTextArea
      $haserror={$haserror}
      onChange={handleChange}
      aria-label={rest.placeholder}
      rows={textareaRows}
      {...rest}
    >
      {children}
    </StyledTextArea>
  );
};

Textarea.defaultProps = {
  rows: 5,
  minRows: 5,
  maxRows: 10,
};

export default Textarea;
