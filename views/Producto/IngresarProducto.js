import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Pressable,
    TextInput,
    Alert,
    Image
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import globalStyles from '../../src/components/styles/globalStyles';
import { generarCodigo } from '../../src/helpers';
import AppContext from '../../src/components/ContextApp';
import { mostrarAlerta } from '../../src/handler/Alerta';
import { launchImageLibrary } from 'react-native-image-picker'
import { convertImage } from '../../src/helpers';
import axios from 'axios';
import { parse } from '@babel/core';

const IngresarProducto = ({ navigation }) => {

    const { setConsultarProductosAPI, categorias, producto: productoObj, setProducto: setProductoApp } = useContext(AppContext)
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category_id, setCategory] = useState('');
    const [image, setImage] = useState('https://via.placeholder.com/200');
    const [response, setResponse] = useState('');



    useEffect(() => {
        if (Object.keys(productoObj).length > 0) {
            const { code, name, description, price, category_id, image } = productoObj;
            setCode(code);
            setName(name);
            setDescription(description);
            setPrice(`${price}`);
            setCategory(category_id);
            setImage(convertImage(image));
        }
    }, [productoObj])

    const handleChoosePhoto = () => {
        const options = {
            title: 'Seleccionar Imagen',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        launchImageLibrary(options, response => {

            if (response.errorCode) {
                console.log(response.errorMessage)
            } else if (response.didCancel) {
                console.log('El usuario cancelo la acción')
            } else {
                const path = response.assets[0].uri
                setImage(path)
                console.log(path)
                setResponse(response)
            }

        })
    }

    const uploadImage = async () => {

        const uri = Platform.OS === "android"
            ? response.assets[0].uri
            : image.replace("file://", "");

        const formData = new FormData();

        formData.append("image", {
            uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
        });

        try {
            const { data } = await axios.post('http://192.168.0.7:8000/api/upload', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (!data.isSuccess) {
                alert("Image upload failed!");
                return;
            }
            // alert("Image Uploaded");
            return data;
        } catch (err) {
            console.log(err);
            alert("Algo salio mal...");
        } finally {
            // setImage(data.url)
        }

    }

    const obtenerCategoria = categoria => {
        setCategory(categoria)
    }

    const guardarProducto = async () => {

        //Validación
        if ([name, description, price, category_id].includes('') || image === 'https://via.placeholder.com/200') {
            Alert.alert('Error', 'Todos los campos son obligatorios')
            return
        }

        let uri;

        const contains_image = image.includes('file');
        if (contains_image) {
            const data = await uploadImage();
            uri = data.url
        } else {
            uri = image
        }

        // Generar el producto
        const producto = {
            name,
            description,
            price,
            category_id,
            image: uri
        }
        if (code) {
            // Editar
            await editarProducto(producto);
        } else {
            // Nuevo Producto
            producto.code = generarCodigo();
            // Guardar el producto en la API
            await agregarProducto(producto);
        }

    }

    const agregarProducto = async (producto) => {

        const url = 'http://192.168.0.7:8000/api/products';
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

    };

    const editarProducto = async (producto) => {
        const url = `http://192.168.0.7:8000/api/products/${productoObj.id}`;

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
                    body: JSON.stringify(producto)
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
        if (response.status === 201) {
            console.log(response.errors)
            mostrarAlerta(false, 'Producto error');
        }

        if (response.status === 200) {
            mostrarAlerta(true, 'El producto ha sido agregado con éxito')
            // Redireccionar
            setImage('https://via.placeholder.com/200')
            navigation.navigate('OpcionesAdmin');

            // cambiar a true para refrescar el nuevo producto
            setConsultarProductosAPI(true)

            // Limpiar el formulario
            setCode('')
            setName('');
            setDescription('');
            setPrice('');
            setCategory('');
            setImage('https://via.placeholder.com/200');
        }

        if (response.status === 202) {
            setConsultarProductosAPI(true)
            mostrarAlerta(true, 'El producto ha sido editado con éxito')
            setCode('')
            setName('');
            setDescription('');
            setPrice('');
            setCategory('');
            setImage('https://via.placeholder.com/200');
            setProductoApp({});
            navigation.navigate('OpcionesAdmin')
        }

    }

    const volver = () => {
        navigation.navigate('OpcionesAdmin')

    }
    return (
        <ScrollView style={styles.contenedor}>

            <Pressable style={styles.btnVolver} onLongPress={() => {
                volver();
                setName('');
                setDescription('');
                setPrice('');
                setCategory('');
                setImage('https://via.placeholder.com/200');
                setProductoApp({});

            }}>
                <Text style={styles.btnVolverTexto}>Volver</Text>
            </Pressable>

            <View style={styles.formulario}>

                {Object.keys(productoObj).length === 0 ? <Text style={styles.titulo}>Ingrese los datos del nuevo producto</Text>
                    : <Text style={styles.titulo}>Edite los datos del producto</Text>}
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nombre del producto. ej. Fideos con salsa'
                        mess
                        value={name}
                        onChangeText={texto => setName(texto)}
                    />
                    {/* <Text>Campo requerido</Text> */}
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        style={[styles.input, styles.descripcionInput]}
                        placeholder='Ingresa la descripción del producto'
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={texto => setDescription(texto)}
                        value={description}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Precio</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='2000'
                        keyboardType='numeric'
                        value={price}
                        onChangeText={setPrice}
                    />
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Categoría Producto</Text>
                    <View style={styles.input}>
                        <Picker selectedValue={category_id} onValueChange={categoria => obtenerCategoria(categoria)}>
                            <Picker.Item label="- Seleccione -" value="" />
                            {categorias.map(categoria => (
                                <Picker.Item key={categoria.id} label={categoria.name} value={categoria.id} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Imagen</Text>

                    <View style={styles.campoImagen}>
                        <Pressable style={styles.btnAgregarImagen} onPress={() => handleChoosePhoto()}>
                            <Text style={styles.btnImagenTexto}>Agregar Imagen</Text>
                        </Pressable>
                        <Image
                            style={{ alignSelf: 'center', height: 100, width: 100, borderRadius: 10, marginLeft: 20 }}
                            source={{ uri: image }}
                        />
                    </View>

                </View>

                <Pressable style={styles.submitBtn} onPress={() => guardarProducto()}>
                    <Text style={styles.submitBtnTexto}>{productoObj.id ? 'Editar Producto' : 'Agregar Producto'}</Text>
                </Pressable>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#DA6B45'
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
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 15
    },
    label: {
        color: '#FF7903',
        fontWeight: '900',
        textTransform: 'uppercase',
        fontSize: 15
    },
    input: {
        backgroundColor: '#C5C2B8',
        borderRadius: 20,
        padding: 15,
        marginTop: 10,
    },
    campo: {
        marginBottom: 10
    },
    campoImagen: {
        flexDirection: 'row',
        alignItems: 'center'
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
    btnCancelar: {
        backgroundColor: '#F1B111',
        paddingVertical: 20,
        paddingHorizontal: 100,
        borderRadius: 10,
        marginTop: 15,
        marginHorizontal: 10,
    },
    btnCancelarTexto: {
        textAlign: 'center',
        fontSize: 15,
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    descripcionInput: {
        height: 100
    },
    btnVolver: {
        ...globalStyles.btnVolver
    },
    btnVolverTexto: {
        ...globalStyles.btnVolverTexto
    },
    btnAgregarImagen: {
        backgroundColor: '#FFC500',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10
    },
    btnImagenTexto: {
        textTransform: 'uppercase',
        color: '#000',
        fontWeight: 'bold',
        fontSize: 15
    }
})

export default IngresarProducto;