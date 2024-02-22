import styled from 'styled-components';
import Badge from '@/components/atoms/Badge';

const BadgeIconButtonWrapper = styled.span<{ size: number | string }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const BadgeWrapper = styled.div`
  position: absolute;
  top: -7px;
  right: -10px;
`;

type BadgeIconButton = {
  icon: React.ReactNode;
  badgeContent?: number;
  badgeBackgroundColor: string;
  size?: number | string;
};

/**
 * バッジ付アイコンボタン
 */
const BadgeIconButton = (props: BadgeIconButton) => {
  const { icon, badgeContent, badgeBackgroundColor, size = 24 } = props;
  return (
    <BadgeIconButtonWrapper size={size}>
      {icon}
      {badgeContent && (
        <BadgeWrapper data-testid="badge-wrapper">
          <Badge
            backgroundColor={badgeBackgroundColor}
            content={`${badgeContent}`}
          />
        </BadgeWrapper>
      )}
    </BadgeIconButtonWrapper>
  );
};

export default BadgeIconButton;
