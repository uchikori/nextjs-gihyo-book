import styled from 'styled-components';

/**
 * パンくずリスト
 */
const BreadcrumbItem = styled.li`
  list-style: none;
  display: inline;
  &:not(:first-child) {
    &::before {
      content: '/';
      color: ${(props) => props.theme.colors.gray};
      padding: 0px 8px;
    }
  }
  a {
    color: ${(props) => props.theme.colors.gray};
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default BreadcrumbItem;
