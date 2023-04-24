let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
// get total price

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

//create product

let dataProduct;

if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value != "" && category.value != "" && newProduct.count <= 100 ) {
    if (mood === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          dataProduct.push(newProduct);
        }
      } else {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct[tmp] = newProduct;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  } else {
  }

  // save to localstorage
  localStorage.setItem("product", JSON.stringify(dataProduct));

  showData();
};

// clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read
function showData() {
  getTotal();
  let table = "";

  for (let i = 0; i < dataProduct.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update"> update </button></td>
        <td><button onclick="deleteItem(${i})" id="delete"> delete </button></td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;

  let btnDelete = document.getElementById("delete-all");
  if (dataProduct.length > 0) {
    btnDelete.innerHTML = `
    <td><button onclick ="deleteData()"> Delete All(${dataProduct.length}) </button></td>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
}

showData();

//delete
function deleteItem(e) {
  dataProduct.splice(e, 1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

// delete all

function deleteData() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

//update

function updateData(e) {
  title.value = dataProduct[e].title;
  price.value = dataProduct[e].price;
  taxes.value = dataProduct[e].taxes;
  ads.value = dataProduct[e].ads;
  discount.value = dataProduct[e].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataProduct[e].category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = e;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

//search

// search-title   search-category

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "search-title") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }

  search.placeholder = "Search By " + searchMood.toUpperCase();
  search.focus();
  search.value = "";
  showData();
}

function searchData(val) {
  let table = "";

  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMood == "title") {
      if (dataProduct[i].title.includes(val.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update"> update </button></td>
            <td><button onclick="deleteItem(${i})" id="delete"> delete </button></td>
          </tr>
        `;
      }
    } else {
      if (dataProduct[i].category.includes(val.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updateData(${i})" id="update"> update </button></td>
            <td><button onclick="deleteItem(${i})" id="delete"> delete </button></td>
          </tr>
        `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

//clean data
