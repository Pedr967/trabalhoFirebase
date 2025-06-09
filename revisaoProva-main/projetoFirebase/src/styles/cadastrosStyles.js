import { StyleSheet } from 'react-native';

const cadastrosStyles = StyleSheet.create({
   container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#CED4DA',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CED4DA',
    marginBottom: 12,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: '500',
    color: '#495057',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default cadastrosStyles;
