// import React, { Component, PropTypes } from 'react';

// class DrinkCreateView extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.addDrink = this.addDrink.bind(this);
//   }

//   addDrink() {
//     const nameRef = this.refs.name;
//     const titleRef = this.refs.title;
//     const contentRef = this.refs.content;
//     if (nameRef.value && titleRef.value && contentRef.value) {
//       this.props.addDrink(nameRef.value, titleRef.value, contentRef.value);
//       nameRef.value = titleRef.value = contentRef.value = '';
//     }
//   }

//   render() {
//     const cls = `form ${(this.props.showAddDrink ? 'appear' : '')}`;
//     return (
//       <div className={cls}>
//         <div className="form-content">
//           <h2 className="form-title">Create new drink</h2>
//           <input placeholder="Author's Name" className="form-field" ref="name"/>
//           <input placeholder="Drink Title" className="form-field" ref="title"/>
//           <textarea placeholder="Drink Content" className="form-field" ref="content"></textarea>
//           <a className="post-submit-button align-right" href="#" onClick={this.addDrink}>Submit</a>
//         </div>
//       </div>
//     );
//   }
// }

// //
// // Child Of
// // # DrinkContainer

// DrinkCreateView.propTypes = {
//   addDrink: PropTypes.func.isRequired,
//   showAddDrink: PropTypes.bool.isRequired,
// };

// export default DrinkCreateView;
