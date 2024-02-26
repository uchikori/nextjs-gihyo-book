import ShapeImage from '@/components/atoms/ShapeImage';
import Text from '@/components/atoms/Text';
import Box from '@/components/layout/Box';
import Flex from '@/components/layout/Flex';

export interface UserProfileProps {
  /**
   * バリアント
   */
  variant?: 'normal' | 'small';
  /**
   * ユーザー名
   */
  userName: string;
  /**
   * サムネイル
   */
  profileImageUrl: string;
  /**
   * ユーザーが所有する商品数
   */
  numberOfProducts: number;
  /**
   * ユーザーの説明
   */
  description: string;
}

/**
 * ユーザーのプロファイル
 */
const UserProfile = (props: UserProfileProps) => {
  const {
    variant = 'normal',
    userName,
    profileImageUrl,
    numberOfProducts,
    description,
  } = props;

  const profileImageSize = variant === 'small' ? '100px' : '120px';
  const profileImageProp = variant === 'small' ? 100 : 120;

  return (
    <Flex>
      <Box minWidth={profileImageSize}>
        {/* ユーザー画像 */}
        <ShapeImage
          shape="circle"
          src={profileImageUrl}
          alt={userName}
          quality="85"
          width={profileImageProp}
          height={profileImageProp}
        />
      </Box>
      <Box padding={1}>
        <Flex
          height="100%"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box>
            {/* ユーザー名 */}
            <Text
              as="p"
              $fontWeight={'bold'}
              $variant="mediumLarge"
              $margintop={0}
              $marginbottom={1}
            >
              {userName}
            </Text>
            {/* 商品出品数 */}
            <Text $marginbottom={1} $margintop={0} as="p">
              {numberOfProducts} 店出品済み
            </Text>
            {/* ユーザー概要 */}
            {variant === 'normal' && (
              <Text as="p" $margin={0}>
                {description}
              </Text>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
export default UserProfile;
