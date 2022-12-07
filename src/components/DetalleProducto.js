import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Pressable, Text, Image, Alert } from 'react-native'
import { mostrarAlerta } from '../handler/Alerta'
import { convertImage } from '../helpers'
import { formatearCantidad } from '../helpers'
import AppContext from './ContextApp'

const DetalleProducto = ({ navigation }) => {
    const { productoSeleccionado, setproductoSeleccionado, productosOrden, setProductosOrden, productos } = useContext(AppContext);
    const { id, code, name, description, price, image, category_id } = productoSeleccionado;
    const [contador, setContador] = useState(1);
    const [priceOrder, setPriceOrder] = useState(price);


    const sumar = () => {
        setContador(contador + 1)
        setPriceOrder(priceOrder + price)
    }

    const restar = () => {

        if (contador === 1) {
            return
        }
        setContador(contador - 1)
        setPriceOrder(priceOrder - price)
    }
    const buscarInfoProducto = (id) => {
        const productoInfo = productos.filter(producto => producto.id === id);
        return productoInfo;
    }

    const agregarProductoCarrito = () => {

        const productoNew = {
            unit_price: price,
            quantity: contador,
            product_id: id,
            infoProduct: buscarInfoProducto(id)
        }

        const busquedaproductoSeleccionado = productosOrden.some(producto => producto.product_id === id);

        if (busquedaproductoSeleccionado) {
            const productosActualizados = productosOrden.map(producto => producto.product_id === id ? productoNew : producto);
            setProductosOrden(productosActualizados);
            navigation.navigate('NuevaOrden');
            return
        } else {
            // Agrega el producto al carrito
            setProductosOrden([...productosOrden, productoNew]);
            mostrarAlerta('Exito', 'El producto fue agregado a la orden');
            navigation.navigate('NuevaOrden');
        }
    }

    return (
        <View style={styles.contenedor}>

            <Image style={styles.imagen} source={{ uri: convertImage(image)}} />

            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.price}>{formatearCantidad(price)} c/u</Text>

            <View style={styles.contenedorQuantity}>
                <View style={styles.contenedorButton}>

                    <Pressable style={styles.botonPress} onPress={() => restar()}>
                        <Text style={styles.botonPressTexto}>-</Text>
                    </Pressable>

                    <Text style={styles.quantity}>{contador}</Text>

                    <Pressable style={styles.botonPress} onPress={() => sumar()}>
                        <Text style={styles.botonPressTexto}>+</Text>
                    </Pressable>
                </View>

                <Text style={styles.totalProduct}>{formatearCantidad(priceOrder)}</Text>

            </View>

            <Pressable style={styles.botonOrden} onPress={() => agregarProductoCarrito()}>
                <Text style={styles.botonOrdenTexto}>AGREGAR A LA ORDEN</Text>
            </Pressable>

        </View>
    )
}
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        alignItems: 'center'
    },
    contenedorButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contenedorQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    botonPress: {
        backgroundColor: '#F57904',
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 15,
        paddingVertical: 15,
        paddingHorizontal: 25
    },
    botonPressTexto: {
        fontSize: 20,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: '#FFF'
    },
    botonOrden: {
        backgroundColor: '#29C0A4',
        borderRadius: 20,
        marginHorizontal: 20,
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    botonOrdenTexto: {
        fontSize: 20,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: '#FFF'
    },

    name: {
        fontSize: 30,
        fontWeight: '800',
        color: '#000',
        fontFamily: 'Caramel-and-Vanilla',
        marginBottom: 20
    },

    description: {
        fontSize: 15,
        textAlign: 'justify',
        marginHorizontal: 20,
        marginBottom: 20
    },
    price: {
        fontSize: 25,
        fontWeight: '700',
        color: '#000',
        fontFamily: 'Caramel-and-Vanilla',
        marginBottom: 50
    },
    imagen: {
        width: 250,
        height: 200,
        marginVertical: 30,
        borderRadius: 10
    },
    quantity: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000'
    },
    totalProduct: {
        fontSize: 30,
        fontWeight: '800',
        color: '#000',
        fontFamily: 'Caramel-and-Vanilla',
        marginVertical: 20
    },

});
export default DetalleProducto