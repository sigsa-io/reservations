import React from 'react';
import ReactDOM from 'react-dom';
import getRequests from './helperFunc/getRequests';
import titleStyle from './style/title.css';


class Title extends React.Component {
  constructor () {
    super();
    this.state = {
      restaurantName: '',
    }
  }

  componentDidMount () {
    const restaurantId = window.location.pathname.split('/')[1];
    getRequests.getRestaurantName(restaurantId, (restaurantName) => {
      this.setState({ restaurantName });
    });
  }

  render() {
    return (
      <h2 id={titleStyle.restaurant_title}>{this.state.restaurantName}</h2>
    );
  }
}

ReactDOM.render(
  <Title />,
  document.getElementById('title')
);
