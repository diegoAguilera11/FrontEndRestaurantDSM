import React, { useState, useEffect, useContext } from 'react'
import { View, Text } from 'react-native'
import AppContext from '../src/components/ContextApp'

const EstadoOrden = ({ navigation }) => {

    const { ordenEnviada, setOrdenEnviada } = useContext(AppContext)
    const { id, total } = ordenEnviada;
    const [changeOrder, setChangeOrder] = useState({});

    useEffect(() => {

        const consultarEstadoPedido = () => {


                consulta();
        }

        // setTimeout(() => {
        //     consultarEstadoPedido();
        // }, 5000);
    })

    // const consulta = async () => {
    //     const url = `http://192.168.0.7:8000/api/searchOrder/${id}`;
    //         try {
    //             await fetch(
    //                 url,
    //                 {
    //                     method: "GET",
    //                 },
    //             )
    //                 .then((res) => res.json())
    //                 .catch((error) => console.log(error))
    //                 .then((response) => {
    //                     console.log(response.order)
    //                     setChangeOrder(response.order)
    //                 });
    //         } catch (e) {
    //             console.log(e);
    //         }
    // }


    return (
        <View>
            <Text>Tu orden Fue ingresada con exito...</Text>
            <Text>{id}</Text>
            <Text>{total}</Text>
        </View>
    )
}

export default EstadoOrden