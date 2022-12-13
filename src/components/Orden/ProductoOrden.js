import React from 'react'
import { View, StyleSheet, Text, Pressable, Image } from 'react-native'
import { convertImage, formatearCantidad } from '../../helpers';


const ProductoOrden = ({ item, eliminarProductoOrden }) => {
    const { quantity, infoProduct, product_id } = item;
    return (
        <View style={styles.contenedor}>
            <Image style={styles.imagen} source={{ uri: convertImage(item.infoProduct[0].image) }} />
            <View style={styles.contenedorInfo}>
                <Text style={styles.texto}>{infoProduct[0].name}</Text>
                <Text style={styles.texto}>Cantidad: <Text style={styles.textoContenido}>{quantity}</Text></Text>
                <Text style={styles.texto}>Precio: <Text style={styles.textoContenido}>{formatearCantidad(quantity * infoProduct[0].price)}</Text></Text>
                <Text style={styles.texto}>Stock: <Text style={styles.textoContenido}>{infoProduct[0].stock}</Text></Text>
            </View>

            <View style={styles.contenedorButton}>
                <Pressable onPress={() => eliminarProductoOrden(item)} style={styles.btnEliminar}>
                    <Text style={styles.btnEliminarTexto}>X</Text>
                </Pressable>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        // backgroundColor: '#C6C3C3',
        borderBottomWidth: 1,
        borderColor: '#DCDCDC',
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    contenedorButton: {
        // flex: 1,
        // marginLeft: 30,
    },
    contenedorInfo: {
        flex: 1,
    },
    texto: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 16
    },
    textoContenido: {
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 18
    },
    textoPrecio: {
        color: '#fff',
        fontWeight: '700',
        marginBottom: 10,
        fontSize: 15,
        alignSelf: 'flex-end'
    },
    btnEliminar: {
        backgroundColor: '#9D0D04',
        borderRadius: 2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
        // marginVertical: 10,
        // marginHorizontal: 30,
    },
    btnEliminarTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    },
    imagen: {
        width: 80,
        height: 60,
        marginRight: 10,
    }
})

export default ProductoOrden