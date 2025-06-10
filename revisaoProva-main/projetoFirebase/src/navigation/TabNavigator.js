import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NotasScreen from '../screens/NotasScreen';
import UserListScreen from '../screens/UserListScreen';
import ProjetosScreen from '../screens/ProjetosScreen';
import CadastrosStyles from '../screens/CadastrosScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarTipoUsuario = async () => {
      try {
        const usuarioString = await AsyncStorage.getItem('@usuarioLogado');
        if (usuarioString) {
          const usuario = JSON.parse(usuarioString);
          setTipoUsuario(usuario.tipo);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do AsyncStorage', error);
      } finally {
        setLoading(false);
      }
    };
    carregarTipoUsuario();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Projetos') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Usuários') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Cadastro') {
            iconName = focused ? 'person-add' : 'person-add-outline';
          } else if (route.name === 'Notas') {
            iconName = focused ? 'create' : 'create-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}

    >
      <Tab.Screen name="Projetos" component={ProjetosScreen} />
      <Tab.Screen name="Cadastro" component={CadastrosStyles} />

      {(tipoUsuario === 'avaliador' || tipoUsuario === 'administrador') && (
        <Tab.Screen name="Notas" component={NotasScreen} />
      )}

      {tipoUsuario !== 'aluno' && tipoUsuario !== 'avaliador' && (
        <Tab.Screen name="Usuários" component={UserListScreen} />
      )}

    </Tab.Navigator>
  );
}
