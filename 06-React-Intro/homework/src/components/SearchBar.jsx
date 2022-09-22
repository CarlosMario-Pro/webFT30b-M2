import React from 'react';
import style from './SearchBar.module.css';

export default function SearchBar({onSearch}) {
  // acá va tu código

const buscar = () =>{
  const inputSearch = document.querySelector("#inputSearch");
  onSearch(inputSearch.value)
}

  return (
    <div className = {style.container}>
      <input id = "inputSearch" type = "text"  className = {style.input}/>
      <button onClick={buscar} className = {style.boton}>Buscar</button>
    </div>
  )
};
//En la función buscar, selecciono la etiqueta HTML con querySelector, depués de seleccionarla, se ejecuta la función.

//en el button, no podemos pasarle una funcion ejecutada (<button onClick={ onSearch(inputSearch.value)   }>Buscar</button>), hay que pasarle una función para que se ejecute (<button onClick={() => onSearch(inputSearch.value)}>Buscar</button>)