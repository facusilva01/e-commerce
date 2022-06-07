let divLibros = document.getElementById("shop-products")

fetch('productos.json')
.then(response => response.json())
//crear productos
.then(libros => {
    libros.forEach((cliente) => {
        let {nombre, precio, autor, img} = cliente
        divLibros.innerHTML += `
        <div class = "card">
            <img src= ${img} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${autor}</h6>
                <p class="card-text">$ ${precio}</p>
                <button class="btn btn-outline-primary btnAgregarCarrito">Agregar al carrito</button>
            </div>
        </div>
        `
    })
    //agregar productos al carrito
    const agregarAlCarrito = document.querySelectorAll(".btnAgregarCarrito");
    agregarAlCarrito.forEach(agregarCarrito => {
        agregarCarrito.addEventListener('click', agregarCarritoClick);
    });
})


let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.carrito-container');
let closeCart = document.querySelector('#close-cart');

//abrir y cerrar carrito
cartIcon.onclick = () => {
    cart.classList.add('active');
}

closeCart.onclick = () => {
    cart.classList.remove('active');
} 

const carritoCardsContainer = document.getElementById('cart-container');

//Crear carrito
function agregarCarritoClick(event) {
    const boton = event.target;
    const card = boton.closest('.card');
    const cardTitle = card.querySelector('.card-title').textContent;
    const cardPrice = card.querySelector('.card-text').textContent;
    const cardImg = card.querySelector('.card-img-top').src;
    
    agregarCardAlCarrito(cardTitle, cardPrice, cardImg); 
}

function agregarCardAlCarrito(cardTitle, cardPrice, cardImg) {
    const tituloELementos = carritoCardsContainer.getElementsByClassName('shoppingCartItemTitle');
    for(let i = 0; i < tituloELementos.length; i++) {
        if(tituloELementos[i].innerText === cardTitle) {
            let cantidadElemento  = tituloELementos[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            cantidadElemento.value++;
            actualizarTotalCarrito();
            return;
        }
    }
    const carritoColumna = document.createElement('div');
    const carritoContenido = `
        <div class="row shoppingCartItem">
            <div class="col-6">
                <div class="shopping-cart-item d-flex align-items-center h-100 pb-2 pt-3">
                    <img src=${cardImg} class="shopping-cart-image">
                    <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${cardTitle}</h6>
                </div>
            </div>
            <div class="col-2">
                <div class="shopping-cart-price d-flex align-items-center h-100 pb-2 pt-3">
                    <p class="item-price mb-0 shoppingCartItemPrice">${cardPrice}</p>
                </div>
            </div>
            <div class="col-4">
                <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 pb-2 pt-3">
                    <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
                    <button class="btn btn-danger buttonDelete" type="button">X</button>
                </div>
            </div>
        </div> `;
    
    carritoColumna.innerHTML = carritoContenido;
    carritoCardsContainer.appendChild(carritoColumna); 
    
    carritoColumna.querySelector('.buttonDelete').addEventListener('click', removeCarritoCard);

    carritoColumna.querySelector('.shoppingCartItemQuantity').addEventListener('change', cambiarCantidad);

    actualizarTotalCarrito();
}

//Actualizar el precio total del carrito
function actualizarTotalCarrito() {
    let total = 0;
    const carritoTotal = document.querySelector('.shoppingCartTotal')
    const carritoCards = document.querySelectorAll('.shoppingCartItem');
    
    carritoCards.forEach(carritoCard => {
        const carritoCardPrecioElemento = carritoCard.querySelector('.shoppingCartItemPrice');
        const carritoCardPrecio = Number(carritoCardPrecioElemento.textContent.replace('$', ''));
        const carritoCardCantidadElemento = carritoCard.querySelector('.shoppingCartItemQuantity');
        const carritoCardCantidad = Number(carritoCardCantidadElemento.value);

        total = total + carritoCardPrecio * carritoCardCantidad;
    })
    carritoTotal.innerHTML = `$${total.toFixed(2)}`;   
}

//remover producto del carrito
function removeCarritoCard(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    actualizarTotalCarrito();
}

//cambiar cantidad de productos en el carrito
function cambiarCantidad(event) {
    const input = event.target;
    if (input.value <= 0) {
        input.value = 1;
    }
    actualizarTotalCarrito();
}

//compra de productos
let botonComprar = document.getElementById('buyButton')
let carritoCompra = document.getElementById('cart-container')

botonComprar.addEventListener('click', () => {
    carritoCompra.innerHTML= `
    <h2 class="carrito-titulo">Carrito</h2>
        <i class='bx bx-x' id="close-cart"></i>
        <div class="row">
            <div class="col-12">
                <div class="shopping-cart-total d-flex align-items-center">
                    <p class="mb-0">Total</p>
                    <p class="ml-4 mb-0 shoppingCartTotal">$0</p>
                    <button class="btn btn-success ml-auto" type="button" id="buyButton">Comprar</button>
                </div>
            </div>
        </div>
        <div class="load">
            <div class="loader"></div>
        </div>
        <div class="compra">
            <p>Su compra esta siendo procesada</p>
        </div>    
    `
}) 

botonComprar.onclick = () => {
    setTimeout(compraRealizada, 3000)
}

function compraRealizada() {
    carritoCompra.innerHTML = `
    <h2 class="carrito-titulo">Carrito</h2>
    <i class='bx bx-x' id="close-cart"></i>
    <div class="row">
        <div class="col-12">
            <div class="shopping-cart-total d-flex align-items-center">
                <p class="mb-0">Total</p>
                <p class="ml-4 mb-0 shoppingCartTotal">$0</p>
                <button class="btn btn-success ml-auto" type="button" id="buyButton">Comprar</button>
            </div>
        </div>
    </div>
    <div class="compraRealizada">
        <p>Su compra ha sido realizada con exito, sera redirigido a la pagina principal.</p>
    </div>    
`
}

botonComprar.addEventListener('click', () => {
    setTimeout(cargarPagina, 7000);
    function cargarPagina() {
        window.location = "index.html"
    }
})

//modal de ingreso
const ingresarModal = document.getElementById('ingresarModal')
ingresarModal.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget
  const recipient = button.getAttribute('data-bs-whatever')
  const modalBodyInput = ingresarModal.querySelector('.modal-body input')
  modalBodyInput.value = recipient
})


//formulario de ingreso
let loginForm = document.querySelector('#loginForm')

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length && JSON.parse(localStorage.getItem('formData')).some(data => 
        data.userName.toLowerCase() === document.getElementById('username').value.toLowerCase() || 
        data.email.toLowerCase() === document.getElementById('email').value.toLowerCase()
    );

    if(!exist){ 
        formData.push({
            userName: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        });
        localStorage.setItem('formData', JSON.stringify(formData));
        
        Toastify({
            text: "Cuenta creada con exito",
            duration: 4000,
            close: true,
            gravity: "top",
            position: "center",
          }).showToast();

        loginForm.reset();
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'El nombre de usuario o email ya existen, prueba de nuevo',
        })
    }
})

