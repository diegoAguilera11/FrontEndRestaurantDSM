import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native'
import AppContext from '../../src/components/ContextApp'
import ProductoOrden from '../../src/components/Orden/ProductoOrden'
import { formatearCantidad } from '../../src/helpers'
import { mostrarAlerta } from '../../src/handler/Alerta'
import globalStyles from '../../src/components/styles/globalStyles'
import { generarCodigo } from '../../src/helpers'
import { app_host } from '../../src/handler/Api'

const DetalleOrden = ({ navigation }) => {
    const { productosOrden, setProductosOrden, productos, table, ordenEnviada, setOrdenEnviada } = useContext(AppContext);
    const [infoProducto, setInfoProducto] = useState({});

    const ingresarOrden = async () => {
        const calculoTotal = total();

        const orden = {
            code: generarCodigo(),
            date: '',
            total: calculoTotal,
            status: 'CONFIRMADO',
            tables_id: table
        }

        const url = `${app_host}/api/orders`;
        try {
            await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(orden)
                },
            )
                .then((res) => res.json())
                .catch((error) => console.log(error))
                .then((response) => respuesta(response));
        } catch (e) {
            console.log(e);
        }

    }

    const respuesta = (response) => {
        const errors = response.errors;
        if (response.status === 200) {

            ingresarDetalle(response.order.id);
            setOrdenEnviada(response.order);
            setProductosOrden([]);
            // Redireccionar
            navigation.navigate('EstadoOrden');
        }
    }

    const ingresarDetalle = async (id_order) => {

        productosOrden.forEach(producto => {

            const { unit_price, quantity, product_id } = producto;
            const productoDetalle = {
                unit_price,
                quantity,
                order_id: id_order,
                product_id,
            }
            ingresoUnitario(productoDetalle);
        });
    }

    const ingresoUnitario = async (producto) => {

        const url = `${app_host}/api/detailOrders`;
        try {
            await fetch(
                url,
                {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(producto)
                },
            )
                .then((res) => res.json())
                .catch((error) => console.log(error))
                .then((response) => respuesta(response));
        } catch (e) {
            console.log(e);
        }
    }

    const total = () => {
        let calculoTotal = 0;
        productosOrden.map(producto => {
            const { infoProduct } = producto;
            calculoTotal += producto.quantity * infoProduct[0].price;
        })
        return calculoTotal;
    }

    const eliminarProductoOrden = (item) => {
        const id = item.product_id;
        const productosOrdenActualizados = productosOrden.filter(producto => producto.product_id != id);

        Alert.alert(
            `¿Deseas eliminar ${item.infoProduct[0].name} de la orden?`,
            'Una producto de la orden no puede ser recuperado',
            [
                { text: 'Cancelar' },
                {
                    text: 'Si, eliminar', onPress: () => {
                        setProductosOrden(productosOrdenActualizados)
                        mostrarAlerta('Exito', 'el producto fue eliminado de la orden')
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorProductos}>
                {productosOrden.length === 0 ? <Text style={styles.noProductos}>Tu carrito esta vacio...</Text> :
                    <FlatList
                        data={productosOrden}
                        keyExtractor={(item) => item.product_id}
                        renderItem={({ item }) => {
                            return (
                                <ProductoOrden
                                    item={item}
                                    eliminarProductoOrden={eliminarProductoOrden}
                                />
                            )
                        }}
                    />
                }
            </View>
            <View style={styles.contenedorButton}>
                {productosOrden.length > 0 &&
                    <View>
                        <Text style={styles.totalTexto}>Total: {formatearCantidad(total())}</Text>
                    </View>
                }

                {productosOrden.length > 0 &&

                    <View>
                        <Pressable style={styles.btnOrden} onPress={() => ingresarOrden()}>
                            <Text style={styles.btnOrdenTexto}>Enviar Orden</Text>
                        </Pressable>
                    </View>}
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#C6C3C3'
    },
    btnOrden: {
        backgroundColor: '#149E84',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginHorizontal: 50,
        marginVertical: 10
    },
    btnOrdenTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    totalTexto: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    noProductos: {
        marginTop: 20,
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contenedorProductos: {
        flex: 1,
    },
    contenedorButton: {
        backgroundColor: '#B6DCD5'
    },
})

export default DetalleOrden