import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import projetosStyles from '../styles/projetosStyles';
import { db } from '../services/credenciaisFirebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import BotaoLogout from '../components/BotaoLogout';

export default function ProjetosScreen() {
  const [projetos, setProjetos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);
  const [nome, setNome] = useState('');
  const [temaProjeto, setTemaProjeto] = useState('');
  const [nomeIntegrantes, setNomeIntegrantes] = useState('');
  const [curso, setCurso] = useState('');
  const [descricaoProjeto, setDescricaoProjeto] = useState('');
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const loadUserType = async () => {
      try {
        const usuarioStr = await AsyncStorage.getItem('@usuarioLogado');
        if (usuarioStr) {
          const usuario = JSON.parse(usuarioStr);
          setUserType(usuario.tipo?.trim().toLowerCase());
        }
      } catch (err) {
        console.error('Erro ao ler tipo de usuário:', err);
      }
    };
    loadUserType();

    const q = query(collection(db, 'projetos'), orderBy('criadoEm', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const lista = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setProjetos(lista);
    });
    return () => unsubscribe();
  }, []);

  const handleDeleteProjeto = async (id) => {
    try {
      await deleteDoc(doc(db, 'projetos', id));
      Alert.alert('Sucesso', 'Projeto excluído');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível excluir');
    }
  };

  const handleEditProjeto = (projeto) => {
    setProjetoSelecionado(projeto);
    setNome(projeto.nome || '');
    setTemaProjeto(projeto.temaProjeto || '');
    setNomeIntegrantes(projeto.nomeIntegrantes || '');
    setCurso(projeto.curso || '');
    setDescricaoProjeto(projeto.descricaoProjeto || '');
    setModalVisible(true);
  };

  const handleSalvarEdicao = async () => {
    if (!projetoSelecionado) return;
    try {
      await updateDoc(doc(db, 'projetos', projetoSelecionado.id), {
        nome,
        temaProjeto,
        nomeIntegrantes,
        curso,
        descricaoProjeto,
      });
      setModalVisible(false);
      Alert.alert('Sucesso', 'Projeto atualizado!');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível atualizar');
    }
  };

  return (
    <ScrollView contentContainerStyle={projetosStyles.container}>
      <Text style={projetosStyles.title}>Projetos</Text>

      {projetos.map(projeto => (
        <View key={projeto.id} style={projetosStyles.card}>
          <View style={projetosStyles.cardHeader}>
            <Text style={projetosStyles.cardTitle}>{projeto.nome}</Text>
            <Text style={projetosStyles.cardNota}>
              Nota: {projeto.nota ?? 'Sem nota'}
            </Text>
          </View>

          <Text style={projetosStyles.cardDescription}>
            <Text style={projetosStyles.boldLabel}>Tema: </Text>
            {projeto.temaProjeto || 'Não informado'}
          </Text>

          <Text style={projetosStyles.cardDescription}>
            <Text style={projetosStyles.boldLabel}>Integrantes: </Text>
            {projeto.nomeIntegrantes || 'Não informado'}
          </Text>

          <Text style={projetosStyles.cardDescription}>
            <Text style={projetosStyles.boldLabel}>Curso: </Text>
            {projeto.curso || 'Não informado'}
          </Text>

          <Text style={projetosStyles.cardDescription}>
            <Text style={projetosStyles.boldLabel}>Descrição: </Text>
            {projeto.descricaoProjeto || 'Sem descrição'}
          </Text>

          <Text style={projetosStyles.cardDate}>
            Criado em:{' '}
            {projeto.criadoEm?.seconds
              ? new Date(projeto.criadoEm.seconds * 1000).toLocaleDateString()
              : 'Data não disponível'}
          </Text>

          <View style={projetosStyles.botoesContainer}>
            <TouchableOpacity
              style={projetosStyles.editarButton}
              onPress={() => handleEditProjeto(projeto)}
            >
              <Text style={projetosStyles.editarButtonText}>Editar</Text>
            </TouchableOpacity>

            {userType !== 'aluno' && (
              <TouchableOpacity
                style={projetosStyles.excluirButton}
                onPress={() => handleDeleteProjeto(projeto.id)}
              >
                <Text style={projetosStyles.excluirButtonText}>Excluir</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={projetosStyles.modalContainer}>
          <View style={projetosStyles.modalContent}>
            <Text style={projetosStyles.modalTitle}>Editar Projeto</Text>

            <TextInput
              style={projetosStyles.modalInput}
              placeholder="Nome do Projeto"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={projetosStyles.modalInput}
              placeholder="Tema"
              value={temaProjeto}
              onChangeText={setTemaProjeto}
            />
            <TextInput
              style={projetosStyles.modalInput}
              placeholder="Integrantes"
              value={nomeIntegrantes}
              onChangeText={setNomeIntegrantes}
            />
            <TextInput
              style={projetosStyles.modalInput}
              placeholder="Curso"
              value={curso}
              onChangeText={setCurso}
            />
            <TextInput
              style={projetosStyles.modalInput}
              placeholder="Descrição"
              multiline
              value={descricaoProjeto}
              onChangeText={setDescricaoProjeto}
            />

            <View style={projetosStyles.modalButtons}>
              <TouchableOpacity
                style={projetosStyles.salvarButton}
                onPress={handleSalvarEdicao}
              >
                <Text style={projetosStyles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={projetosStyles.cancelarButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={projetosStyles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <BotaoLogout />
    </ScrollView>
  );
}
