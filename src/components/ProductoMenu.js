import React from 'react'
import { View, StyleSheet, Text, Pressable, Image } from 'react-native'
import { formatearCantidad } from '../helpers';
import { convertImage } from '../helpers';

const ProductoMenu = ({ item, productoEditar, productoEliminar, detalleProducto }) => {
    const { code, name, description, price, category_id, image, id } = item;

    return (
        <Pressable onLongPress={() => detalleProducto(id)}>
            <View style={styles.contenedor}>
                <View style={styles.contenedorFlatList}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.texto}>Codigo Producto: {code}</Text>
                        <Text style={styles.texto}>Nombre Producto: {name}</Text>
                        <Text style={styles.texto}>Precio Producto: {formatearCantidad(price)}</Text>
                    </View>
                    <Image style={styles.imagen} source={{ uri: convertImage(item.image) }} />
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#DA6B45',
        padding: 10,
        borderBottomColor: '#94a3B8',
        borderBottomWidth: 1,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
    },
    label: {
        color: '#374151',
        textTransform: 'uppercase',
        fontWeight: '700'
    },
    texto: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
        fontSize: 15
    },
    btnAlinear: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    btnEditar: {
        backgroundColor: '#9D0D04',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    btnEditarTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    btnEliminar: {
        backgroundColor: '#9D0D04',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    btnEliminarTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    imagen: {
        width: 100,
        height: 100,
        borderRadius: 20
    },
    contenedorFlatList: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default ProductoMenu