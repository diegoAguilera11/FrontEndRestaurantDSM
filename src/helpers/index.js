export const generarCodigo = () => {
    const random = Math.random().toString(36).substring(2, 12)

    return random
}

export const formatearCantidad = cantidad => {

    return Number(cantidad).toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    })
}

// Replace the localHost of the Image uri to the pc ip
export const convertImage = (image) => {
    const contains_uri = image.includes('localhost');

    if (contains_uri) {
        const newUri = image.replace("localhost", "192.168.0.7");
        return newUri;
    }
    return image
}

