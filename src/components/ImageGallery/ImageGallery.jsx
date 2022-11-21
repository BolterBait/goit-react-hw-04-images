import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ pictureType }) => {
  return (
    <ImageGalleryList>
      {pictureType.map(pictureType => (
        <ImageGalleryItem key={pictureType.id} pictureType={pictureType} />
      ))}
    </ImageGalleryList>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  pictureType: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      pictureType: PropTypes.objectOf(
        PropTypes.shape({
          webformatURL: PropTypes.string.isRequired,
          largeImageURL: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};
