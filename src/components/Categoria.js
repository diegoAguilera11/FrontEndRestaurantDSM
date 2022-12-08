import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Pressable, TextInput, Text, Alert } from 'react-native'
import globalStyles from './styles/globalStyles';
import AppContext from './ContextApp';
import { mostrarAlerta } from '../handler/Alerta';
import { app_host } from '../handler/Api';

const Categoria = ({ navigation }) => {

    const { setConsultarCategoriasAPI } = useContext(AppContext)
    const [name, setName] = useState('');
    const [nameCategoryError, setNameCategoryError] = useState('');

    const volver = () => {
        navigation.navigate('OpcionesCategoria')
    }

    // Almacenar categoria en la BD
    const guardarCategoria = async () => {
        const url = `${app_host}/api/categories`;
        const categoria = {
            name
        }

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
                    body: JSON.stringify(categoria)
                },
            )
                .then((res) => res.json())
                .catch((error) => console.log(error))
                .then((response) => respuesta(response));
        } catch (e) {
            console.log(e);
        }

    };

    const respuesta = (response) => {
        // console.log(response)
        const errors = response.errors;
        console.log()
        if (response.status === 400) {
            setNameCategoryError(errors.name[0])
            return
        }

        mostrarAlerta(true, 'La categoría ha sido agregada con éxito')
        setName('')
        navigation.navigate('OpcionesCategoria')
        setConsultarCategoriasAPI(true)

    }

    return (
        <View style={styles.contenedor}>
            <Pressable style={styles.btnVolver} onPress={() => volver()} >
                <Text style={styles.btnVolverTexto}>Volver</Text>
            </Pressable>

            <View style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Nombre de la Categoría</Text>
                    <TextInput
                        style={styles.input}
                        label="Nombre"
                        placeholder='Ingresa el nombre de la categoría'
                        onChangeText={texto => setName(texto)}
                        value={name}
                    />
                    {nameCategoryError.length > 0 && <Text style= {{color: 'red'}}>{nameCategoryError}</Text>}
                </View>

                <Pressable style={styles.submitBtn} onPress={() => guardarCategoria()}>
                    <Text style={styles.submitBtnTexto}>Agregar Categoría</Text>
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
        fontSize: 15
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

export default Categoria