import { Alert } from 'react-native'

// Alerta para mostrar por pantalla el resultado de la insercción al usuario
export const mostrarAlerta = (estado, mensaje) => {
    if (!estado) {
        Alert.alert('Error', mensaje)
        return
    }
    Alert.alert('Exito', mensaje)
}

