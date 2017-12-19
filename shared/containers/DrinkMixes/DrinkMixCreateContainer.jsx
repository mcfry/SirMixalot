import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Header from '../../components/Header/Header';
import ImageModalView from '../../components/Shared/ImageModalView';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import s from '../../css_modules/main.css';

class DrinkMixCreateContainer extends Component {
  constructor(props, context) {
    super(props, context);

    // bind is the same as .call, except it's pure, returns new function
    this.handleImageClick = this.handleImageClick.bind(this);
    this.addDrinkMix = this.addDrinkMix.bind(this);

    this.state = {
      showImageClicked: null,
      imageClickedName: null,
      drink1: "",
      amount1: "",
      drink2: "",
      amount2: "",
      drink3: "",
      amount3: "",
      drink4: "",
      amount4: "",
      drink5: "",
      amount5: "",
      errors: [],
    };
  }

  addDrinkMix() {
    let errors = [];

    const name = this.refs.name.value;
    const desc = this.refs.desc.value;
    const drink1 = this.state.drink1 ? this.state.drink1 : undefined;
    const amount1 = this.state.amount1 ? parseInt(this.state.amount1) : undefined;
    const drink2 = this.state.drink2 ? this.state.drink2 : undefined;
    const amount2 = this.state.amount2 ? parseInt(this.state.amount2) : undefined;
    const drink3 = this.state.drink3 ? this.state.drink3 : undefined;
    const amount3 = this.state.amount3 ? parseInt(this.state.amount3) : undefined;
    const drink4 = this.state.drink4 ? this.state.drink4 : undefined;
    const amount4 = this.state.amount4 ? parseInt(this.state.amount4) : undefined;
    const drink5 = this.state.drink5 ? this.state.drink5 : undefined;
    const amount5 = this.state.amount5 ? parseInt(this.state.amount5) : undefined;
    const image = this.state.imageClickedName ? this.state.imageClickedName : undefined;

    if (!name) {
      errors.push('You must name the drink!');
    }
    if (!drink1) {
      errors.push('You must include at least one liquid!');
    }
    if (!image) {
      errors.push('You must select an image!');
    }
    if (!amount1) {
      errors.push('You must specify an amount, and it must be a number!');
    }

    if (name && drink1 && image && amount1) {
      this.props.dispatch(Actions.addDrinkMixRequest({ name, desc, drink1, amount1, drink2, amount2, drink3, amount3, drink4, amount4, drink5, amount5, image }));
      this.context.router.push('/');
    } else {
      this.setState({
        errors: errors,
      });
    }

  }

  handleImageClick(imageNumber, imageName) {
    this.setState({
      showImageClicked: imageNumber,
      imageClickedName: imageName,
    });
  }

  handleSelectLiquid(num, e) {
    // Use Conditions to Dynamically Set the Object Key Neatly
    let conditions = {};
    conditions['drink' + num.toString()] = e.target.value;

    this.setState(conditions);
  }

  handleAmountChange(num, e) {
    // Use Conditions to Dynamically Set the Object Key Neatly
    let conditions = {};
    conditions['amount' + num.toString()] = e.target.value;

    this.setState(conditions);
  }

  //
  // Lifecycle
  ////////////////
  componentDidMount() {
    this.props.dispatch(Actions.fetchDrinks());
  }

  render() {
    //onChange={this.handleDrinkAdded.bind(this, i)}
    return (
      <div>
        <Header/>
        <div id="height-wrap">
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
            <h2 className="post-title">Create New Drink Mix</h2>
            <input placeholder="Name of Drink Mix" className="form-control" ref="name"/><br/>
            <input placeholder="Drink Mix Desc" className="form-control" ref="desc"/><br/>
            <h4>Liquids (up to 5)</h4>
            <select value={this.state.drink1} onChange={this.handleSelectLiquid.bind(this, 1)} className="form-control">
              <option value="" disabled>Add a New Liquid</option> 
              {
                this.props.drinks.map((drink, i) => (
                  <option value={drink._id} key={i}>{drink.name}</option>
                ))
              }
            </select><br/>
            <input value={this.state.amount1} placeholder="Enter Amount of Drink 1 (ml)" onChange={this.handleAmountChange.bind(this, 1)} className="form-control"/><br/>
            <div className={this.state.drink1 && this.state.amount1 ? '' : s.hideElement}>
              <select value={this.state.drink2} onChange={this.handleSelectLiquid.bind(this, 2)} className="form-control">
                <option value="" disabled>Add a New Liquid</option> 
                {
                  this.props.drinks.map((drink, i) => (
                    <option value={drink._id} key={i}>{drink.name}</option>
                  ))
                }
              </select><br/>
              <input value={this.state.amount2} placeholder="Enter Amount of Drink 2 (ml)" onChange={this.handleAmountChange.bind(this, 2)} className="form-control"/><br/>
            </div>
            <div className={this.state.drink2 && this.state.amount2 ? '' : s.hideElement}>
              <select value={this.state.drink3} onChange={this.handleSelectLiquid.bind(this, 3)} className="form-control">
                <option value="" disabled>Add a New Liquid</option> 
                {
                  this.props.drinks.map((drink, i) => (
                    <option value={drink._id} key={i}>{drink.name}</option>
                  ))
                }
              </select><br/>
              <input value={this.state.amount3} placeholder="Enter Amount of Drink 3 (ml)" onChange={this.handleAmountChange.bind(this, 3)} className="form-control"/><br/>
            </div>
            <div className={this.state.drink3 && this.state.amount3 ? '' : s.hideElement}>
              <select value={this.state.drink4} onChange={this.handleSelectLiquid.bind(this, 4)} className="form-control">
                <option value="" disabled>Add a New Liquid</option> 
                {
                  this.props.drinks.map((drink, i) => (
                    <option value={drink._id} key={i}>{drink.name}</option>
                  ))
                }
              </select><br/>
              <input value={this.state.amount4} placeholder="Enter Amount of Drink 4 (ml)" onChange={this.handleAmountChange.bind(this, 4)} className="form-control"/><br/>
            </div>
            <div className={this.state.drink4 && this.state.amount4 ? '' : s.hideElement}>
              <select value={this.state.drink5} onChange={this.handleSelectLiquid.bind(this, 5)} className="form-control">
                <option value="" disabled>Add a New Liquid</option> 
                {
                  this.props.drinks.map((drink, i) => (
                    <option value={drink._id} key={i}>{drink.name}</option>
                  ))
                }
              </select><br/>
              <input value={this.state.amount5} placeholder="Enter Amount of Drink 5 (ml)" onChange={this.handleAmountChange.bind(this, 5)} className="form-control"/><br/>
            </div>
            <button className="btn btn-default" data-toggle="modal" data-target="#image-modal">Associate an Image</button>
            <a className={"btn btn-primary align-right " + s.button_space} onClick={this.addDrinkMix}>Submit</a>
          </div>
        </div>
        <ImageModalView onImageClick={this.handleImageClick} imageClicked={this.state.showImageClicked} items={['img-thing.jpg', 'img-thing2.jpg', 'img-thing3.jpg', 'solo_cup.jpg']}/>
      </div>
    );
  }
}

// Need this data before initial mount
DrinkMixCreateContainer.need = [() => { return Actions.fetchDrinks(); }];

DrinkMixCreateContainer.contextTypes = {
  router: React.PropTypes.object,
};

DrinkMixCreateContainer.propTypes = {
  drinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    drinks: store.drinks,
  };
}

export default connect(mapStateToProps)(DrinkMixCreateContainer);















// import React, { Component, PropTypes } from 'react';
// import Header from '../../components/Header/Header';
// import { connect } from 'react-redux';
// import * as Actions from '../../redux/actions/actions';

// class DrinkMixCreateContainer extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.addDrinkMix = this.addDrinkMix.bind(this);
//   }

//   addDrinkMix() {
//     const nameRef = this.refs.name;
//     const descRef = this.refs.desc;
//     if (nameRef.value && descRef.value) {
//       this.props.dispatch(Actions.addDrinkMixRequest({ nameRef, descRef }));
//       nameRef.value = descRef.value = '';
//     }
//   }

//   handleLogoClick() {
//     this.props.dispatch(Actions.fetchDrinks());
//   }

//   render() {
//     //const cls = `form ${(this.props.showAddDrinkMix ? 'appear' : '')}`   {cls};
//     return (
//       <div>
//         <Header onDrinkClick={Function.prototype} onLogoClick={this.handleLogoClick}/>
//         <div id="height-wrap" className="form appear">
//           <div className="form-content">
//             <h2 className="form-title">Create new drink mix</h2>
//             <input placeholder="Name of Drink Mix" className="form-field" ref="name"/>
//             <input placeholder="Drink Mix Desc" className="form-field" ref="desc"/>
//             <a className="post-submit-button align-right" href="#" onClick={this.addDrinkMix}>Submit</a>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// DrinkMixCreateContainer.contextTypes = {
//   router: React.PropTypes.object,
// };

// DrinkMixCreateContainer.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

// export default connect()(DrinkMixCreateContainer);