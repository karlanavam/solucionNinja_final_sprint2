var listas = []; // Este arreglo se crea porque a la hora de editar las listas la informacion necesita estar guardada en algun lugar

function Lista (id, titulo) { // Sólo llamamos estos dos parametros ya que los parametros van a ser totalmente diferntes cada vez.
  this.id = id;
  this.titulo = titulo;
  this.pendientes = [];
  this.agregarAAtributoPendiente = function(pendiente) {
    this.pendientes.push(pendiente);
  }
}

function Pendiente(id, contenido) { // Este es otro constructor, el content lo proporcionamos nosotros los id, la computadora.
this.id = id;
this.contenido = contenido;
}

function crearLista () {
  var titulo = document.getElementById("tituloLista");
  var id = Date.now(); // Con este id vamos a tener listas unicas con ids diferentes
  var lista = new Lista (id, titulo.value) // Cada vez que creemos una lista vamos a requerir un id y un título pero no los pendites.
  listas.push(lista);
  mostrar(lista);
}

function mostrar(lista) { // render HTML ()
  var contenedorSection = document.createElement("section");
  var contenedorLista = document.getElementById("contenedorLista");

 var inputPendiente = document.createElement("input");
 var botonPendiente = document.createElement("input");

 inputPendiente.type = "text";
 inputPendiente.id = "text-" + lista.id;
 botonPendiente.type = "submit";
 botonPendiente.value = "Enviar Pendiente";
 botonPendiente.onclick =  agregarPendiente; // No lleva parentesis porque solo estamos haciendo la referencia a la función más no ejecutándola.
botonPendiente.setAttribute("data-lista-id",lista.id) // Cada vez que cree un boton dinamicamente tambien voy a crear los cuatro
// atributos anteriores del input text al onclick. Este set attribute nos ayuda a crear una lista que no sea con el id, porque s
// no sería el mismo y no nos serviría. El id que nos da el setAtt es para que con el id que tiene podemos agregar pendientes.


botonPendiente.id = lista.id;
  contenedorSection.id = lista.id; // Esto es para que se creen id's unicos en cada lista nueva
  var tituloH3 = document.createElement("h3");
  tituloH3.innerText = lista.titulo; // Podiramos utilizar un createTextNode en vez del inner
  contenedorSection.appendChild(tituloH3);
  contenedorLista.appendChild(contenedorSection);
  contenedorLista.appendChild(inputPendiente);
  contenedorLista.appendChild(botonPendiente);
}

function agregarPendiente () {
var idListaAModificar = this.getAttribute("data-lista-id");
// El metodo filter nos va a buscar en un arreglo de datos el parametro que yo le de.
var objetoAAgregarElPendiente = listas.filter(function (lista) {
  return lista.id == idListaAModificar;
});

var textoDePendieteAAgregar = document.getElementById('text-'+ idListaAModificar.toString());

var pendiente = new Pendiente (Date.now(), textoDePendieteAAgregar)
  objetoAAgregarElPendiente[0].agregarAAtributoPendiente(pendiente) // el cero es para acceder al primer elemento del []
  mostrarHTMLPendiente(idListaAModificar, pendiente);
}

  function mostrarHTMLPendiente (idListaAModificar, pendiente) {
  var liContenedor = document.createElement("li");
  liContenedor.innerText = pendiente.contenido.value;
  var listaAModificar = document.getElementById(idListaAModificar);
  listaAModificar.appendChild(liContenedor);
}