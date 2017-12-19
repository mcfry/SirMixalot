import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import DrinkMixListView from '../../components/DrinkMixes/DrinkMixListView';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class DrinkContainer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Header/>
        <div id="height-wrap" className="container">
          <DrinkMixListView drinkMixes={this.props.drinkMixes}/>
        </div>
      </div>
    );
  }
}

DrinkContainer.need = [() => { return Actions.fetchDrinkMixes(); }];
DrinkContainer.contextTypes = {
  router: React.PropTypes.object,
};

function mapStateToProps(store) {
  return {
    drinkMixes: store.drinkMixes,
  };
}

// DrinkContainer.propTypes = {
//   drinkMixes: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     drink1: PropTypes.string.isRequired,
//   })).isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

export default connect(mapStateToProps)(DrinkContainer);










































    // this.state = {
    //   showAddDrink: false,
    // };
    // this.handleDrinkMixClick = this.handleDrinkMixClick.bind(this);
    //this.add = this.add.bind(this);

              // <DrinkCreateView addDrink={this.add}
          //   showAddDrink={this.state.showAddDrink}/>

          //<Header onDrinkClick={this.handleDrinkClick} />


  // handleDrinkClick(e) {
  //   this.setState({
  //     showAddDrink: !this.state.showAddDrink,
  //   });

  //   e.preventDefault();
  // }

  // add(name, title, content) {
  //   this.props.dispatch(Actions.addDrinkRequest({ name, title, content }));
  //   this.setState({
  //     showAddDrink: false,
  //   });
  // }

  // componentDidMount() {
  //   this.props.dispatch(Actions.fetchDrinkMixes());
  // }