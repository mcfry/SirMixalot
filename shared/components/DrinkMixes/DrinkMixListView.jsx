import React, { PropTypes } from 'react';
import DrinkMixListItem from './Items/DrinkMixListItem';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';

function DrinkMixListView(props) {
  return (
    <div className="listView">
      {
        props.drinkMixes.map((drinkMix, i) => (
          <DrinkMixListItem drinkMix={drinkMix} key={i}
            onClick={function handleClick() {
              props.dispatch(Actions.addSelectedDrinkMix(drinkMix));
            }}
            onDelete={function handleDelete() {
              if (confirm('Do you want to delete this drinkMix')) { // eslint-disable-line
                props.dispatch(Actions.deleteDrinkMixRequest(drinkMix));
              }
            }}
          />
        ))
      }
    </div>
  );
}

// Need this data before initial mount
//DrinkMixListView.need = [() => { return Actions.fetchDrinkMixes(); }];

DrinkMixListView.propTypes = {
  drinkMixes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(DrinkMixListView);
