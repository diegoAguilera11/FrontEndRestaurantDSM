
// APP HOST
export const app_host = 'http://192.168.0.7:8000';


export const obtenerCategoriasApi = async () => {

    const url = 'http://192.168.0.7:8000/api/categorys';
    const resultado = await fetch(url);
    const categoriasResult = await resultado.json();
    console.log(categoriasResult);
    return categoriasResult;
}

export default obtenerMesasAPI = async () => {

    try {
        if (Platform.OS === "android") {
            // Local host del equipo.. ANDROID
            // const url = 'http://192.168.0.2:3000/table';

            // host del BackEnd
            const url = 'http://192.168.0.7:8000/api/tables';
            await fetch(url)
                .then(respuesta => respuesta.json())
                .then(resultado => {
                    console.log(resultado)
                    // setTables(resultado)
                    return resultado
                })
        } else {
            // Local host de la api.. IOS
            const url = 'http://localhost:3000/table';
            fetch(url)
                .then(respuesta => respuesta.json())
                .then(resultado => {
                    return resultado
                })
        }

    } catch (error) {
        console.log(error)
    }
}

export const example = () => {
    return true;
}

export const agregarCate = (object) => {
    const url = 'http://192.168.0.7:8000/api/categorys';
    try {
        return fetch(
            url,
            {
                method: "POST",
                mode: "no-cors",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object)
            },
        )
            .then((res) => res.json())
            .catch((error) => console.log(error))
            .then((response) => respuesta(response));
    } catch (e) {
        console.log(e);
    }
}

