import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import projetosStyles from '../styles/projetosStyles';
import { db } from '../services/credenciaisFirebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc
} from 'firebase/firestore';

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

      // Preenche o estado local com as notas atuais dos projetos
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

  const salvarNota = async (id) => {
    const valor = notas[id];
    if (valor === undefined) return;

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

  return (
    <ScrollView contentContainerStyle={projetosStyles.container}>
      <Text style={projetosStyles.title}>Editar Notas</Text>

      <View style={{ marginTop: 20 }}>
        {projetos.map((projeto) => (
          <View key={projeto.id} style={projetosStyles.card}>
            <Text style={projetosStyles.cardTitle}>{projeto.nome}</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <Text style={{ fontWeight: 'bold', marginRight: 8 }}>Nota:</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  width: 80,
                  borderRadius: 4,
                  fontSize: 16,
                  backgroundColor: '#fff'
                }}
                keyboardType="numeric"
                value={notas[projeto.id] || ''}
                onChangeText={(text) => handleNotaChange(projeto.id, text)}
                placeholder="0"
              />

              <TouchableOpacity
                style={{
                  marginLeft: 12,
                  backgroundColor: '#4CAF50',
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 4
                }}
                onPress={() => salvarNota(projeto.id)}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
