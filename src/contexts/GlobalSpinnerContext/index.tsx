import React, { useState, useContext, createContext } from 'react';

const GlobalSpinnerContext = createContext<boolean>(false);
const GlobalSpinnerActionsContext = createContext<
  //React.DispatchはReactが提供する型で、通常は状態の更新関数を表す
  //React.SetStateActionは、状態を更新するためのアクション（行動）を表す型(この場合はboolean型を持つ状態を更新するアクション)
  React.Dispatch<React.SetStateAction<boolean>>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
>(() => {});

//グローバルスピナーの表示・非表示
export const useGlobalSpinnerContext = (): boolean => {
  //現在のGlobalSpinnerContextの状態を返す(trueかfalse)
  return useContext<boolean>(GlobalSpinnerContext);
};

//グローバルスピナーの表示・非表示のアクション
export const useGlobalSpinnerActionContext = (): React.Dispatch<
  React.SetStateAction<boolean>
> => {
  //現在のスピナーの表示状態を更新するための関数を返す
  return useContext<React.Dispatch<React.SetStateAction<boolean>>>(
    GlobalSpinnerActionsContext,
  );
};

interface GlobalSpinnerContextProveiderProps {
  children?: React.ReactNode;
}

/**
 * グローバルスピナーコンテキストプロバイダー
 */
const GlobalSpinnerContextProvider = (
  props: GlobalSpinnerContextProveiderProps,
) => {
  const { children } = props;

  const [isGlobalSpinnerOn, setIsGlobalSpinner] = useState(false);

  return (
    // 表示状態をGlobalSPinnerContextに渡す
    //=> その値がGlobalSpinnerコンポーネントのisGlobalSpinnerOnに渡される
    <GlobalSpinnerContext.Provider value={isGlobalSpinnerOn}>
      {/* 表示状態を更新するための関数をGlobalSpinnerActionsContextに渡す */}
      {/* =>その値がChildComponentのsetGlobalSpinnerに渡される */}
      <GlobalSpinnerActionsContext.Provider value={setIsGlobalSpinner}>
        {children}
      </GlobalSpinnerActionsContext.Provider>
    </GlobalSpinnerContext.Provider>
  );
};

export default GlobalSpinnerContextProvider;
