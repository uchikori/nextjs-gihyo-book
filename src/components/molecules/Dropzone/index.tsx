import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { CloudUploadIcon } from '@/components/atoms/IconButton';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

//ドラッグイベントかどうかの判定
const isDragEvent = (value: any): value is React.DragEvent => {
  return !!value.dataTransfer;
};

//inputに何か入力されたらtrue判定
const isInput = (value: EventTarget | null): value is HTMLInputElement => {
  return value !== null;
};

/**
 * イベントから入力されたファイルを取得
 * @params e DragEventかChangeEvent
 * @returns Fileの配列
 */
const getFilesFromEvent = (e: React.DragEvent | React.ChangeEvent): File[] => {
  //ドラッグイベントが発生した場合
  if (isDragEvent(e)) {
    return Array.from(e.dataTransfer.files);
    //インプットにファイルが追加された場合
  } else if (isInput(e.target) && e.target.files) {
    return Array.from(e.target.files);
  }
  //条件に当てはまらない場合は空配列を返す
  return [];
};

//ファイルのContent-type
type FileType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/gif'
  | 'image/webp'
  | 'video/mp4'
  | 'video/quicktime'
  | 'application/pdf';

interface DropzoneProps {
  /**
   * 入力ファイル
   */
  value?: File[];
  /**
   * <input />のname属性
   */
  name?: string;
  /**
   * 許可されるファイルタイプ
   */
  acceptedFileTypes?: FileType[];
  /**
   * 横幅
   */
  width?: number | string;
  /**
   * 縦幅
   */
  height?: number | string;
  /**
   * バリデーションエラーフラグ
   */
  hasError?: boolean;
  /**
   * ファイルが泥プされたときのイベントハンドラ
   */
  onDropFn?: (files: File[]) => void;
  /**
   * ファイルが入力されたときのイベントハンドラ
   */
  onChangeFn?: (files: File[]) => void;
}

type DropzoneRootProps = {
  width: number | string;
  height: number | string;
  hasError?: boolean;
  isFocused?: boolean;
};

//ドロップゾーンの外側の外観
const DropzoneRoot = styled.div<DropzoneRootProps>`
  border: 1px solid
    ${(props) => {
      const { theme, isFocused, hasError } = props;
      if (hasError) {
        return theme.colors.danger;
      } else if (isFocused) {
        return theme.colors.black;
      } else {
        return theme.colors.gray;
      }
    }};
  border-radius: 8px;
  cursor: pointer;
  width: ${(props) => {
    const { width } = props;
    return typeof width === 'number' ? `${width}px` : width;
  }};
  height: ${(props) => {
    const { height } = props;
    return typeof height === 'number' ? `${height}px` : height;
  }};
`;

//ドロップゾーンの中身
const DropzoneContent = styled.div<{
  width: string | number;
  height: string | number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${(props) => {
    const { width } = props;
    return typeof width === 'number' ? `${width}px` : width;
  }};
  height: ${(props) => {
    const { height } = props;
    return typeof height === 'number' ? `${height}px` : height;
  }};
`;

const DropzoneInputFile = styled.input`
  display: none;
`;

/**
 * ドロップゾーン
 * ファイルの入力を受け付ける
 */
const Dropzone = (props: DropzoneProps) => {
  const {
    onDropFn,
    onChangeFn,
    value = [],
    name,
    acceptedFileTypes = [
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/quicktime',
      'application/pdf',
    ],
    width = '100%',
    height = '200px',
    hasError,
  } = props;

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  /**
   * A function that handles the change event of an input element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - the change event object
   * @return {void}
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //フォーカスはしない(ダミーのinputのため)
    setIsFocused(false);

    //value配列に結合
    const files = value.concat(
      //getFilesFromEvent関数からアップロードされたファイル群の配列を取得、
      //そこから条件に一致するファイル軍で新たな配列を作成
      getFilesFromEvent(e).filter((file) => {
        //ファイルタイプをチェック
        return acceptedFileTypes.includes(file.type as FileType);
      }),
    );

    onDropFn && onDropFn(files);
    onChangeFn && onChangeFn(files);
  };

  /**
   * Handles the drop event for the specified HTMLDivElement.
   *
   * @param {React.DragEvent<HTMLDivElement>} e - the drag event
   * @return {void}
   */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(false);

    const files = value.concat(
      getFilesFromEvent(e).filter((file) => {
        return acceptedFileTypes.includes(file.type as FileType);
      }),
    );

    //ファイルのドラッグには制約がないため、ここでチェックしアラートを出す
    if (files.length == 0) {
      return window.alert(
        `次のファイルフォーマットは指定できません${acceptedFileTypes.join(', ')}`,
      );
    }

    onDropFn && onDropFn(files);
    onChangeFn && onChangeFn(files);
  };

  // ドラッグ状態のマウスポインタが範囲内に入っている時
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // ドラッグ状態のマウスポインタが範囲外に消えた時にフォーカスを外す
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(false);
  }, []);

  // ドラッグ状態のマウスポインタが範囲内に来た時にフォーカスを当てる
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(true);
  }, []);

  const handleClick = () => {
    //ダミーのinputをクリックしたことにする
    inputRef.current?.click();
  };

  useEffect(() => {
    if (inputRef.current && value && value.length == 0) {
      inputRef.current.value = '';
    }
  }, [value]);

  return (
    <>
      {/* ドラッグアンドドロップイベントを管理} */}
      <DropzoneRoot
        ref={rootRef}
        isFocused={isFocused}
        hasError={hasError}
        width={width}
        height={height}
        data-testid="dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        onClick={handleClick}
      >
        {/* ダミーインプット */}
        <DropzoneInputFile
          ref={inputRef}
          type="file"
          name={name}
          accept={acceptedFileTypes.join(',')}
          onChange={handleChange}
          multiple
        />
        <DropzoneContent width={width} height={height}>
          <CloudUploadIcon size={24} />
          <span style={{ textAlign: 'center' }}> デバイスからアップロード</span>
        </DropzoneContent>
      </DropzoneRoot>
    </>
  );
};

Dropzone.defaultProps = {
  acceptedFileTypes: [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/quicktime',
    'application/pdf',
  ],
  hasError: false,
};

export default Dropzone;
