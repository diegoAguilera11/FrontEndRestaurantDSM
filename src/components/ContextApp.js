import { createContext, useState, useEffect } from 'react'

const AppContext = createContext()

export function RestaurantProvider({ children }) {
    //usestate
    const [categorias, setCategorias] = useState([]); // Almacena todas las categorias que estan ingresadas en la BD
    const [consultarCategoriasAPI, setConsultarCategoriasAPI] = useState(true);
    const [consultarProductosAPI, setConsultarProductosAPI] = useState(true);
    const [consultarAPImesas, SetconsultarAPImesas] = useState(true);
    const [producto, setProducto] = useState({}); // Seleccion de producto por el administrador
    const [productoSeleccionado, setproductoSeleccionado] = useState({}); // Seleccion del producto seleccionado por el cliente
    const [productos, setProductos] = useState([]); // Almacena todos los productos que estan ingresados en la BD
    const [table, setTable] = useState('');
    const [tables, setTables] = useState([]); // Almacena todas las mesas que estan ingresados en la BD
    const [productosOrden, setProductosOrden] = useState([]);
    const [ordenEnviada, setOrdenEnviada] = useState({});


    useEffect(() => {

        const obtenerCategoriasAPI = async () => {

            try {
                if (Platform.OS === "android") {
                    // Local host del equipo.. ANDROID
                    // const url = 'http://192.168.0.2:3000/category';

                    // host del BackEnd
                    const url = 'http://192.168.0.7:8000/api/categories';
                    const resultado = await fetch(url);
                    const categoriasResultado = await resultado.json();
                    setCategorias(categoriasResultado)

                } else {
                    // Local host de la api.. IOS
                    const url = 'http://localhost:8000/categories';
                    const resultado = await fetch(url);
                    const categoriasResultado = await resultado.json();
                    setCategorias(categoriasResultado)
                }
                setConsultarCategoriasAPI(false);
            } catch (error) {
                // console.log(error)
            }

        }

        if (consultarCategoriasAPI) {
            obtenerCategoriasAPI();
        }

    }, [consultarCategoriasAPI]);

    useEffect(() => {
        const obtenerProductosAPI = async () => {
            try {
                if (Platform.OS === "android") {
                    // Local host del equipo.. ANDROID
                    // const url = 'http://192.168.0.2:3000/product';

                    // host del BackEnd
                    const url = 'http://192.168.0.7:8000/api/products';
                    const resultado = await fetch(url);
                    const productos = await resultado.json();
                    setProductos(productos)
                    setConsultarProductosAPI(false)

                } else {
                    // Local host de la api.. IOS
                    const url = 'http://localhost:3000/product';
                    const resultado = await fetch(url);
                    const productos = await resultado.json();
                    setProductos(productos)
                    setConsultarProductosAPI(false)
                }
            } catch (error) {
                // console.log(error)
            }
        }

        if (consultarProductosAPI) {
            obtenerProductosAPI();
        }


    }, [consultarProductosAPI]);

    useEffect(() => {

        const obtenerMesasAPI = async () => {

            try {
                if (Platform.OS === "android") {
                    // Local host del equipo.. ANDROID
                    // const url = 'http://192.168.0.2:3000/table';

                    // host del BackEnd
                    const url = 'http://192.168.0.7:8000/api/tables';
                    await fetch(url)
                        .then(respuesta => respuesta.json())
                        .then(resultado => {
                            // console.log(resultado)
                            setTables(resultado)
                            return resultado
                        })
                } else {
                    // Local host de la api.. IOS
                    const url = 'http://localhost:3000/table';
                    fetch(url)
                        .then(respuesta => respuesta.json())
                        .then(resultado => {
                            return resultado
                        })
                }

            } catch (error) {
                // console.log(error)
            }
        }

        obtenerMesasAPI();

    }, [consultarAPImesas]);

    return (
        <AppContext.Provider value={{
            categorias, setCategorias, productos, setProductos, setConsultarProductosAPI,
            setConsultarCategoriasAPI, table, setTable, consultarAPImesas,
            SetconsultarAPImesas, tables, setTables, producto, setProducto, productoSeleccionado,
            setproductoSeleccionado, productosOrden, setProductosOrden, ordenEnviada, setOrdenEnviada
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;