import React from 'react';
import errorIcon from '../../images/errorIcon.svg'
import successIcon from '../../images/successIcon.svg'
import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, isSuccess, tooltipMessage }) {


  return (
    <div className={`popup popup_type_tooltip ${isOpen ? `popup_is-opened` : ""}`}>
      <div className="popup__container">
        <img src={isSuccess ? successIcon : errorIcon} className='popup__image-tooltip' alt='подсказка' />
        <h3 className="popup__title-success">{tooltipMessage}</h3>
        <button onClick={onClose} className="popup__close" type="button" aria-label="закрытие"></button>
        <button onClick={onClose} className="popup__succesbtn" type="button">{isSuccess? "Хорошо" : "Попробовать снова"}</button>
      </div>
    </div>
  );
}

export default InfoTooltip;