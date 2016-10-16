import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class CardComponent extends Component {
  constructor() {
    super();
  }

  render() {
  	const { html_url, avatar_url, name, location, followers } = this.props.card;

  	return (
      <a className="card-wrapper" href={html_url} target="_blank">
        <img className="avatar" src={avatar_url} width="300"/>
        <div className="user-details">
          <span className="name">{name}</span>
          <span className="data location">
            <span>
              Location:
            </span>
            <span>
              {location}
            </span>
          </span>
          <span className="data followers">
            <span>
            Followers:
            </span>
            <span>
              {followers}
            </span>
          </span>
        </div>
      </a>
  	)
  }
}

export default CardComponent;