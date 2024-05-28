var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var searchInput = document.getElementById("searchInput");
var addUpdateBtn = document.getElementById("addUpdateBtn");
var productNameAlert = document.getElementById("productNameAlert");
var productPriceAlert = document.getElementById("productPriceAlert");
var productCategoryAlert = document.getElementById("productCategoryAlert");
var productDescAlert = document.getElementById("productDescAlert");

var productsArr = JSON.parse(localStorage.getItem("products")) ?? [];
displayProducts();

var updateMode = false;

var mainIndex;

function addUpdateProduct() {
  validateProductData();

  if (isProductDataValid()) {
    if (!updateMode) {
      addProduct(getProduct());
    } else {
      updateProduct(getProduct());
    }

    onDataChange();

    clearForm();
  }
}

function getProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  return product;
}

function addProduct(product) {
  productsArr.push(product);
}

function displayProducts() {
  var searchTerm = searchInput.value;

  var basket = "";

  for (var i = 0; i < productsArr.length; i++) {
    if (productsArr[i].name.toLowerCase().includes(searchTerm.toLowerCase())) {
      basket += ` <tr>
      <td>${i}</td>
      <td>${productsArr[i].name}</td>
      <td>${productsArr[i].price}</td>
      <td>${productsArr[i].category}</td>
      <td>${productsArr[i].desc}</td>
      <td><button onclick="patchValues(${i})" class="btn btn-outline-warning">Update</button></td>
      <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
  </tr>`;
    }
  }

  document.getElementById("tableBody").innerHTML = basket;
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

function onDataChange() {
  localStorage.setItem("products", JSON.stringify(productsArr));
  displayProducts();
}

function deleteProduct(index) {
  productsArr.splice(index, 1);
  onDataChange();
}

function patchValues(index) {
  mainIndex = index;
  updateMode = true;
  productNameInput.value = productsArr[index].name;
  productPriceInput.value = productsArr[index].price;
  productCategoryInput.value = productsArr[index].category;
  productDescInput.value = productsArr[index].desc;

  addUpdateBtn.innerHTML = "Update Product";
}

function updateProduct(product) {
  productsArr.splice(mainIndex, 1, product);
  addUpdateBtn.innerHTML = "Add Product";
  updateMode = false;
}

function isProductDataValid() {
  return (
    /^[A-Z][\w ]{2,19}$/.test(productNameInput.value) &&
    /^[1-9][0-9]*$/.test(productPriceInput.value) &&
    /^[A-Z][\w ]{2,19}$/.test(productCategoryInput.value) &&
    /^[A-Z].{2,}$/.test(productDescInput.value)
  );
}

function validateProductData() {
  if (/^[A-Z][\w ]{2,19}$/.test(productNameInput.value)) {
    productNameAlert.classList.add("d-none");
    productNameInput.classList.add("is-valid");
    productNameInput.classList.remove("is-invalid");
  } else {
    productNameAlert.classList.remove("d-none");
    productNameInput.classList.add("is-invalid");
    productNameInput.classList.remove("is-valid");
  }

  if (/^[1-9][0-9]*$/.test(productPriceInput.value)) {
    productPriceAlert.classList.add("d-none");
    productPriceInput.classList.add("is-valid");
    productPriceInput.classList.remove("is-invalid");
  } else {
    productPriceAlert.classList.remove("d-none");
    productPriceInput.classList.add("is-invalid");
    productPriceInput.classList.remove("is-valid");
  }

  if (/^[A-Z][\w ]{2,19}$/.test(productCategoryInput.value)) {
    productCategoryAlert.classList.add("d-none");
    productCategoryInput.classList.add("is-valid");
    productCategoryInput.classList.remove("is-invalid");
  } else {
    productCategoryAlert.classList.remove("d-none");
    productCategoryInput.classList.add("is-invalid");
    productCategoryInput.classList.remove("is-valid");
  }

  if (/^[A-Z].{2,}$/.test(productDescInput.value)) {
    productDescAlert.classList.add("d-none");
    productDescInput.classList.add("is-valid");
    productDescInput.classList.remove("is-invalid");
  } else {
    productDescAlert.classList.remove("d-none");
    productDescInput.classList.add("is-invalid");
    productDescInput.classList.remove("is-valid");
  }
}
