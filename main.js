let productos = [];

function Product(id, title, price, stock, description) {
  this.id = id;
  this.title = title;
  this.price = price;
  this.stock = stock;
  this.description = description;
}

function findId() {
  let idFlag = true;
  while (idFlag === true) {
    const id = prompt('Ingrese ID del producto');
    console.log(typeof id);
    console.log(typeof parseInt(id));
    let match = productos.filter(prod => prod.id === id);
    if (match.length > 0) {
      alert('Otro producto ya tiene esa ID, debes probar con otra...');
    } else {
      return id;
    }
  }
}

function createProduct() {
  let id = findId();
  let title = prompt('Ingrese nombre del producto');
  let price = prompt('Ingrese precio del producto');
  let stock = prompt('Ingrese stock del producto');
  let description = prompt('Ingrese descripcion del producto');

  let producto = new Product(id, title, price, stock, description);
  productos.push(producto);
  App();
}

function deleteProduct() {
  let allProducts = '';
  for (let i = 0; i < productos.length; i++) {
    let product = `Producto ${productos[i].id}: ${productos[i].title}\n`;
    allProducts += product;
  }
  if (productos.length !== 0) {
    let option = prompt('Elija la ID de un producto para eliminar:\n' + allProducts);
    if (productos.find(prod => prod.id === option)) {
      let nuevosProductos = productos.filter(prod => prod.id !== option);
      if (nuevosProductos.length > 0) {
        productos = nuevosProductos;
        alert('Se eliminó el producto con id ' + option);
        App();
      }
    } else {
      alert('No existe un producto con esa ID, por favor, intente nuevamente');
      deleteProduct();
    }
  } else {
    alert('Aun no se han agregado productos!');
    App();
  }
}

function showProductos() {
  let allProducts = '';
  for (let i = 0; i < productos.length; i++) {
    let product = `Producto ${productos[i].id}:
    Titulo: ${productos[i].title}
    Precio: $ ${productos[i].price}
    Stock: ${productos[i].stock}
    Description: ${productos[i].description}\n`;
    allProducts += product + '\n';
  }
  if (productos.length !== 0) {
    alert(allProducts);
  } else {
    alert('Aun no se han agregado productos!');
  }
  App();
}

function App() {
  let option = prompt('CONTROL DE STOCK\nOpciones:\n1) Agregar productos\n2) Eliminar un producto\n3) Ver los productos');
  switch (option) {
    case '1':
      createProduct();
    case '2':
      deleteProduct();
    case '3':
      showProductos();
    default:
      alert('Esa opcion no es valida');
      App();
  }
}

App();
