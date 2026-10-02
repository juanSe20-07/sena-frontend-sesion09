
// LISTA DE PRODUCTOS

let productos = [

    {
        id: 1,
        nombre: "Teclado mecánico",
        precio: 180000,
        categoria: "Tecnología",
        activo: true
    },

    {
        id: 2,
        nombre: "Agenda semanal",
        precio: 45000,
        categoria: "Organización",
        activo: true
    },

    {
        id: 3,
        nombre: "Lámpara de escritorio",
        precio: 95000,
        categoria: "Escritorio",
        activo: true
    },

    {
        id: 4,
        nombre: "Mouse inalámbrico",
        precio: 75000,
        categoria: "Tecnología",
        activo: true
    },

    {
        id: 5,
        nombre: "Organizador de cables",
        precio: 25000,
        categoria: "Organización",
        activo: false
    },

    {
        id: 6,
        nombre: "Soporte para portátil",
        precio: 110000,
        categoria: "Escritorio",
        activo: true
    },

    {
        id: 7,
        nombre: "Cuaderno de proyectos",
        precio: 30000,
        categoria: "Organización",
        activo: true
    },

    {
        id: 8,
        nombre: "Audífonos Bluetooth",
        precio: 150000,
        categoria: "Tecnología",
        activo: true
    }

];

// ELEMENTOS DEL HTML

const contenedor = document.getElementById("productos");
const categoria = document.getElementById("categoria");
const orden = document.getElementById("orden");
const cantidad = document.getElementById("cantidad");
const total = document.getElementById("total");

// MOSTRAR PRODUCTOS

function mostrarProductos() {

    // Hacemos una copia del array

    let lista = [...productos];

    // FILTER

    if (categoria.value != "Todos") {

        lista = lista.filter(
            ({ categoria: categoriaProducto }) => {

                return categoriaProducto == categoria.value;

            }
        );

    }

    // SORT

    if (orden.value == "menor") {

        lista = [...lista].sort(
            (a, b) => a.precio - b.precio
        );

    }


    if (orden.value == "mayor") {

        lista = [...lista].sort(
            (a, b) => b.precio - a.precio
        );

    }

    // MAP

    contenedor.innerHTML = lista.map(

        ({ id, nombre, precio, categoria, activo }) => {

            let estado;

            if (activo == true) {

                estado = "Disponible";

            } else {

                estado = "No disponible";

            }


            return `

                <article class="producto" data-id="${id}">

                    <h2>
                        ${nombre}
                    </h2>

                    <p>
                        Categoría:
                        ${categoria}
                    </p>

                    <p class="precio">
                        $${precio.toLocaleString()}
                    </p>

                    <p>
                        Estado:
                        ${estado}
                    </p>

                    <button class="eliminar">
                        Eliminar
                    </button>

                </article>

            `;

        }

    ).join("");

    // REDUCE

    let suma = lista.reduce(

        (acumulador, producto) => {

            return acumulador + producto.precio;

        },

        0

    );

    // MOSTRAR INFORMACIÓN EN LA PÁGINA

    cantidad.textContent = lista.length;

    total.textContent =
        "$" + suma.toLocaleString();

}

// FILTRAR POR CATEGORÍA

categoria.addEventListener(
    "change",
    mostrarProductos
);

// ORDENAR POR PRECIO

orden.addEventListener(
    "change",
    mostrarProductos
);

// DELEGACIÓN DE EVENTOS

contenedor.addEventListener(
    "click",
    function (event) {

        let boton =
            event.target.closest(".eliminar");


        if (boton) {

            let producto =
                boton.parentElement;

            let id =
                Number(producto.dataset.id);


            // Eliminamos el producto
            // utilizando filter()

            productos = productos.filter(

                producto => producto.id != id

            );


            // Volvemos a mostrar los productos

            mostrarProductos();

        }

    }
);

// MOSTRAR LOS PRODUCTOS AL INICIAR

mostrarProductos();