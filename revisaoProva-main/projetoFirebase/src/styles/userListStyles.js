import { StyleSheet } from 'react-native';

const userListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listItem: {
  backgroundColor: '#fff',
  borderRadius: 12,
  paddingVertical: 16,
  paddingHorizontal: 10,
  marginBottom: 12,
  elevation: 2,
  flexDirection: 'row',
  alignItems: 'center',
},

left: {
  flex: 1,
  justifyContent: 'center',
},

center: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},

right: {
  flex: 1,
  alignItems: 'flex-end',
  justifyContent: 'center',
},

userName: {
  fontSize: 16,
  color: '#333',
},

link: {
  fontWeight: '600',
  color: '#1E90FF',
},
});

export default userListStyles;
