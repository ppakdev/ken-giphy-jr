import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // update the input text when previously searched term is clicked
    if (this.state.searchTerm !== nextProps.searchTerm) {
      this.setState({ searchTerm: nextProps.searchTerm });
    }
  }

  handleChange(e, { value }) {
    this.setState({ searchTerm: value });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.searchTerm);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          fluid
          placeholder="Search"
          name="search"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          size="huge"
        />
      </Form>
    );
  }
}

SearchForm.propTypes = {
  searchTerm: PropTypes.string,
  onSubmit: PropTypes.func,
};

SearchForm.defaultProps = {
  searchTerm: '',
  onSubmit: this.handleClick,
};

export default SearchForm;
