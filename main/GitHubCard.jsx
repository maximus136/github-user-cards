import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import CardComponent from './CardComponent.jsx';
import './styles.scss';

class GitHubCard extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      errCode: ''
    };
  }

  _getUserDetails = (e) => {
    e.preventDefault();

    const username = this.refs.searchBar.value;
    const xhr = new XMLHttpRequest();
    const { cards } = this.state;

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
       cards.push(JSON.parse(xhr.responseText));

       this.setState({
        cards: cards
       });
      } else if(xhr.readyState == 4 && xhr.status == 403) {
        this.setState({
          errCode: "API Requests Limit Exceeded!"
        })
      }
    };

    xhr.open("GET", `https://api.github.com/users/${username}`, true);
    xhr.send();
  }

  _removeCard = (e) => {
    e.preventDefault();

    const { cards } = this.state;
    const cardIndex = e.target.getAttribute('data-card-index');

    cards.splice(cardIndex, 1);

    this.setState({
      cards: cards
    });
  }

  _sortCards = (e) => {
    e.preventDefault();

    Array.prototype.forEach.call(e.target.parentNode.children, function(child){
      child.classList.remove('selected');
    });

    e.target.classList.add('selected');

    const { cards } = this.state;
    const sorter = e.target.getAttribute('data-sort');

    if(cards.length < 2) {
      return false;
    }

    switch(sorter) {
      case 'name':
        cards.sort((first, second) => {
          return (first.name > second.name);
        });

        break;
      case 'location':
        cards.sort((first, second) => {
          return (first.location > second.location);
        });
        break;
      case 'followers':
        cards.sort((first, second) => {
          return (first.followers > second.followers);
        });
        break;
    }

    this.setState({
      cards: cards
    });
  }

  render() {
    const { cards,errCode } = this.state;
    
    return(
      <div className="git-card-wrapper">
        <div className="search-area">
            
          <form className="search-bar" onSubmit={this._getUserDetails} action="">
            <div className="search-bar">
              <input className="text-input" type="text" ref="searchBar" name="search" placeholder="GitHub Login"/>
              <input type="submit" value="Add" className="button"/>
              {errCode && <span className="error">{errCode}</span>}
            </div>
          </form>

          <div className="sort">
            <span>Sort by:</span>
            <div>
              <span className="sorter" onClick={this._sortCards} data-sort="name">Name</span>
              <span className="sorter" onClick={this._sortCards} data-sort="location">Location</span>
              <span className="sorter" onClick={this._sortCards} data-sort="followers">Followers</span>
            </div>
          </div>

        </div>
        <div className="user-cards">
          {
            cards && cards.map((card, index) => {
              return (
                <div key={index}>
                  <a className="close-btn" onClick={this._removeCard} data-card-index={index}>&times;</a>
                  <CardComponent card={card}/>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<GitHubCard />, document.getElementById("react"));