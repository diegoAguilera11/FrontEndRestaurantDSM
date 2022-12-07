import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, Text, Pressable } from 'react-native';
import globalStyles from '../src/components/styles/globalStyles';
import { Picker } from '@react-native-picker/picker'
import getMesas from '../src/handler/Api';
import { mostrarAlerta } from '../src/handler/Alerta';
import AppContext from '../src/components/ContextApp';

const SeleccionMesa = ({ navigation }) => {

    const {tables, table, setTable, setProductosOrden} = useContext(AppContext)

    const obtenerMesa = table => {
        setTable(table)
    }

    const visitarNuevaOrden = () => {
        if (table === '') {
            mostrarAlerta(false, 'Debe seleccionar una mesa para continuar');
            return
        }
        setProductosOrden([])
        navigation.navigate('NuevaOrden', {table});
    }

    const volver = () => {
        navigation.navigate('Inicio');
    }

    return (
        <View style={styles.contenedor}>
            <Pressable style={styles.btnVolver} onPress={() => volver()} >
                <Text style={styles.btnVolverTexto}>Volver</Text>
            </Pressable>

            <View style={styles.formulario}>
                <View style={styles.campo}>
                    <Text style={styles.label}>Seleccione la mesa a utilizar</Text>
                    <Picker selectedValue={table} onValueChange={table => obtenerMesa(table)}>
                        <Picker.Item label="- Seleccione -" value="" />
                        {tables.map(table => (
                            <Picker.Item key={table.id} label={table.name} value={table.id} />
                        ))}
                    </Picker>
                </View>

                <Pressable style={styles.submitBtn} onPress={() => visitarNuevaOrden()}>
                    <Text style={styles.submitBtnTexto}>Confirmar mesa</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    contenedor: {
        flex: 1,
        backgroundColor: '#CDCDCB'
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
        color: '#000',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 15
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

export default SeleccionMesa