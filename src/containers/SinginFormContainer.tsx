import SigninForm from '@/components/organisms/SigninForm';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGlobalSpinnerActionContext } from '@/contexts/GlobalSpinnerContext';

interface SinginFormContainerProps {
  /**
   * サインインした時に呼ばれるイベントハンドラ
   */
  onSignin: (err?: Error) => void;
}

/**
 * サインインフォームコンテナ
 */
const SigninFormContainer = (props: SinginFormContainerProps) => {
  const { onSignin } = props;
  //認証コンテキストからサインイン関数を取得(signInInternal)
  const { signin } = useAuthContext();

  const setGlobalSpinner = useGlobalSpinnerActionContext();

  //サインインボタンを押されたときのイベントハンドラ
  const handleSignin = async (username: string, password: string) => {
    try {
      //fetchの間はグローバルスピナーを表示
      setGlobalSpinner(true);
      //AuthContextにセットされているsignInIntervalを呼び出す
      await signin(username, password);
      //親コンポーネントのonSigninを呼び出す
      onSignin && onSignin();
    } catch (err: unknown) {
      if (err instanceof Error) {
        //エラーの内容を表示
        window.alert(err.message);
        onSignin && onSignin(err);
      }
    } finally {
      setGlobalSpinner(false);
    }
  };
  return <SigninForm onSignin={handleSignin} />;
};

export default SigninFormContainer;
