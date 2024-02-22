import styled from 'styled-components';
import { toPropValue } from '@/utils/styles';

const BadgeWrapper = styled.div<{ backgroundColor: string }>`
  border-radius: 20px;
  height: 20px;
  min-width: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${(props) => {
    return toPropValue('background-color', props.backgroundColor, props.theme);
  }}
`;

//バッジ内のテキスト
const BadgeText = styled.p`
  color: white;
  font-size: 11px;
  user-select: none;
`;

interface BadgeProps {
  /**
   * バッジのテキスト
   */
  content: string;
  /**
   * バッジの色
   */
  backgroundColor: string;
}

/**
 * バッジコンポーネント
 */
const Badge = (props: BadgeProps) => {
  const { content, backgroundColor } = props;
  return (
    <BadgeWrapper backgroundColor={backgroundColor}>
      <BadgeText>{content}</BadgeText>
    </BadgeWrapper>
  );
};

export default Badge;
