import { Component } from 'react';

import Modal from 'components/Modal';

import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL } = this.props.pictureType;
    return (
      <GalleryItem>
        <GalleryImage onClick={this.toggleModal} src={webformatURL} alt="" />
        {this.state.showModal && (
          <Modal
            img={largeImageURL}
            alt=""
            onClose={() => this.toggleModal()}
          />
        )}
      </GalleryItem>
    );
  }
}
