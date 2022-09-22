let cleanInputs = function(){
    $('#input').val('');
    $('#inputDelete').val('');
};

//para seleccionar el boton, puedo usar document.queryselector o document.getElementById
//usaremos jquery
//Función para actualizar la lista, sirve también para identificar si el amigo existe
let viewList = () => {
    let URLServidorAmigos = `http://localhost:5000/amigos`;
    $('#lista').empty();//el empty es de Jquery, sirva para resetear la lista
    $.get(`${URLServidorAmigos}`, function(data) {
        console.log(data);
        data.forEach(element => {
            $('#lista').append('<li>' + element.id + ' ' + element.name + '</li>');
            /*otra forma de traer la lista sería, creando una variable y guardar en ella $('#lista'), y quedaría:
            let lista = $('#lista');
            lista.append('<li>' + element.id + ' ' + element.name + '</li>');
            */
        });
    });
};

//Función para identificar si el amigo existe
$('#boton').click(viewList)

//Función para buscar amigo
$('#search').click(function () {
    let id = $('#input').val();
    console.log(id);
    if(id){
        $.get(`${URLServidorAmigos} / ${id}`, function(buscarAmigos){
            //console.log(buscarAmigos);
            $('#amigo').text(buscarAmigos.name);
        });
        //$.get(URLServidorAmigos + id);
        //$.get(`http://localhost:5000/amigos` + id);
        $('#amigo').text('Amigo inexiste');
        //Si envían un id que no existe, no entrará en el get anterior, por lo que se ejecutará ésta línea
    }
    cleanInputs();
});

//Función para eliminar amigo
$('#delete').click(function () {
    let id = $('#inputDelete').val();
    if(id){
        $.ajax({
            url: `${URLServidorAmigos}/${id}`,
            type: 'Delete',
            success: function(){
                $('#success').text(`Amigo borrado con éxito`);
                viewList();//Invoca la función que muestra a los amigos
                cleanInputs();//reinicia la lista una vez se elimine el elemento
            }
        });
    };
});