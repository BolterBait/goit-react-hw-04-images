import { InfinitySpin } from 'react-loader-spinner';

import { Wrap } from './Loader.styled';

export const Loader = () => {
  return (
    <Wrap>
      <InfinitySpin width="200" color="#4fa94d" />
    </Wrap>
  );
};
