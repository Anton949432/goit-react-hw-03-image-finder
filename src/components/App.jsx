import React, { useState } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import './styles.css';

const API_KEY = '39935227-75739c8736a388a48177e3f8a';
const BASE_URL = 'https://pixabay.com/api/';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    fetchImages(newQuery, 1);
  };

  const fetchImages = async (query, pageNumber) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${query}&page=${pageNumber}&image_type=photo&orientation=horizontal&per_page=12`
      );
      setImages((prevImages) => [...prevImages, ...response.data.hits]);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreImages = () => {
    const nextPage = page + 1;
    fetchImages(query, nextPage);
    setPage(nextPage);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={loadMoreImages} isVisible={images.length >= 12} />}
      {selectedImage && <Modal {...selectedImage} onCloseModal={closeModal} />}
    </div>
  );
};

export default App;

