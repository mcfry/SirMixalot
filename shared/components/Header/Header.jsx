import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import s from '../../css_modules/main.css';
import h from '../../css_modules/header.css';


function Header(props, context) {
  // Variables
  const button = [s.unround_a_bitch, s.button_space];

  //<div className={"btn btn-default pull-right " + button.join(" ")} href="#" onClick={props.onDrinkClick}>Add Drink</div>

  return (
    <div className="header">
      <div className="header-content">
        <div className="row">
          <span className="site-title">
            <Link to="/" onClick={props.onLogoClick}>SIR M<i className={"fa fa-glass " + h.fontAwesomeHeaderSize} aria-hidden="true"></i>XALOT</Link>
          </span>
          { context.router.isActive('/', true)
            ? <div>
                <Link to="/liquid/delete">
                  <div className={"btn btn-default pull-right header-button-row " + button.join(" ")} href="#"><i className="fa fa-tint" aria-hidden="true"></i>&nbsp;&nbsp;Delete Liquid</div>
                </Link>
                <Link to="/liquid/create">
                  <div className={"btn btn-default pull-right " + button.join(" ")} href="#"><i className="fa fa-tint" aria-hidden="true"></i>&nbsp;&nbsp;Add Liquid</div>
                </Link>
                <Link to="/drink_mix/create">
                  <div className={"btn btn-default pull-right " + button.join(" ")} href="#"><i className="fa fa-glass" aria-hidden="true"></i>&nbsp;Add Drink Mix</div>
                </Link>
              </div> 
            : null 
          }
        </div>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: React.PropTypes.object,
};

Header.propTypes = {
  onLogoClick: PropTypes.func,
};

export default Header;
