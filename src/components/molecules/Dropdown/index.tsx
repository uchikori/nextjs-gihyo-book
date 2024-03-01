import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Text from '@/components/atoms/Text';
import Flex from '@/components/layout/Flex';

const DropdownRoot = styled.div`
  position: relative;
  height: 38px;
`;

//ドロップダウン外観
const DropdownControl = styled.div<{ hasError?: boolean }>`
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  border: ${(props) => {
    const { theme, hasError } = props;
    return hasError
      ? `1px solid ${theme.colors.danger}`
      : `1px solid ${theme.colors.gray}`;
  }};
  border-radius: 5px;
  box-sizing: border-box;
  cursor: default;
  outline: none;
  padding: 8px 52px 8px 12px;
`;

//ドロップダウンの値
const DropdownValue = styled.div`
  color: ${(props) => props.theme.colors.text};
`;

//ドロップダウンプレースホルダー
const DropdownPlaceholder = styled.div`
  color: #757575;
  font-size: ${(props) => props.theme.fontSize['small']};
  min-height: 20px;
  line-height: 20px;
`;

//ドロップダウンの矢印の外観
const DropdownArrow = styled.div<{ handleopen?: boolean }>`
  border-color: ${(props) => {
    const { handleopen } = props;

    return handleopen
      ? 'transparent transparent #222222;'
      : '#222222 transparent transparent';
  }};
  border-width: ${(props) => {
    const { handleopen } = props;
    return handleopen ? '0 5px 5px' : '5px 5px 0;';
  }};
  border-style:solid;
  content:'';
  display:block;
  height:0;
  margin-top;-ceil(2.5);
  position:absolute;
  right:10px;
  top:16px;
  width:0;
`;

//ドロップダウンメニュー
const DropdownMenu = styled.div`
  background-color: #ffffff;
  border: ${({ theme }) => theme.colors.border};
  box-shadow:
    0px 5px 5px -3px rgb(0 0 0 / 20%),
    0px 8px 10px 1px rgb(0 0 0 / 10%),
    0px 3px 14px 2px rgb(0 0 0 / 12%);
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: -1px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1000;
`;

//ドロップダウン選択肢
const DropdownOption = styled.div`
  padding: 8px 12px 8px 12px;
  &:hover {
    background-color: #f9f9f9;
  }
`;

interface DropdownItemProps {
  item: DropdownItem;
}
export interface DropdownItem {
  value: string | number | null;
  label?: string;
}

const DropdownItem = (props: DropdownItemProps) => {
  const { item } = props;

  return (
    <Flex alignItems="center">
      <Text $margin={0} $variant="small">
        {item.label ?? item.value}
      </Text>
    </Flex>
  );
};

interface DropdownProps {
  /**
   * ドロップダウンの選択肢
   */
  options: DropdownItem[];
  /**
   * ドロップダウンの値
   */
  value?: string | number;
  /**
   * <input>のname属性
   */
  name?: string;
  /**
   * プレースホルダー
   */
  placeholder?: string;
  /**
   * バリデーションエラーフラグ
   */
  hasError?: boolean;
  /**
   * 値が変化した時のイベントハンドラ
   */
  onChange?: (selected?: DropdownItem) => void;
}

/**
 * ドロップダウン
 */
const Dropdown = (props: DropdownProps) => {
  const { onChange, name, value, options, hasError } = props;
  const initialItem = options.find((item) => item.value === value);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialItem);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDocumentClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current) {
        //ドロップダウン内の全ての要素を取得
        const elems = dropdownRef.current.querySelectorAll('*');

        for (let i = 0; i < elems.length; i++) {
          //クリックされた要素とドロップダウン内の要素が一致する場合、
          //つまりドロップダウン内の要素がクリックされた場合
          if (elems[i] == e.target) {
            //何もしない
            return;
          }
        }
      }
      //ドロップダウンを閉じる
      setIsOpen(false);
    },
    [dropdownRef],
  );

  //ドロップダウンの開閉
  const handleMouseDown = (e: React.SyntheticEvent) => {
    setIsOpen((prev) => !prev);
    e.stopPropagation();
  };

  //選択されたoptionの内容をセット
  const handleSelectValue = (
    e: React.FormEvent<HTMLDivElement>,
    item: DropdownItem,
  ) => {
    e.stopPropagation();

    setSelectedItem(item);
    setIsOpen(false);
    onChange && onChange(item);
  };

  useEffect(() => {
    //画面外のクリックとタッチイベントを設定
    document.addEventListener('click', handleDocumentClick, false);
    document.addEventListener('touchend', handleDocumentClick, false);

    return function cleanup() {
      document.removeEventListener('click', handleDocumentClick, false);
      document.removeEventListener('touchend', handleDocumentClick, false);
    };
    // 最初だけ呼び出す
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DropdownRoot ref={dropdownRef}>
      <DropdownControl
        hasError={hasError}
        onMouseDown={handleMouseDown}
        onTouchEnd={handleMouseDown}
        data-testid="dropdown-control"
      >
        {selectedItem && (
          <DropdownValue>
            <DropdownItem item={selectedItem} />
          </DropdownValue>
        )}

        {/* 何も選択されていないときはプレースホルダーを表示 */}
        {!selectedItem && (
          <DropdownPlaceholder>{props?.placeholder}</DropdownPlaceholder>
        )}

        {/* ダミーインプット */}
        <input
          type="hidden"
          name={name}
          value={selectedItem?.value ?? ''}
          onChange={() => onChange && onChange(selectedItem)}
        />

        <DropdownArrow handleopen={isOpen} />
      </DropdownControl>

      {/* ドロップダウンを表示 */}
      {isOpen && (
        <DropdownMenu>
          {props.options.map((item, index) => {
            return (
              <DropdownOption
                key={index}
                onMouseDown={(e) => handleSelectValue(e, item)}
                onClick={(e) => handleSelectValue(e, item)}
                data-testid="dropdown-option"
              >
                <DropdownItem item={item} />
              </DropdownOption>
            );
          })}
        </DropdownMenu>
      )}
    </DropdownRoot>
  );
};
export default Dropdown;
