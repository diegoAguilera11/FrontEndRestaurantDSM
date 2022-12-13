import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppContext from '../../src/components/ContextApp'
import { app_host } from '../../src/handler/Api'
// import CountDown from 'react-native-countdown-component'


const EstadoOrden = ({ navigation }) => {

    const { ordenEnviada, setOrdenEnviada } = useContext(AppContext)
    const { id, total, code } = ordenEnviada;
    const [changeOrder, setChangeOrder] = useState(ordenEnviada);
    const [wait_Time, setWait_Time] = useState(false);
    const [valor, setValor] = useState('');

    useEffect(() => {


        // consulta();

        const consultar = () => {
            setTimeout(() => {
                consulta();
            }, 25000);
        }

        if (!wait_Time) {
            consultar();
        }
    }, [changeOrder])

    const consulta = async () => {
        const url = `${app_host}/api/searchOrder/${id}`;
        try {
            await fetch(
                url,
                {
                    method: "GET",
                },
            )
                .then((res) => res.json())
                .catch((error) => console.log(error))
                .then((response) => {

                    console.log('----------------------')
                    const timeChange = response.order.wait_time;
                    console.log(response.order.wait_time)
                    if (timeChange != null) {
                        setWait_Time(true);
                        setValor(timeChange)
                    }

                    setChangeOrder(response.order)
                });
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#DA6B45' }}>

            <View style={{ marginTop: 40 }}>
                {valor === '' && (
                    <>
                        <Text style={styles.texto}>Tu orden fue recibida con éxito!</Text>
                        <Text style={styles.texto}>Se esta calculando el tiempo de entrega...</Text>
                        <Text style={styles.textoId}>Id Pedido: {code}</Text>
                        <Text style={styles.textoId}>Total: {total}</Text>
                    </>
                )
                }
            </View>

            {
                valor > 0 && (
                    <>
                        <Text style={styles.texto}>Tu orden estara lista en:</Text>
                        <Text style={styles.texto}> {valor} minutos</Text>
                    </>

                )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    texto: {
        color: '#000',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '500',
        marginBottom: 15
    },
    textoId: {
        marginTop: 30,
        color: '#000',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default EstadoOrden