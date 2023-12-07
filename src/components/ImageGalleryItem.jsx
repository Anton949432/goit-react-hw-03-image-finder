import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onOpenModal }) => {
    return (
        <li className="gallery-item" onClick={() => onOpenModal(image)}>
            <img src={image.webformatURL} alt={image.tags} />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }).isRequired,
    onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

