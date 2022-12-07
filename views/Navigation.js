import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Inicio from './Inicio';
import IngresarProducto from './IngresarProducto';
import NuevaOrden from './NuevaOrden';
import OpcionesAdmin from './OpcionesAdmin';
import Categoria from '../src/components/Categoria';
import SeleccionMesa from './SeleccionMesa';
import OpcionesCategoria from './OpcionesCategoria';
import EditarCategoria from './Categoria/EditarCategoria';
import EliminarCategoria from './Categoria/EliminarCategoria';
import DetalleProducto from '../src/components/DetalleProducto';
import DetalleOrden from './DetalleOrden';
import EstadoOrden from './EstadoOrden';


const Stack = createStackNavigator();
const TabAdmin = createBottomTabNavigator();
const TabCLiente = createBottomTabNavigator();


const Navigation = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName='Inicio'>
                <Stack.Screen
                    name='Inicio'
                    component={Inicio}
                    options={{
                        title: "Selección de Usuario"
                    }}
                />

                <Stack.Screen
                    name='OpcionesAdmin'
                    component={OpcionesAdmin}
                    options={{
                        title: "Opciones Administrador"
                    }}
                />

                <Stack.Screen
                    name='OpcionesCategoria'
                    component={OpcionesCategoria}
                    options={{
                        title: "Opciones Categoría"
                    }}
                />

                <Stack.Screen
                    name='AgregarCategoria'
                    component={Categoria}
                    options={{
                        title: "Agregar Categoria"
                    }}
                />

                <Stack.Screen
                    name='EditarCategoria'
                    component={EditarCategoria}
                    options={{
                        title: "Editar Categoria"
                    }}
                />

                <Stack.Screen
                    name='EliminarCategoria'
                    component={EliminarCategoria}
                    options={{
                        title: "Eliminar Categoria"
                    }}
                />

                <Stack.Screen
                    name='IngresarProducto'
                    component={IngresarProducto}
                    options={{
                        title: "Agregar Producto",
                        headerLeft: () => null,
                    }}
                />

                <Stack.Screen
                    name='SeleccionMesa'
                    component={SeleccionMesa}
                    options={{
                        title: "Selección Mesa"
                    }}
                />
                <Stack.Screen
                    name='NuevaOrden'
                    component={NuevaOrden}
                    options={{
                        title: "Nueva Orden"
                    }}
                />

                <Stack.Screen
                    name='DetalleProducto'
                    component={DetalleProducto}
                    options={{
                        title: "Restaurant APP"
                    }}
                />

                <Stack.Screen
                    name='DetalleOrden'
                    component={DetalleOrden}
                    options={{
                        title: "Detalle Orden"
                    }}
                />

                <Stack.Screen
                    name='EstadoOrden'
                    component={EstadoOrden}
                    options={{
                        title: "Estado Orden"
                    }}
                />
            </Stack.Navigator>

        </NavigationContainer>
    )
}
export default Navigation;
