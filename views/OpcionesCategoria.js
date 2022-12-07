import React, { useState, useContext } from 'react'
import { Text, StyleSheet, View, Pressable, Alert } from 'react-native'
import globalStyles from '../src/components/styles/globalStyles'
import { Picker } from '@react-native-picker/picker'
import AppContext from '../src/components/ContextApp'

const OpcionesCategoria = ({ navigation }) => {

    const { setConsultarCategoriasAPI, categorias } = useContext(AppContext)
    const [category_id, setCategory] = useState('');


    const obtenerCategoria = categoria => {
        setCategory(categoria)
    }

    // Functions
    const volver = () => {
        navigation.navigate('OpcionesAdmin')
    }

    const visitarAgregarCategoria = () => {
        navigation.navigate('AgregarCategoria')
    }

    const visitarEditarCategoria = () => {
        navigation.navigate('EditarCategoria')
    }

    const visitarEliminarCategoria = () => {
        navigation.navigate('EliminarCategoria')
    }

    return (
        <View style={styles.contenedor}>

            <Pressable style={styles.btnVolver} onPress={() => volver()} >
                <Text style={styles.btnVolverTexto}>Volver</Text>
            </Pressable>

            <Text style={styles.titulo}>Selecciona una acción  a realizar</Text>

            <View style={styles.formulario}>
            <Pressable style={styles.btnOpcion} onPress={() => visitarAgregarCategoria()} >
                <Text style={styles.btnOpcionTexto}>Agregar Categoría</Text>
            </Pressable>

            <Pressable style={styles.btnOpcion} onPress={() => visitarEditarCategoria()} >
                <Text style={styles.btnOpcionTexto}>Editar Categoría</Text>
            </Pressable>

            <Pressable style={styles.btnOpcion} onPress={() => visitarEliminarCategoria()} >
                <Text style={styles.btnOpcionTexto}>Eliminar Categoría</Text>
            </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#FF6D4C',
        alignItems: 'stretch'
    },
    titulo: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginTop: 30,
        marginBottom: 20,
        color: '#FFF',
    },
    btnVolver: {
        ...globalStyles.btnVolver
    },
    btnVolverTexto: {
        ...globalStyles.btnVolverTexto
    },
    btnOpcion: {
        backgroundColor: '#B51C12',
        borderRadius: 10,
        paddingVertical: 15,
        marginVertical: 20,
        marginHorizontal: 50
    },
    btnOpcionTexto: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    formulario: {
        backgroundColor: '#FFF',
        marginHorizontal: 25,
        marginVertical: 20,
        borderRadius: 10,
        paddingVertical: 35,
        shadowOpacity: 0.43,
        shadowRadius: 9.11,
        shadowColor: '#000',
        elevation: 8,
    },
})

export default OpcionesCategoria