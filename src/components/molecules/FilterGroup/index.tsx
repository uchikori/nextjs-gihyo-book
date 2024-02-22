import React, { useCallback, useEffect, useState } from 'react';
import Text from '@/components/atoms/Text';
import Box from '@/components/layout/Box';
import CheckBox from '@/components/molecules/CheckBox';

type Item = {
  label: string;
  name: string;
};

export type FilterGroupProps = {
  title: string;
  items: Item[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
};

/**
 * フィルターグループ
 */
const FilterGroup = (props: FilterGroupProps) => {
  const { title, items, value = [], defaultValue = [], onChange } = props;
  console.log(props);

  const [selected, setSelected] = useState(value ?? defaultValue);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.name;

      console.log('チェックされたよ');

      //新たな選択配列を作成
      const newSelected = e.target.checked
        ? //チェックをONにしたら選択された値を配列に追加
          [...selected, value]
        : //チェックをOFFにしたら値を配列から削除
          selected.filter((v) => v !== value);

      //selected配列を生成
      setSelected(newSelected);

      //onChangeを呼び出す
      onChange && onChange(newSelected);
    },
    [onChange, selected],
  );

  return (
    <>
      <Text $fontWeight="bold" $variant="mediumLarge">
        {title}
      </Text>
      <Box marginTop="2">
        {items.map(({ label, name }, index) => {
          return (
            <Box key={index} marginTop={index === 0 ? 0 : '4px'}>
              <CheckBox
                name={name}
                label={label}
                onChange={handleChange}
                checked={!!selected.find((e) => e === name)}
              />
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default FilterGroup;
