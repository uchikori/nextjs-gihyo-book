import { useForm } from 'react-hook-form';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import Box from '@/components/layout/Box';

export type SigninFormData = {
  username: string;
  password: string;
};

interface SigninFormProps {
  /**
   * サインインボタンを押したときのイベントハンドラ
   */
  onSignin?: (username: string, password: string) => void;
}

/**
 * サインインフォーム
 */
const SigninForm = (props: SigninFormProps) => {
  const { onSignin } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  //フォームの入力内容(usernameとpassword)を受け取り
  //親コンポーネントから受け取ったonSignin関数を実行する
  const onSubmit = (data: SigninFormData) => {
    const { username, password } = data;

    //親コンポーネントのonSigninを呼び出す(handleSignin)
    onSignin && onSignin(username, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={1}>
        {/* サインインユーザー名の入力 */}
        <Input
          // name="username"
          type="text"
          placeholder="ユーザー名"
          $haserror={!!errors?.username}
          {...register('username', { required: true })}
        />
        {errors?.username && (
          <Text $color="danger" $variant="small" $paddingleft={1}>
            ユーザー名は必須です
          </Text>
        )}
      </Box>
      <Box marginBottom={2}>
        {/* サインインパスワードの入力 */}
        <Input
          // name="password"
          type="password"
          placeholder="パスワード"
          $haserror={!!errors?.password}
          {...register('password', { required: true })}
        />
        {errors?.password && (
          <Text $color="danger" $variant="small" $paddingleft={1}>
            パスワードは必須です
          </Text>
        )}
      </Box>
      <Button $width="100%" type="submit">
        サインイン
      </Button>
    </form>
  );
};

export default SigninForm;
