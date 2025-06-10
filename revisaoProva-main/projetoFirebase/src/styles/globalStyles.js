import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#143D59',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
   container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  listaProjetos: {
    marginTop: 10
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  notaContainer: {
    marginTop: 8
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    width: 100
  },
  botaoSalvar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8
  },
  botaoZerar: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    borderRadius: 6
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default globalStyles;
