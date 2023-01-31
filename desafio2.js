const fs = require('fs');
const ruta = "./desafio2.txt";
const crearTXT = async (ruta) => {
    if (!fs.existsSync(ruta)) {
        await fs.promises.writeFile(ruta, "[]")
    } else if ((await fs.promises.readFile(ruta, "utf-8")).length == 0) {
        await fs.promises.writeFile(ruta, "[]")
    }
}

class ProductManager {
    constructor() {
        this.path = ruta;
    }
    addProduct = async (nuevoProducto) => {
        if (toString(nuevoProducto.id).length > 0 && nuevoProducto.title.length > 0 && nuevoProducto.description.length > 0 && toString(nuevoProducto.price).length > 0 && nuevoProducto.thumbnail.length > 0 && nuevoProducto.code.length > 0 && toString(nuevoProducto.stock).length > 0) {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let arrayProductos = JSON.parse(contenido);
            if (arrayProductos.filter(product => product.code == nuevoProducto.code).length > 0) {
                console.error("Ya existe el producto");
            }
            else {
                let contenido = await fs.promises.readFile(this.path, "utf-8");
                let aux = JSON.parse(contenido);
                console.log()
                if (aux.length > 0) {
                    const addID = aux[aux.length - 1].id + 1; 
                    aux.push({ id: addID, ...nuevoProducto });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }
                else {
                    const addID = 1;
                    aux.push({ id: addID, ...nuevoProducto });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }

            }
        } else {
            console.error("Debe tener todos los campos completos para agregarlo")
        }
    }

    getAllProducts = async () => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        return aux;
    }
    updateProduct = async ({ id, title, description, price, thumbnail, code, stock }) => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        if (aux.some(product => product.id === id)) {
            let pos = aux.findIndex(product => product.id === id)
            if (title.length > 0) {
                aux[pos].title = title;
            }
            if (description.length > 0) {
                aux[pos].description = description;
            }
            if (price.length > 0) {
                aux[pos].price = parseFloat(price);
            }
            if (thumbnail.length > 0) {
                aux[pos].thumbnail = thumbnail;
            }
            if (code.length > 0) {
                aux[pos].code = code;
            }
            if (stock.length > 0) {
                aux[pos].stock = parseInt(stock);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(aux))
            console.log("Producto actualizado exitosamente");
        } else {
            console.log("Producto no encontrado para poder ser actualizado")
        }

    }
    getProductById = async (id) => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        if (aux.some(product => product.id === id)) {
            let pos = aux.findIndex(product => product.id === id)
            return aux[pos];
        } else {
            return console.log("No se encontro el producto");
        }
    }

    deleteProductById = async (id) => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        if (aux.some(product => product.id === id)) {
            const arraySinElIdSeleccionado = aux.filter(product => product.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(arraySinElIdSeleccionado))
            console.log("Producto eliminado");
        } else {
            console.error("No se encontró el producto que queria eliminar")
        }
    }

}


class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const producto1 = new Product("Samsung S20", "Celular Samsung de alta gama", 1000, "https://firebasestorage.googleapis.com/v0/b/electro-shop-67ad8.appspot.com/o/samsung-s20.jpg?alt=media&token=921a4a16-5902-45a7-8988-2b7331e163d3", "aa11", 20);
const producto2 = new Product("Xiaomi Mi-9", "Celular Xiaomi de gama media", 400, "https://firebasestorage.googleapis.com/v0/b/electro-shop-67ad8.appspot.com/o/xiaomi-mi-9.jpg?alt=media&token=83eacc5e-df1d-43d0-81e8-37615787da4b", "aa12", 20);
const producto3 = new Product("Iphone X", "Celular Apple de alta gama", 1000,
    "https://firebasestorage.googleapis.com/v0/b/electro-shop-67ad8.appspot.com/o/iphone-x.jpg?alt=media&token=03cc5f0b-5db6-4b2d-8321-513a70f43294", "aa13", 10);
const producto4 = new Product("Mouse Logitech", "Mouse marca Logitech G502", 500, "https://firebasestorage.googleapis.com/v0/b/electro-shop-67ad8.appspot.com/o/mouse-logitech.jpg?alt=media&token=76519be9-1db0-494e-9370-6d45ec1dc90e", "aa14", 18);
const producto5 = new Product("MacBook", "Laptop marca Apple modelo Mac Air", 2500,
    "https://firebasestorage.googleapis.com/v0/b/electro-shop-67ad8.appspot.com/o/mac-air.jpg?alt=media&token=6baca427-dfd5-4ec5-bbaa-9da1881da99d", "aa15", 5);





const productManager = new ProductManager();

const test = async () => {
    await crearTXT(ruta); // Creo la ruta
    await productManager.addProduct(producto1) //Agregro los productos
    await productManager.addProduct(producto2)
    await productManager.addProduct(producto3)
    await productManager.addProduct(producto4)
    await productManager.addProduct(producto5)
    console.log(await productManager.getAllProducts()); //Llama a todos los productos
    console.log(await productManager.getAllProducts(3)); //Busqueda del producto con el id 3
    console.log(await productManager.getProductById(6)); //No se encuentra un producto inexistente
    //await productManager.deleteProductById(1); //Borra el producto
}

test()
