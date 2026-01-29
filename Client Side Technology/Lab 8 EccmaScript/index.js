// https://fakestoreapi.com/products

// https://fakestoreapi.com/products/${id}

let loadProducts = document.getElementById("load-products");

let loadDetails = document.getElementById("load-details");

let productDetails = document.querySelector(".product-details");
let products = document.getElementById("products");

products.disabled = true;
loadDetails.disabled = true;
loadDetails.classList.add("disabled");

products.innerHTML = '<option value="">Loading products...</option>';

loadProducts.addEventListener("click", loadProductsFun);

loadDetails.addEventListener("click", () => {
  let id = products.value;
  loadProductDetailsFun(id);
});

function loadProductsFun() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products.innerHTML = '<option value="">Select a product</option>';
      data.forEach((product) => {
        let option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.title;
        products.appendChild(option);
      });
      products.disabled = false;
      loadDetails.disabled = false;
      loadDetails.classList.remove("disabled");
    });
}

function loadProductDetailsFun(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      productDetails.innerHTML = `
      <div class="image-container">
        <img src="${data.image}" alt="product image" />
      </div>
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      <span>${data.price}$</span>
      `;
    });
}
