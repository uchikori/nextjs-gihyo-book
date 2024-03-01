import { afterEach } from 'node:test';
import {
  render,
  screen,
  fireEvent,
  RenderResult,
  act,
} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import SigninForm from '.';
import { theme } from '@/themes';

describe('SinginForm', () => {
  let renderResult: RenderResult;
  let handleSiginin: jest.Mock;

  beforeEach(() => {
    handleSiginin = jest.fn();
    renderResult = render(
      <ThemeProvider theme={theme}>
        <SigninForm onSignin={handleSiginin} />
      </ThemeProvider>,
    );
  });

  afterEach(() => {
    renderResult.unmount();
  });

  /****************************************************************
   *ユーザー名とパスワードが入力されたら、onSigninが呼ばれるかのテスト
   ****************************************************************/
  it('ユーザー名とパスワード入力後、onSigninが呼ばれる', async () => {
    // DOMが更新される事を保証、React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
      //ユーザー名を入力
      const inputUsernameNode = screen.getByPlaceholderText(
        /ユーザー名/,
      ) as HTMLInputElement;
      fireEvent.change(inputUsernameNode, { target: { value: 'user' } });
      //パスワードを入力
      const inputPasswordNode = screen.getByPlaceholderText(
        /パスワード/,
      ) as HTMLInputElement;
      fireEvent.change(inputPasswordNode, { target: { value: 'password' } });
      //サインインボタンをクリック
      fireEvent.click(screen.getByText('サインイン'));
    });
    // handleSigninが呼ばれた事を確認
    expect(handleSiginin).toHaveBeenCalledTimes(1);
  });

  /****************************************************************
   *ユーザー名入力だけでは、バリデーションエラーでonSigninが呼ばれない
   ****************************************************************/
  it('ユーザー名入力だけでは、バリデーションエラーでonSigninが呼ばれない', async () => {
    // DOMが更新される事を保証、React Hook FormのhandleSubmitが呼ばれるまで待つ
    await act(async () => {
      //ユーザー名を入力
      const inputUsernameNode = screen.getByPlaceholderText(
        /ユーザー名/,
      ) as HTMLInputElement;
      fireEvent.change(inputUsernameNode, { target: { value: 'user' } });
      //サインインボタンをクリック
      fireEvent.click(screen.getByText('サインイン'));
    });
    expect(handleSiginin).toHaveBeenCalledTimes(0);
  });
});
