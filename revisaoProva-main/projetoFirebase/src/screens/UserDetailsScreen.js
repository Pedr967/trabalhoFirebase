import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import useFirebase from '../hooks/useFirebase';
import globalStyles from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import BotaoLogout from '../components/BotaoLogout';

export default function UserDetailsScreen({ route }) {
  const { id } = route.params;
  const [user, setUser] = useState(null);
  const { getUserById } = useFirebase();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const data = await getUserById(id);
      setUser(data);
    })();
  }, [id]);

  if (!user) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Detalhes</Text>

      <View style={styles.detailBox}>
        <Text style={styles.detailText}>Nome: {user.nome}</Text>
        <Text style={styles.detailText}>Tipo: {user.tipo}</Text>
        <Text style={styles.detailText}>Email: {user.email}</Text>

        {user.tipo === 'aluno' && (
          <>
            <Text style={styles.detailText}>Período: {user.periodo}</Text>
            <Text style={styles.detailText}>Curso: {user.curso}</Text>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <BotaoLogout />
    </View>
  );
}

const styles = StyleSheet.create({
  detailBox: {
    marginTop: 20,
    gap: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 6,
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
