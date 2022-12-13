import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../../src/components/styles/globalStyles'
import Producto from '../../src/components/Producto'
import { Separator } from 'native-base'

const Menu = ({ productos, productoEditar, productoEliminar, setProducto, categorias }) => {

    const searchCategory = (item) => {
        const result = categorias.find(categoria => categoria.id === item.category_id);
        return result;
    }
    return (
        <View style={styles.contenedor}>
            {productos.length === 0 ? <Text style={styles.noProductos}>No hay productos registrados</Text> :
                <FlatList
                    data={productos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Producto
                                item={item}
                                productoEditar={productoEditar}
                                productoEliminar={productoEliminar}
                                setProducto={setProducto}
                                categoria={searchCategory(item)}
                            />
                        )
                    }}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#E1E1D7',
        marginHorizontal: 20,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 30,
    },
    btn: {
        backgroundColor: '#EEFF03',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'flex-start',
        marginLeft: 10,
        marginRight: 180,
        marginBottom: 20
    },
    btnTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#353130',
        textAlign: 'center'
    },
    btnVolver: {
        ...globalStyles.btnVolver
    },
    btnVolverTexto: {
        ...globalStyles.btnVolverTexto
    },
    btnCategoria: {
        backgroundColor: '#9D0D04',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    btnCategoriaTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    btnn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    noProductos: {
        marginTop: 20,
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default Menu