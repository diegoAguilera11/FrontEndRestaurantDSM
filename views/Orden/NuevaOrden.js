import React, { useContext, useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, Pressable } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Button, FAB } from 'react-native-paper'
import AppContext from '../../src/components/ContextApp';
import ProductoMenu from '../../src/components/ProductoMenu';

const NuevaOrden = ({ navigation }) => {
    const { table, categorias, setCategorias, productos, setProductos, productoSeleccionado, setproductoSeleccionado } = useContext(AppContext)
    const [category_id, setCategory] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
    const [defaultProducts, setDefaultProducts] = useState(true);

    useEffect(() => {

        const obtenerCategoriasAPI = () => {
            setCategoriaSeleccionada(productos)
            setDefaultProducts(false);
        }

        if (defaultProducts) {
            obtenerCategoriasAPI();
        }

    }, [productos]);

    const volver = () => {
        navigation.goBack()
    }

    const visitarDetalleOrden = () => {
        navigation.navigate('DetalleOrden')
    }
    const obtenerCategoria = categoria => {
        setCategory(categoria)
        cargarProductos(categoria);
    }

    const cargarProductos = (categoria) => {
        console.log(categoria)
        if (categoria === '') {
            setCategoriaSeleccionada(productos)
            return
        }
        const productosSeleccionado = productos.filter(producto => producto.category_id === categoria);
        setCategoriaSeleccionada(productosSeleccionado)
    }

    const detalleProducto = (id) => {
        const productoSeleccionado = productos.filter(producto => producto.id === id)
        setproductoSeleccionado(productoSeleccionado[0])
        navigation.navigate('DetalleProducto');
    }

    return (
        <View style={styles.contenedor}>
            <View style={styles.contenedorBienvenida}>
                <Text style={styles.text}>Bienvenido Usuario de la Mesa {table}</Text>
            </View>
            <View style={styles.contenedorCategorias}>
                <Text style={styles.label}>Elige una categoría</Text>
                <Picker selectedValue={category_id} onValueChange={categoria => obtenerCategoria(categoria)}>
                    <Picker.Item label="- Seleccione -" value="" />
                    {categorias.map(categoria => (
                        <Picker.Item key={categoria.id} label={categoria.name} value={categoria.id} />
                    ))}
                </Picker>
            </View>
            <View style={styles.contenedorProductos}>
                {categoriaSeleccionada.length === 0 ? <Text style={styles.noProductos}>No hay productos registrados</Text> :
                    <FlatList
                        data={categoriaSeleccionada}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <ProductoMenu
                                    item={item}
                                    detalleProducto={detalleProducto}
                                />
                            )
                        }}
                    />
                }
            </View>

            <FAB
                style={styles.fab}
                onPress={() => visitarDetalleOrden()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
    },
    contenedorBienvenida: {
        backgroundColor: '#149E84',
        marginHorizontal: 10,
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    contenedorCategorias: {
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        marginVertical: 20,
        borderRadius: 10,
        paddingVertical: 35,
        paddingHorizontal: 20,
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    contenedorProductos: {
        backgroundColor: '#29C0A4',
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 20,
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        flex: 1,
    },
    contenedorPedido: {
        backgroundColor: '#29C0A4',
        marginHorizontal: 20,
        marginVertical: 20,
        borderRadius: 10,
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    btnVolver: {

    },
    btnVolverTexto: {

    },
    text: {
        color: '#000',
        fontSize: 30,
        fontWeight: '800',
        textAlign: 'center',
    },
    noProductos: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold'
    },
    label: {
        color: '#000',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: 15
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20
    }
})
export default NuevaOrden;