import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import TextArea from '@/components/atoms/TextArea';
import Box from '@/components/layout/Box';
import Dropdown from '@/components/molecules/Dropdown';
import InputImages, { FileData } from '@/components/molecules/InputImages';
import { Category, Condition } from '@/types';

export type ProductFormData = {
  image: FileData[];
  title: string;
  description: string;
  category: Category;
  condition: Condition;
  price: string;
};

interface ProductFormProps {
  /**
   * 出品ボタンを押したときのイベントハンドラ
   */
  onProductSave?: (data: ProductFormData) => void;
}

/**
 * 商品投稿フォーム
 */
const ProductForm = (props: ProductFormProps) => {
  //親コンポーネントから受け取った商品登録関数
  const { onProductSave } = props;
  //React Hook Formの初期化
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormData>();

  //フォームの送信処理関数
  const onSubmit = (data: ProductFormData) => {
    onProductSave && onProductSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={3}>
        <Box marginBottom={2}>
          <Text as="label" $variant="mediumLarge" $fontWeight="bold">
            商品の写真
          </Text>
        </Box>
        {/* 商品画像の入力 */}
        <Controller
          control={control}
          name="image"
          rules={{ required: true }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputImages
              images={value ?? []}
              onChange={onChange}
              maximumNumber={1}
              hasError={!!error}
            />
          )}
        />
        {errors?.image && (
          <Text $color="danger" $variant="small" $paddingleft={1}>
            Product image is required
          </Text>
        )}
      </Box>

      <Box marginBottom={3}>
        <Box marginBottom={2}>
          <Text as="label" $variant="mediumLarge" $fontWeight="bold">
            商品情報
          </Text>
        </Box>
        <Box marginBottom={1}>
          <Text as="label" $variant="medium">
            タイトル
          </Text>
          {/* 商品タイトルの入力 */}
          <Input
            type="text"
            placeholder="商品のタイトル"
            $haserror={!!errors.title}
            {...register('title', { required: true })}
          />
          {errors.title && (
            <Text $color="danger" $variant="small" $paddingleft={1}>
              タイトルの入力は必須です
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" $variant="medium">
            概要
          </Text>
          {/* 商品概要の入力 */}
          <Controller
            control={control}
            name="description"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextArea
                onChange={onChange}
                $haserror={!!error}
                placeholder="商品の概要"
              >
                {value}
              </TextArea>
            )}
          />
          {errors.description && (
            <Text $color="danger" $variant="small" $paddingleft={1}>
              概要の入力は必須です
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" $variant="medium">
            カテゴリ
          </Text>
          {/* カテゴリのドロップダウン */}
          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Dropdown
                options={[
                  { value: 'shoes', label: 'シューズ' },
                  { value: 'clothes', label: 'トップス' },
                  { value: 'book', label: '本' },
                ]}
                hasError={!!error}
                placeholder="カテゴリを選択"
                value={value}
                onChange={(v) => onChange(v?.value)}
              />
            )}
          />
          {errors.category && (
            <Text $color="danger" $variant="small" $paddingleft={1}>
              カテゴリの選択は必須です
            </Text>
          )}
        </Box>
        <Box marginBottom={1}>
          <Text as="label" $variant="medium">
            商品の状態
          </Text>
          {/* 商品の状態のドロップダウン */}
          <Controller
            control={control}
            name="condition"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Dropdown
                options={[
                  { value: 'used', label: '中古' },
                  { value: 'new', label: '新品' },
                ]}
                hasError={!!error}
                placeholder="商品の状態を選択"
                value={value ?? 'used'}
                onChange={(v) => onChange(v?.value)}
              />
            )}
          />
          {errors.category && (
            <Text $color="danger" $variant="small" $paddingleft={1}>
              商品の状態の選択は必須です
            </Text>
          )}
        </Box>
        <Box>
          <Text as="label" $variant="medium">
            価格（円）
          </Text>
          {/* 価格の入力 */}
          <Input
            type="number"
            placeholder="100"
            $haserror={!!errors.price}
            {...register('price', { required: true })}
          />
          {errors.price && (
            <Text $color="danger" $variant="small" $paddingleft={1}>
              価格の入力は必須です
            </Text>
          )}
        </Box>
      </Box>
      <Button $width="100%" type="submit">
        出品
      </Button>
    </form>
  );
};

export default ProductForm;
