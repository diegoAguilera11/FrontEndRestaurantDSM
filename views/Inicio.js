import React, { useState, useContext } from 'react';
import { Text, StyleSheet, View, Button, Modal, SafeAreaView } from 'react-native'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import IngresarProducto from './Producto/IngresarProducto';
import SeleccionMesa from './SeleccionMesa';
import AppContext from '../src/components/ContextApp';

const Inicio = ({ navigation }) => {

    const { table, setTable } = useContext(AppContext);

    const visitarOpcionesAdministrador = () => {
        navigation.navigate('OpcionesAdmin')
    }

    const visitarSeleccionMesa = () => {

        setTable('')
        navigation.navigate('SeleccionMesa')
    }

    return (
        <SafeAreaView style={styles.contenedor}>
            <View>
                <Text style={styles.titulo}>Bienvenido a Restaurant APP</Text>
                <View>
                    <Pressable
                        style={styles.btn}
                        onPress={() => visitarOpcionesAdministrador()}
                    >
                        <Text style={styles.btnTexto}>Administrador</Text>
                    </Pressable>

                    <Pressable
                        style={styles.btn}
                        onPress={() => visitarSeleccionMesa()}
                    >
                        <Text style={styles.btnTexto}>Cliente</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#000'}}>RESTAURANT APP - Todos los derechos reservados {new Date().getFullYear()}</Text>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#DA6B45',
        flexDirection: 'column'
    },
    titulo: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 60,
        color: '#000',
        fontFamily: 'James-Stroker'
    },
    btn: {
        marginBottom: 20,
        backgroundColor: '#F1B111',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 40
    },
    btnTexto: {
        fontSize: 25,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#353130'
    },
    label: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 15,
        textTransform: 'uppercase',
        color: '#1E1D1D',
        fontWeight: 'bold'
    },
    footer: {
        position: 'absolute',
        flex: 0.1,
        bottom: -10,
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        marginHorizontal: 10
    }
})

export default Inicio;