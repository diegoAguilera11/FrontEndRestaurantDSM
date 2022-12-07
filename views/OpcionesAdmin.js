import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Pressable, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../src/components/styles/globalStyles'
import Menu from './Menu'
import AppContext from '../src/components/ContextApp'
import { mostrarAlerta } from '../src/handler/Alerta'


const OpcionesAdmin = ({ navigation }) => {

    // Props
    const { categorias, setCategorias, productos, setProductos, producto, setProducto, setConsultarProductosAPI } = useContext(AppContext)
    const [desplegar, setDesplegar] = useState(false);


    // Functions
    const volver = () => {
        navigation.navigate('Inicio')
    }

    const visitarIngresarProducto = () => {
        setDesplegar(false)
        navigation.navigate('IngresarProducto')
    }

    const visitarOpcionesCategoria = () => {
        navigation.navigate('OpcionesCategoria')
    }

    const desplegarLista = () => {
        setDesplegar(!desplegar);
    }

    const productoEditar = id => {
        setDesplegar(false);
        const productoEditar = productos.filter(producto => producto.id === id)
        setProducto(productoEditar[0]);
        visitarIngresarProducto();
    }

    const productoEliminar = id => {
        Alert.alert(
            '¿Deseas eliminar este producto?',
            'Un producto eliminado no puede ser recuperado',
            [
                { text: 'Cancelar' },
                {
                    text: 'Si, eliminar', onPress: () => eliminarProducto(id)
                }
            ]
        )
    }

    const eliminarProducto = async (id) => {
        let resultadoConsulta;
        const url = 'http://192.168.0.7:8000/api/products';

        try {
            const resultado = await fetch(`${url}/${id}`, {
                method: 'DELETE'
            });

            console.log(resultado.ok)
            if (resultado.ok) {
                resultadoConsulta = resultado.ok
            }

        } catch (error) {
            console.log(error);
        }

        // Verificar validacion para cuando se coloca un nombre ya existente en cateogrias
        if (!resultadoConsulta) {
            mostrarAlerta(false, 'El producto no ha podido ser eliminado')
            return
        }

        mostrarAlerta(true, 'El producto ha sido eliminado con éxito')
        setConsultarProductosAPI(true)
    }


    return (
        <View style={styles.contenedor}>

            <Pressable style={styles.btnVolver} onPress={() => volver()} >
                <Text style={styles.btnVolverTexto}>Volver</Text>
            </Pressable>

            <View style={styles.contenedorTitulo}>
                <Text style={styles.titulo}>Bienvenido Administrador</Text>
            </View>

            <View style={styles.contenedorSubTitulo}>
                <Text style={styles.subtitulo}>¿Qué deseas hacer?</Text>
            </View>

            <View style={styles.btnAlinear}>
                <Pressable style={styles.btnCategoria} onPress={() => visitarOpcionesCategoria()} >
                    <Text style={styles.btnCategoriaTexto}> Categoría </Text>
                </Pressable>

                <Pressable style={styles.btnAgregarProducto} onPress={() => visitarIngresarProducto()} >
                    <Text style={styles.btnCategoriaTexto}> Producto </Text>
                </Pressable>
            </View>

            <Pressable style={!desplegar ? styles.btnDesplegarActivo : styles.btnDesplegarInactivo} onPress={() => desplegarLista()} >
                {!desplegar ? <Text style={styles.btnCategoriaTexto}> Desplegar Productos + </Text> :
                    <Text style={styles.btnCategoriaTexto}> Ocultar Productos - </Text>
                }
            </Pressable>

            {desplegar ? <Menu
                productos={productos}
                setProductos={setProductos}
                setProducto={setProducto}
                productoEditar={productoEditar}
                productoEliminar={productoEliminar}
                categorias={categorias}
            /> : ''}

        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#FFBE4C'
    },
    titulo: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'James-Stroker',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#FFF'
    },
    subtitulo: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: '#FFF'
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
        paddingHorizontal: 30,
    },
    btnCategoriaTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    btnAgregarProducto: {
        backgroundColor: '#9D0D04',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    btnAgregarProductoTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    btnProducto: {
        backgroundColor: '#9D0D04',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    btnProductoTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    btnDesplegarActivo: {
        backgroundColor: '#EB4237',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 30,
        marginHorizontal: 20
    },
    btnDesplegarInactivo: {
        backgroundColor: '#9D0D04',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 30,
        marginHorizontal: 20
    },
    btnDesplegarTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    btnAlinear: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    noProductos: {
        marginTop: 20,
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contenedorTitulo: {
        backgroundColor: '#EB4237',
        marginHorizontal: 10,
        marginTop: 20,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        marginBottom: 20
    },
    contenedorSubTitulo: {
        backgroundColor: '#EA645C',
        marginHorizontal: 80,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        marginBottom: 20
    },
})

export default OpcionesAdmin