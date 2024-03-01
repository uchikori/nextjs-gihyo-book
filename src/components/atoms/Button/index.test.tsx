import {
  render,
  screen,
  RenderResult,
  fireEvent,
} from '@testing-library/react';
import Button from '.';
import '@testing-library/jest-dom';

describe('Button', () => {
  let renderResult: RenderResult;
  let handleClick: jest.Mock;

  beforeEach(() => {
    handleClick = jest.fn();
    renderResult = render(
      <Button $variant="primary" onClick={handleClick}>
        Button
      </Button>,
    );
  });

  afterEach(() => {
    renderResult.unmount();
  });

  /****************************************************************
   *ボタン押下時にhandleClickが呼ばれるかどうかのテスト
   ****************************************************************/
  it('ボタンを押した時にonClickが呼ばれる', () => {
    fireEvent.click(screen.getByText('Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
