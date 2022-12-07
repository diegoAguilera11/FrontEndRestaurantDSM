import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Pressable, TextInput, Text, Alert, NavigatorIOS } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../../src/components/styles/globalStyles';
import AppContext from '../../src/components/ContextApp';
import { mostrarAlerta } from '../../src/handler/Alerta';

const EditarCategoria = ({ navigation }) => {

    const [name, setName] = useState('');
    const [category_id, setCategory] = useState('');
    const { setConsultarCategoriasAPI, categorias } = useContext(AppContext)
    const [nameCategoryError, setNameCategoryError] = useState('');
    const [selectCategoryError, setCategoryError] = useState('');


    // Functions
    const volver = () => {
        navigation.navigate('OpcionesCategoria')
    }

    const obtenerCategoria = categoria => {
        setCategory(categoria)
    }

    const editarCategoria = async () => {

        const categoria = {
            name
        }

        // Validacion
        if (category_id === '') {
            Alert.alert('Error', 'Debes seleccionar una categoría para continuar')
            return
        }

        const url = `http://192.168.0.7:8000/api/categories/${category_id}`;
        try {
            await fetch(
                url,
                {
                    method: "PUT",
                    mode: "no-cors",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(categoria)
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


        // a syntax error occurred - name already taken
        if (response.status === 400) {
            setNameCategoryError(errors.name[0])
            // mostrarAlerta(false, errors.name[0]);
        }

        if (response.status === 201) {
            mostrarAlerta(true, 'La categoría ha sido editada con éxito')
            // Redireccionar
            setCategory('')
            navigation.navigate('OpcionesCategoria')
            setConsultarCategoriasAPI(true)
        }
    }

    return (
        <View style={styles.contenedor}>
            <Pressable style={styles.btnVolver} onPress={() => volver()} >
                <Text style={styles.btnVolverTexto}>Volver</Text>
            </Pressable>

            <View style={styles.formulario}>
                <Text style={styles.label}>Seleccione la categoría a cambiar</Text>
                <Picker selectedValue={category_id} onValueChange={categoria => obtenerCategoria(categoria)}>
                    <Picker.Item label="- Seleccione -" value="" />
                    {categorias.map(categoria => (
                        <Picker.Item key={categoria.id} label={categoria.name} value={categoria.id} />
                    ))}
                </Picker>
                <View>
                    <Text style={styles.label}>Nombre de la nueva Categoría</Text>
                    <TextInput
                        style={styles.input}
                        label="Nombre"
                        placeholder='Ingresa el nombre de la categoría'
                        onChangeText={texto => setName(texto)}
                        value={name}
                    />
                    {nameCategoryError.length > 0 && <Text style={{ color: 'red' }}>{nameCategoryError}</Text>}
                </View>
                <Pressable style={styles.submitBtn} onPress={() => editarCategoria()}>
                    <Text style={styles.submitBtnTexto}>Editar Categoría</Text>
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


export default EditarCategoria