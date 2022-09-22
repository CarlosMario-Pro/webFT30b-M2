import React from 'react';
import style from './Card.module.css';

export default function Card(props) {
  const {max, min, name, img, onClose} = props;
  // acá va tu código
  return (
    <div className = {style.container1}>
      <button onClick={onClose} className ={style.botonX}>X</button>
      <h3 className = {style.ciudad}>
        {name}
      </h3>

      <div>
        <div>
          <p>Min</p>
          <span>{min}°</span>
        </div>
        <div>
          <p>Max</p>
          <span>{max}°</span>
        </div>
        <img src = {`http://openweathermap.org/img/wn/${img}@2x.png`} alt = "icon" className ={style.img}/>
      </div>
    </div>
  )
};

