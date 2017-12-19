import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import s from '../../../css_modules/image_list.css';

function DrinkMixListItem(props) {
  return (
    <div className={"single-post col-sm-4 col-md-4 col-lg-4 " + s.imageContainer}>
      <Link to={`/drinkMix/${props.drinkMix.slug}-${props.drinkMix.cuid}`} onClick={props.onClick}>
        <img className="img-responsive" src={"/img/" + props.drinkMix.image}></img>
        <div className={s.imageOverlay}>
          <h3 className="post-title">
            {props.drinkMix.name}
          </h3>
        </div>
      </Link>
      <p className="post-desc">{props.drinkMix.desc}</p>
      <p className="post-action"><a href="#" onClick={props.onDelete}>Delete Drink Mix</a></p>
    </div>
  );
}

DrinkMixListItem.propTypes = {
  drinkMix: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,

  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DrinkMixListItem;
