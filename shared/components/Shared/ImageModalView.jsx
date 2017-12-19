import React, { Component, PropTypes } from 'react';
import s from '../../css_modules/modal.css';

class ImageModalView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handleImageClick(num, item, e) {
    e.preventDefault();

    this.props.onImageClick(num, item);
  }

  handleCancelClick() {
    this.props.onImageClick(null, null);
  }

  render() {
    /* Styles */
    const modal_header = "modal-dialog " + s.largeModal;

    return (
      <div id="image-modal" className="modal fade" role="dialog">
        <div className={modal_header}>

          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">Select an Image</h4>
            </div>
            <div className="modal-body">
              <div className="row">
              {this.props.items.map((item, i) => (
                <div className="col-sm-4 col-md-4 col-lg-4" key={i}>
                  <img onClick={this.handleImageClick.bind(this, i, item)} className={"img-responsive " + (this.props.imageClicked == i ? s.imageSelected : s.imageUnselected)} src={"/img/" + item}></img>
                </div>
              ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.handleCancelClick.bind(this)} className="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal">Select</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default ImageModalView;
