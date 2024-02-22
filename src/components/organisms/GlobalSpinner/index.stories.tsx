import { Meta } from '@storybook/react';
import GlobalSpinner from '.';
import Button from '@/components/atoms/Button';
import GlobalSpinnerContextProvider, {
  useGlobalSpinnerActionContext,
} from '@/contexts/GlobalSpinnerContext';

const meta = {
  title: 'Organisms/GlobalSpinner',
  component: GlobalSpinner,
} satisfies Meta<typeof GlobalSpinner>;

export default meta;

export const WithContextProvider = () => {
  const ChildComponent = () => {
    //表示状態を更新するset関数を取得
    const setGlobalSpinner = useGlobalSpinnerActionContext();
    console.log(setGlobalSpinner);

    const handleClick = () => {
      setGlobalSpinner(true);
      setTimeout(() => {
        setGlobalSpinner(false);
      }, 3000);
    };

    return (
      <>
        <GlobalSpinner />
        <Button onClick={handleClick}>クリック</Button>
      </>
    );
  };

  return (
    <GlobalSpinnerContextProvider>
      <ChildComponent />
    </GlobalSpinnerContextProvider>
  );
};
