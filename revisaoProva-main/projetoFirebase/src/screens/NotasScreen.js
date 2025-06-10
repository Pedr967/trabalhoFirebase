import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import styles from '../styles/globalStyles';
import { db } from '../services/credenciaisFirebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc
} from 'firebase/firestore';
import BotaoLogout from '../components/BotaoLogout'; 

export default function NotasScreen() {
  const [projetos, setProjetos] = useState([]);
  const [notas, setNotas] = useState({});

  useEffect(() => {
    const q = query(collection(db, 'projetos'), orderBy('criadoEm', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjetos(lista);

      const notasIniciais = {};
      lista.forEach(proj => {
        notasIniciais[proj.id] = proj.nota ? String(proj.nota) : '';
      });
      setNotas(notasIniciais);
    });

    return () => unsubscribe();
  }, []);

  const handleNotaChange = (id, valor) => {
    setNotas(prev => ({
      ...prev,
      [id]: valor
    }));
  };

  const salvarNota = async (id, valorManual = null) => {
    const valor = valorManual !== null ? valorManual : notas[id];

    if (valor !== '' && isNaN(Number(valor))) {
      Alert.alert('Erro', 'Digite um valor numérico válido para a nota.');
      return;
    }

    try {
      const projetoRef = doc(db, 'projetos', id);
      await updateDoc(projetoRef, { nota: valor === '' ? null : Number(valor) });
      Alert.alert('Sucesso', 'Nota salva com sucesso!');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar a nota.');
    }
  };

  const zerarNota = (id) => {
    setNotas(prev => ({ ...prev, [id]: '0' }));
    salvarNota(id, 0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Notas</Text>

      <View style={styles.listaProjetos}>
        {projetos.map((projeto) => (
          <View key={projeto.id} style={styles.card}>
            <Text style={styles.cardTitle}>{projeto.nome}</Text>

            <View style={styles.notaContainer}>
              <Text style={styles.label}>Nota:</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={notas[projeto.id] || ''}
                onChangeText={(text) => handleNotaChange(projeto.id, text)}
                placeholder="0"
              />

              <TouchableOpacity
                style={styles.botaoSalvar}
                onPress={() => salvarNota(projeto.id)}
              >
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoZerar}
                onPress={() => zerarNota(projeto.id)}
              >
                <Text style={styles.textoBotao}>Zerar Nota</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      <BotaoLogout />
    </ScrollView>
  );
}
