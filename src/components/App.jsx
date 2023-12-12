import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import './styles.css';

const API_KEY = '39935227-75739c8736a388a48177e3f8a';
const BASE_URL = 'https://pixabay.com/api/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      images: [],
      page: 1,
      isLoading: false,
      selectedImage: null,
    };
  }

  handleSearchSubmit = (newQuery) => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1,
    });
    this.fetchImages(newQuery, 1);
  };

  fetchImages = async (query, pageNumber) => {
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${query}&page=${pageNumber}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState((prevState) => ({
        images: [...prevState.images, ...response.data.hits],
      }));
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = () => {
    const { query, page } = this.state;
    const nextPage = page + 1;
    this.fetchImages(query, nextPage);
    this.setState({ page: nextPage });
  };

  openModal = (image) => {
    this.setState({ selectedImage: image });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { query, images, isLoading, selectedImage } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && <Button onClick={this.loadMoreImages} isVisible={images.length >= 12} />}
        {selectedImage && <Modal {...selectedImage} onCloseModal={this.closeModal} />}
      </div>
    );
  }
}

export default App;


