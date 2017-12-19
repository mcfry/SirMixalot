import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import Header from '../../components/Header/Header';
import s from '../../css_modules/drink_details.css';

class DrinkMixDetailContainer extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.getSupercalifragilisticexpialidociousText = this.getSupercalifragilisticexpialidociousText.bind(this);
  }

  handleLogoClick() {
    this.props.dispatch(Actions.fetchDrinkMixes());
  }

  getSupercalifragilisticexpialidociousText() {
    let number1to10 = Math.floor((Math.random() * 10 / 2));

    const arrayOfWow = [
      'Made fantastic fantastic with...',
      'Made with love using...',
      'Straight from the unicorns stomach, using...',
      'Wow such ingedients...',
      'Hot off the shelf with...'
    ];

    return arrayOfWow[number1to10];
  }

  componentWillMount() {
    this.props.dispatch(Actions.getDrinkMixRequest.bind(null, this.props.params.slug)());
  }

  render() {
    // function noop() {} = Function.prototype

    return (
      <div>
        <Header onLogoClick={this.handleLogoClick}/>
        <div id="height-wrap">
          <div className="container main">
            <div className="single-post post-detail">
              <p className="author-name">Drink Name: {this.props.drinkMix.name}</p>
              <p className="post-desc"><i>{this.props.drinkMix.desc}</i></p>
              <br/><br/>
              <div className="row text-center">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <i className="fa fa-bars" aria-hidden="true"></i>&nbsp;<span>{this.getSupercalifragilisticexpialidociousText()}</span>
                </div>
              </div>
              <br/>
              <ul class="list-group">
                { this.props.drinkMix.drink1 !== undefined
                  ? <li className="list-group-item post-desc">{this.props.drinkMix.amount1}ml of {this.props.drinkMix.drink1.name}</li>
                  : '' }
                { this.props.drinkMix.drink2 !== undefined
                  ? <li className="list-group-item post-desc">{this.props.drinkMix.amount2}ml of {this.props.drinkMix.drink2.name}</li>
                  : '' }
                { this.props.drinkMix.drink3 !== undefined
                  ? <li className="list-group-item post-desc">{this.props.drinkMix.amount3}ml of {this.props.drinkMix.drink3.name}</li>
                  : '' }
                { this.props.drinkMix.drink4 !== undefined
                  ? <li className="list-group-item post-desc">{this.props.drinkMix.amount4}ml of {this.props.drinkMix.drink4.name}</li>
                  : '' }
                { this.props.drinkMix.drink5 !== undefined
                  ? <li className="list-group-item post-desc">{this.props.drinkMix.amount5}ml of {this.props.drinkMix.drink5.name}</li>
                  : '' }
              </ul>
              <br/>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div className="btn btn-primary">Make Drink!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// DrinkMixDetailContainer.need = [
//   (params) => {
//     return Actions.getDrinkMixRequest.bind(null, params.slug)();
//   }
// ];

// ,
//   () => {
//     return Actions.fetchDrinks(); 
//   }

DrinkMixDetailContainer.contextTypes = {
  router: React.PropTypes.object,
};

DrinkMixDetailContainer.propTypes = {
  drinkMix: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    drinkMix: (store.drinkMix),
  };
}

export default connect(mapStateToProps)(DrinkMixDetailContainer);
