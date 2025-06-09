// src/screens/UserListScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import useFirebase from '../hooks/useFirebase';
import globalStyles from '../styles/userListStyles';

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const { fetchUsers, deleteUser } = useFirebase();

  useEffect(() => {
    (async () => {
      const data = await fetchUsers();
      setUsers(data);
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((u) => u.filter((x) => x.id !== id));
      Alert.alert('Sucesso', 'Usuário excluído');
    } catch {
      Alert.alert('Erro', 'Não foi possível excluir');
    }
  };

  const renderItem = ({ item }) => (
    <View style={globalStyles.listItem}>
    <View style={globalStyles.left}>
      <Text style={globalStyles.userName}>{item.nome}</Text>
    </View>
    <View style={globalStyles.center}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UserDetails', { id: item.id })
        }
      >
        <Text style={globalStyles.link}>Ver</Text>
      </TouchableOpacity>
    </View>
    <View style={globalStyles.right}>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={[globalStyles.link, { color: 'red' }]}>Excluir</Text>
      </TouchableOpacity>
    </View>
  </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Lista de Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={(x) => x.id}
        renderItem={renderItem}
      />
    </View>
  );
}
