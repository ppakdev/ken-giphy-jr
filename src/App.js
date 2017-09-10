import React, { Component } from 'react';
import axios from 'axios';
import { Container, Image, List, Modal, Button, Header, Icon } from 'semantic-ui-react';

import GifItem from './Components/GifItem';
import SearchForm from './Components/SearchForm';

import logo from './griffey.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: '',
      searchTerms: [],
      results: [],
      showModal: false,
      modalImage: {},
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.fetchTrending();
  }

  openModal(image) {
    this.setState({
      showModal: true,
      modalImage: image,
    });
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleSearch(value) {
    this.setState((prevState) => {
      // only add search term to list if not previously added
      if (prevState.searchTerms.includes(value)) {
        return {
          currentSearch: value,
        };
      }
      return {
        currentSearch: value,
        searchTerms: [...prevState.searchTerms, value],
      };
    }, () => {
      // make sure state is set then get results of current search
      this.fetchGifs(this.state.currentSearch);
    });
  }

  fetchGifs(term) {
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=bbb0c36bee40414ba31a3eb589accc4c&q=${term}`)
      .then((res) => {
        const results = res.data.data;
        this.setState({ results });
      });
  }

  fetchTrending() {
    axios.get('http://api.giphy.com/v1/gifs/trending?api_key=bbb0c36bee40414ba31a3eb589accc4c')
      .then((res) => {
        const results = res.data.data;
        this.setState({ results, currentSearch: '' });
      });
  }

  render() {
    // current search results (default trending)
    const results = this.state.results.map((image) => {
      return <GifItem key={`gif-item-${image.id}`} onClick={() => { this.openModal(image); }} item={image} />;
    });

    // list of previously searched items
    const searched = this.state.searchTerms.map((term) => {
      return (
        <List.Item>
          <List.Content>
            <List.Header as="a" onClick={() => { this.handleSearch(term); }}>{term}</List.Header>
          </List.Content>
        </List.Item>
      );
    });

    // modal for gif information
    let modal = <div />;

    if (Object.keys(this.state.modalImage).length) {
      const image = this.state.modalImage;

      modal = (
        <Modal
          open={this.state.showModal}
          onClose={this.handleClose}
          size="small"
        >
          <Header icon="trophy" content={image.slug} />
          <Modal.Content image>
            <Image wrapped size="medium" src={image.images.downsized.url} />
            <Modal.Description>
              <Header>Embed</Header>
              <a href={image.embed_url}>{image.embed_url}</a>
              <Header>Source</Header>
              <a href={image.source_post_url}>{image.source_post_url}</a>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" onClick={this.handleClose} inverted>
              <Icon name="checkmark" /> Got it
            </Button>
          </Modal.Actions>
        </Modal>
      );
    }

    return (
      <div className="App">
        <div className="App-header">
          <div role="presentation" onClick={() => this.fetchTrending()} >
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <h1>Welcome to Ken Giphy Jr.</h1>
        </div>
        <div className="search-form">
          <SearchForm onSubmit={this.handleSearch} searchTerm={this.state.currentSearch} />
          {searched &&
            <Container>
              <List horizontal divided className="search-list-container">
                {searched}
              </List>
            </Container>
          }
        </div>
        <div className="results-container">
          {results}
          {modal}
        </div>
      </div>
    );
  }
}

export default App;
