import { StyleSheet } from 'react-native';

const projetosStyles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 40,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        alignSelf: 'center',
    },
    card: {
        backgroundColor: '#f2f2f2',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    cardRight: {
        alignItems: 'flex-end'
    },
    cardNota: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#444'
    },
    boldLabel: {
        fontWeight: 'bold'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    notaButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    notaButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 12,
    },
    cardDescription: {
        fontSize: 14,
        color: '#444',
        marginTop: 4,
    },
    cardDate: {
        fontSize: 12,
        color: '#888',
        marginTop: 10,
        fontStyle: 'italic',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        fontSize: 16,
        marginBottom: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginTop: 10,
    },
    modalButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        gap: 10,
    },
    editarButton: {
        flex: 1,
        backgroundColor: '#ffa500',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    editarButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    excluirButton: {
        flex: 1,
        backgroundColor: '#ff3b30',
        paddingVertical: 10,
        borderRadius: 6,
        alignItems: 'center',
    },
    excluirButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    salvarButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
    },

    cancelarButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
    },
});

export default projetosStyles;
