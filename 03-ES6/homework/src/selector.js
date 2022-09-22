var traverseDomAndCollectElements = function(matchFunc, startEl) {//starEl, es el elemento inicial, este inicialmente será undefined, 
//var traverseDomAndCollectElements = function(matchFunc, startEl === "undefined")//la función descomentada se podría escribir de esta manera
  var resultSet = [];//el array que retornaremos con los elementos que estamos buscando

  if (typeof startEl === "undefined") {
    startEl = document.body;//como el elemento inicial va a estar en undefined, pedimos que traiga el body del documento para empezar a recorrer el arbol de DOM
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl))resultSet.push(startEl)//si da true hace push, si no, continúa recorriendo la función

  for(let i = 0; i < startEl.children.length; i++){//startEl.children.length, esto quiere decir que estoy en el body, porque dijimos que startEl = document.body, .children me lleva a los hijos, entonces, la longitud es la cantidad de hijos que posea el body
    /*el método children, es para saber todos los nodos hijos de la etiqueta body:
  body = document.getElementByTagName ('body');
  body[0].children;
  HTMLCollection(4) [h1.pollito.vaca.gallina.etc, p, p, script]
  la variable i esta en el primer elemento, o sea, en el h1
*/
    let elements = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = resultSet.concat(elements);
  }
};


// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag
var selectorTypeMatcher = function(selector) {
  // tu código aquí
  //.classAlgo    #idAlgo   h2.subTirulo---h1,li,ulp, etc
  let array = selector.split('');
  if(selector[0] === "#") return "id";
  else if(selector[0] === ".") return "class";
  //else if(selector.split('.').length < 1) return 'tag.class';    el split dividirá el string cuando encuentre un punto
  for(let i = 1; i < array.length; i++){
    if(array[i] === '.'){
     return 'tag.class';
    }
  }
  if(!selector.includes(".") && !selector.includes("#")) return "tag";
};


// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.
var matchFunctionMaker = function(selector) {//ej: voy a buscar el id #pollito, ese id sería el parámetro selector
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  //Para hacer esta función, necesitamos utilizar propiedades de los elementos del DOM, como .id, .classList, .tagName
  if (selectorType === "id") {
    matchFunction = function(idDelElementoDelDom){//tengo el h3 con id #pollito, pregunta, cuál es el id de h3--->h3.id = pollito (pollito en string)
      return `#${idDelElementoDelDom.id}` === selector;//el === arroja un booleano, no sería necesario poner false o true
    }
  } else if (selectorType === "class") {//un elemento del DOM puede tener múltiples clases, por lo que hay que acceder a ellas con un método llamado .classList
    matchFunction = function(classDelElementoDelDom){
      let clasesDelElemento = classDelElementoDelDom.classList; 
      //classList devuelve una lista con las clases en forma de array [pollito, vaca, gallina, etc], esto se denomina DOMTokenList. No es array como tal, por lo que sus métodos no sirven
      for (let i = 0; i < clasesDelElemento.length; i++) {
        if (`.${clasesDelElemento[i]}` === selector) return true;  //voy a buscar la clase .etc, para hacer la comparación bien, debo agregar un '.'(punto)
      }
      return false;
    }
  } else if (selectorType === "tag.class") {
      matchFunction = (elementoActualDelDom) => {
        let tag = selector.split('.')[0];
        let clase = selector.split('.')[1];
        //let [tag, clase] =selector.split('.'); se puede definir en una misma línea las dos variables, tag retornará la posición 0 y clase la posición 1.
        //Una vez capturado el tag y la clase, buscamos tag y clase en la función que sigue
        let findingTag = matchFunctionMaker(tag);
        let resultTag = findingTag(elementoActualDelDom);

        let findingClass = matchFunctionMaker(`.${clase}`);
        let resultClass = findingClass(elementoActualDelDom);
        //se puede hacer también de la siguiente manera
        //return matchFunctionMaker(tag)(elementoActualDelDom) && matchFunctionMaker(`.${clase}`)(elementoActualDelDom);
        //explicación: matchFunctionMaker(tag) va a retornar una función, pero como necesito que me devuelva true o false del tag, pongo seguidamente el (elementoActualDelDom), el true o false lo retorna la cunción resultTag, lo mismo se hace con la class, como son dos, el tag y la class, utilizo el &&

        return resultTag && resultClass;
      }
  }
  else if (selectorType === "tag") {
      matchFunction = (elementoActualDelDom) => {
        return elementoActualDelDom.tagName.toLowerCase() === selector.toLowerCase();
        //con el método tagName accedemos al nombre del elemento, tagName devuelve el elemento es mayúscula, por lo que es mejor pasar todo a minúsculas para comparar
        /*Ejemplo del tagName al consultar un HTML en la consola:
        let elemento = document.getElementByTagName('h1');--->el h1 tiene las clases pollito, vaca, gallina, etc
        elemento;
        --HTMLCollection [h1.pollito.vaca.gallina.etc]
        elemento.id;  //undefined
        elemento.classList; //undefined
        elemento[0];  //''
        elemento[0].classList;  //DOMTokenList(4) ['pollito', 'vaca', 'gallina', 'etc' value:'pollito', 'vaca', 'gallina', 'etc']
        elemento[0].tagName; //'H1'
        elemento[0].localName;  //'h1'
        */
      }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);//La función matchFunctionMaker compara si el elemento del DOM es un selector
  elements = traverseDomAndCollectElements(selectorMatchFunc);//aquí hariamos un cb con traverseDomAndCollectElements, ya que su parámetro es la función selectorMatchFunc
  return elements;
};
$()