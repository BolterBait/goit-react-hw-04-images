import PropTypes from 'prop-types';

import { LoadMoreBtn, Wrap } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <Wrap>
      <LoadMoreBtn type="button" onClick={onLoadMore}>
        Load more
      </LoadMoreBtn>
    </Wrap>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};
