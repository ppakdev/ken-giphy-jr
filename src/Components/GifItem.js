import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

class GifItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.item);
  }

  render() {
    return (
      <Card onClick={this.handleClick} raised>
        <Image src={this.props.item.images.downsized.url} />
      </Card>
    );
  }
}

GifItem.propTypes = {
  item: PropTypes.shape({
    images: PropTypes.shape({
      downsized: PropTypes.shape({ url: PropTypes.string }),
    }),
  }),
  onClick: PropTypes.func,
};

GifItem.defaultProps = {
  item: {},
  onClick: this.handleClick,
};

export default GifItem;
