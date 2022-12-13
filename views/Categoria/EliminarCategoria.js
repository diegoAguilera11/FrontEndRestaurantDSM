import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Pressable, TextInput, Text, Alert, NavigatorIOS } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../../src/components/styles/globalStyles';
import AppContext from '../../src/components/ContextApp';
import { mostrarAlerta } from '../../src/handler/Alerta';
import { app_host } from '../../src/handler/Api';

const EliminarCategoria = ({ navigation }) => {

    const [category_id, setCategory] = useState('');
    const { setConsultarCategoriasAPI, categorias } = useContext(AppContext)

    // Functions
    const volver = () => {
        navigation.navigate('OpcionesCategoria')
    }

    const obtenerCategoria = categoria => {
        setCategory(categoria)
    }


    const categoriaEliminar = () => {
        if (category_id === '') {
            Alert.alert('Error', 'Debes seleccionar una categoría para continuar')
            return
        }
        
        Alert.alert(
            '¿Deseas eliminar esta categoría?',
            'Una categoría eliminada no se puede recuperar',
            [
                { text: 'Cancelar' },
                {
                    text: 'Si, eliminar', onPress: () => {
                        eliminarCategoria();

                    }
                }
            ]
        )
    }

    const eliminarCategoria = async () => {
        let resultadoConsulta;
        const url = `${app_host}/api/categories`;

        try {
            const resultado = await fetch(`${url}/${category_id}`, {
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
            mostrarAlerta(false, 'La categoría no ha podido ser eliminada debido a que pertenece a un producto activo del catálogo')
            return
        }

        mostrarAlerta(true, 'La categoría ha sido eliminada con éxito')
        setCategory('')
        navigation.navigate('OpcionesCategoria')
        setConsultarCategoriasAPI(true)
    }
    return (
        <View style={styles.contenedor}>

            <Pressable style={styles.btnVolver} onPress={() => volver()} >
                <Text style={styles.btnVolverTexto}>Volver</Text>
            </Pressable>

            <View style={styles.formulario}>
                <Text style={styles.label}>Seleccione la categoría a eliminar</Text>
                <Picker selectedValue={category_id} onValueChange={categoria => obtenerCategoria(categoria)}>
                    <Picker.Item label="- Seleccione -" value="" />
                    {categorias.map(categoria => (
                        <Picker.Item key={categoria.id} label={categoria.name} value={categoria.id} />
                    ))}
                </Picker>


                <Pressable style={styles.submitBtn} onPress={() => categoriaEliminar()} >
                    <Text style={styles.submitBtnTexto}>Eliminar Categoría</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#FF6D4C',
    },
    formulario: {
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
    btnVolver: {
        ...globalStyles.btnVolver
    },
    btnVolverTexto: {
        ...globalStyles.btnVolverTexto
    },
    label: {
        color: '#64748B',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 15,
        marginTop: 20
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    submitBtn: {
        backgroundColor: '#E7C90A',
        padding: 15,
        marginTop: 20,
        borderRadius: 10
    },
    submitBtnTexto: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
})

export default EliminarCategoria