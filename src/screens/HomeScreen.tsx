import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, Alert, ScrollView, Image, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import * as Clipboard from 'expo-clipboard';
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen: React.FC = () => {
  const { user } = useAuth(); // Pega o usuário autenticado do contexto
  const [isDarkMode, setIsDarkMode] = useState(true); // Estado para alternar entre tema claro e escuro
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  // Função para alternar o tema
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Link do cliente gerado automaticamente
  const clientLink = `https://lethan.com/register?ref=${user?.id}`;

  // Função para copiar o link para a área de transferência
  const copyToClipboard = () => {
    Clipboard.setString(clientLink);
    Alert.alert('Link Copiado', 'O link do cliente foi copiado para a área de transferência.');
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? '#222222' : '#DDDDDD', // Cor de fundo da tela, muda com o tema
    },
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: isDarkMode ? '#333333' : '#FFFFFF', // Cor de fundo do contêiner principal, muda com o tema
    },
    header: {
      width: '100%',
      alignItems: 'center',
      paddingTop: StatusBar.currentHeight, // Preenche até a altura da barra de status
      paddingBottom: 20,
      backgroundColor: isDarkMode ? '#222222' : '#DDDDDD', // Cor de fundo do cabeçalho, muda com o tema
      position: 'relative',
    },
    logoBackground: {
      position: 'absolute',
      top: StatusBar.currentHeight, // Posiciona a logo no topo, abaixo da barra de status
      width: '100%',
      height: 180,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.0, // Opacidade da logo de fundo
    },
    logo: {
      width: 190,
      height: 190,
      marginTop: -40,
      marginBottom: -45,
      resizeMode: 'contain', // Redimensiona a logo para caber no contêiner
    },
    themeButton: {
      position: 'absolute',
      top: StatusBar.currentHeight, // Posiciona o botão de tema no topo, abaixo da barra de status
      right: 370,
      padding: 6,
      marginTop: 40,
      zIndex: 1, // Mantém o botão de tema acima da logo de fundo
    },
    contentContainer: {
      width: '100%',
      alignItems: 'center',
      padding: 20,
      backgroundColor: isDarkMode ? '#333333' : '#FFFFFF', // Cor de fundo do contêiner de conteúdo, muda com o tema
      borderRadius: 10,
      marginTop: 20,
    },
    title: {
      fontSize: 24,
      color: isDarkMode ? '#FFFFFF' : '#000000', // Cor do texto, muda com o tema
      marginBottom: 10,
      textAlign: 'center',
    },
    welcome: {
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000', // Cor do texto, muda com o tema
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'CustomFont-Bold', // Fonte personalizada
    },
    linkInput: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 5,
      color: '#333',
    },
    copyButton: {
      width: '100%',
      height: 40,
      backgroundColor: '#069DD9',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginBottom: 20,
    },
    copyButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    cardRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    card: {
      flex: 1,
      backgroundColor: isDarkMode ? '#444' : '#E0E0E0',
      borderRadius: 10,
      padding: 20,
      marginHorizontal: 10,
      alignItems: 'center',
    },
    cardTitle: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
      fontSize: 16,
      marginBottom: 10,
    },
    cardValue: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
      fontSize: 24,
    },
    serviceScroll: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    serviceCard: {
      width: 150,
      height: 100,
      backgroundColor: '#0066ff',
      borderRadius: 10,
      padding: 20,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    serviceCardTitle: {
      color: '#fff',
      fontSize: 16,
    },
    registerButton: {
      width: '100%',
      height: 40,
      backgroundColor: '#00ccff',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginBottom: 20,
    },
    registerButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    smallCardRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    smallCard: {
      flex: 1,
      backgroundColor: '#0066ff',
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    smallCardText: {
      color: '#fff',
      fontSize: 14,
    },
    indicationSection: {
      width: '100%',
      marginBottom: 20,
    },
    indicationTitle: {
      color: isDarkMode ? '#FFFFFF' : '#000000',
      fontSize: 18,
      marginBottom: 10,
    },
    indicationCard: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
    },
    indicationCardTitle: {
      fontSize: 16,
      color: '#333',
      marginBottom: 5,
    },
    indicationCardSubtitle: {
      fontSize: 14,
      color: '#666',
      marginBottom: 10,
    },
    indicationCardPoints: {
      fontSize: 24,
      color: '#333',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
          <FontAwesome name={isDarkMode ? "sun-o" : "moon-o"} size={24} color={isDarkMode ? "#FFA500" : "#000000"} />
        </TouchableOpacity>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Dashboard Grupo Lethan</Text>
          <Text style={styles.welcome}>Seja Bem Vindo {user?.fullName}</Text>
          <TextInput
            style={styles.linkInput}
            value={clientLink}
            editable={false}
          />
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <Text style={styles.copyButtonText}>Copiar Link</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal style={styles.serviceScroll}>
          {['SAC LETHAN', 'VIDEOS EDUCATIVOS', 'OUTRO SERVIÇO'].map((service, index) => (
            <TouchableOpacity key={index} style={[styles.serviceCard, { backgroundColor: index % 2 === 0 ? '#0066ff' : '#ffcc00' }]}>
              <Text style={styles.serviceCardTitle}>{service}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.registerButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.registerButtonText}>Cadastrar Indicação de Clientes</Text>
        </TouchableOpacity>
        <View style={styles.smallCardRow}>
          <TouchableOpacity style={styles.smallCard}>
            <Text style={styles.smallCardText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallCard}>
            <Text style={styles.smallCardText}>Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallCard}>
            <Text style={styles.smallCardText}>Perfil</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.indicationSection}>
          <Text style={styles.indicationTitle}>Indicações</Text>
          <View style={styles.indicationCard}>
            <Text style={styles.indicationCardTitle}>Pontos Acumulados</Text>
            <Text style={styles.indicationCardSubtitle}>todos seu Pontos Acumulados</Text>
            <Text style={styles.indicationCardPoints}>1000 Pontos</Text>
          </View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Cadastro de Indicação</Text>
            <TextInput
              style={styles.linkInput}
              placeholder="Nome do Cliente"
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.linkInput}
              placeholder="Email do Cliente"
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.linkInput}
              placeholder="Telefone do Cliente"
              placeholderTextColor="#888"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cadastrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
