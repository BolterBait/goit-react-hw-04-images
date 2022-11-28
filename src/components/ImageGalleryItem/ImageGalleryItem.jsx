import { useState } from 'react';

import Modal from 'components/Modal';

import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ pictureType }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const { webformatURL, largeImageURL } = pictureType;
  return (
    <GalleryItem>
      <GalleryImage onClick={toggleModal} src={webformatURL} alt="" />
      {showModal && <Modal img={largeImageURL} alt="" onClose={toggleModal} />}
    </GalleryItem>
  );
}
