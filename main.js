let productos;
initialize();

function getProductos() {
  const localProducts = localStorage.getItem('products');
  return JSON.parse(localProducts);
}

function setProductos(array) {
  const productsToAdd = JSON.stringify(array);
  localStorage.setItem('products', productsToAdd);
}

function renderProductos() {
  const newProducts = getProductos();
  newProducts.sort((a, b) => a.id - b.id);

  const productosContainer = document.getElementById('productos');
  productosContainer.innerHTML = '';
  let html = newProducts.map(prod => {
    const tr = document.createElement('tr');
    const content = `
    <td>${prod.id}</td>
    <td>${prod.title}</td>
    <td>${prod.stock}</td>
    <td>${prod.price}</td>
    <td>${prod.description}</td>`;
    tr.innerHTML = content;
    return tr;
  });
  html.forEach(elm => {
    productosContainer.appendChild(elm);
  });
}

function initialize() {
  const localProducts = localStorage.getItem('products');

  if (localProducts === null) {
    localStorage.setItem('products', JSON.stringify([]));
  } else {
    productos = JSON.parse(localProducts);
  }

  renderProductos();
}

class Product {
  constructor(id, title, price, stock, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.stock = stock;
    this.description = description;
  }
}

function findId(id) {
  const newProducts = getProductos();
  let match = newProducts.filter(prod => prod.id === parseInt(id));
  if (match.length > 0) {
    alert('Otro producto ya tiene esa ID, debes probar con otra...');
    return false;
  } else {
    return true;
  }
}

function FormHandler(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  if (findId(data.id)) {
    let producto = new Product(parseInt(data.id), data.title, data.price, data.stock, data.description);
    const newProducts = getProductos();
    newProducts.push(producto);
    setProductos(newProducts);
    alert('Producto agregado exitosamente.');
    renderProductos();
  }
}

const form = document.getElementById('form');
form.addEventListener('submit', function (e) {
  FormHandler(e);
});

function DeleteHandler(e) {
  e.preventDefault();
  const deleteId = document.getElementById('deleteID').value;
  const newProducts = getProductos();
  const index = newProducts.findIndex(prod => prod.id === parseInt(deleteId));
  if (index > -1) {
    let selection = confirm(`Estas seguro que queres borrar el producto ${productos[index].title} (con ID ${deleteId})?`);
    if (selection) {
      alert('Producto eliminado correctamente');
      newProducts.splice(index, 1);
      setProductos(newProducts);
      renderProductos();
    }
  } else {
    alert(`No existe un producto con ID ${deleteId}`);
  }
}

const deleteForm = document.getElementById('deleteForm');
deleteForm.addEventListener('submit', function (e) {
  DeleteHandler(e);
});

function StockHandler(e) {
  e.preventDefault();
  const modifyId = document.getElementById('modifyID').value;
  const newProducts = getProductos();
  const index = newProducts.findIndex(prod => prod.id === parseInt(modifyId));
  if (index > -1) {
    let newStock = prompt(`Elija nuevo stock para ${newProducts[index].title}\nStock actual: ${newProducts[index].stock}`);
    let intNewStock = parseInt(newStock);
    if (parseInt(intNewStock) > 0) {
      alert(`Stock modificado correctamente, nuevo stock es ${newStock}`);
      newProducts[index].stock = newStock;
      setProductos(newProducts);
      renderProductos();
    } else {
      alert('Ese stock no es valido, reintente');
    }
  } else {
    alert(`No existe un producto con ID ${modifyId}`);
  }
}

const modifyForm = document.getElementById('modifyForm');
modifyForm.addEventListener('submit', function (e) {
  StockHandler(e);
});
