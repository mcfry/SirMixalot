import React, { Component, PropTypes } from 'react';
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

class DrinkCreateContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.addDrink = this.addDrink.bind(this);

    this.state = {
      errors: [],
    };
  }

  addDrink() {
    let errors = [];

    const name = this.refs.name.value;
    const slot = parseInt(this.refs.slot.value);
    const content = this.refs.content.value;

    if (!name) {
      errors.push('You must name the liquid!');
    }
    if (!slot || slot === NaN) {
      errors.push('You must specify a slot (number from 1 to 5) of the liquid!');
    }

    if (name && slot && slot !== NaN) {
      this.props.dispatch(Actions.addDrinkRequest({ name, slot, content }));
      this.context.router.push('/');
    } else {
      this.setState({ errors: errors });
    }
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
      	      <h2 className="post-title">Add New Liquid</h2>
              <div class="input-group">
      	        <input placeholder="Liquid name" className="form-control" ref="name"/>
              </div><br />
              <div class="input-group">
                <input placeholder="Liquid slot (number from 1 to 5, from left)" className="form-control" ref="slot"/>
              </div><br />
              <div class="input-group">
      	        <textarea placeholder="Liquid Other (optional)" className="form-control" ref="content"></textarea>
              </div><br />
      	      <a className="btn btn-primary align-right" onClick={this.addDrink}>Submit</a>
      	    </div>
          </div>
        </div>
      </div>
    );
  }
}

DrinkCreateContainer.contextTypes = {
  router: React.PropTypes.object,
};

DrinkCreateContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(DrinkCreateContainer);