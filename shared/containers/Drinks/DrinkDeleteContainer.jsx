import React, { Component, PropTypes } from 'react';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class DrinkDeleteContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.removeDrink = this.removeDrink.bind(this);

    this.state = {
      drink: "",
      errors: [],
    };
  }

  handleSelectLiquid(e) {
    // Use Conditions to Dynamically Set the Object Key Neatly
    let conditions = {};
    conditions['drink'] = e.target.value;

    this.setState(conditions);
  }

  removeDrink() {
    let errors = [];

    if (this.state.drink === "" || this.state.drink === undefined || this.state.drink === null) {
      errors.push("You must select a liquid to remove!");
    } else {
      this.props.dispatch(Actions.deleteDrinkRequest(this.state.drink));
      this.context.router.push('/');
    }
  }

  //
  // Lifecycle
  ////////////////
  componentDidMount() {
    this.props.dispatch(Actions.fetchDrinks());
  }

  render() {
    //const cls = `form ${(this.props.showAddDrink ? 'appear' : '')}`;
    // <div className={cls}>
    //</div>

    return (
      <div>
        <Header/>
        <div id='height-wrap'>
          <div class="container">
            <br />
            { this.state.errors.length > 0 
              ? <div className="container alert alert-danger">
                  {this.state.errors.map((error, i) => (
                    <h5 key={i}>{error}</h5>
                  ))}
                </div>
              : <div></div>
            }
            <br />
      	    <div className="container well">
      	      <h2 className="post-title">Remove a Liquid</h2>
              <select value={this.state.drink} onChange={this.handleSelectLiquid.bind(this)} className="form-control">
                <option value="" disabled>Choose Liquid to Remove</option> 
                {
                  this.props.drinks.map((drink, i) => (
                    <option value={drink._id} key={i}>{drink.name}</option>
                  ))
                }
              </select><br/>
      	      <a className="btn btn-primary align-right" onClick={this.removeDrink}>Submit</a>
      	    </div>
          </div>
        </div>
      </div>
    );
  }
}

// Need this data before initial mount
DrinkDeleteContainer.need = [() => { return Actions.fetchDrinks(); }];

DrinkDeleteContainer.contextTypes = {
  router: React.PropTypes.object,
};

DrinkDeleteContainer.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(store) {
  return {
    drinks: store.drinks,
  };
}

export default connect(mapStateToProps)(DrinkDeleteContainer);