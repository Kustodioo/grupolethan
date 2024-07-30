import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, Alert, ScrollView, Image, Modal, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import * as Clipboard from 'expo-clipboard';
import { FontAwesome } from '@expo/vector-icons';
import { PieChart } from 'react-native-svg-charts';
import { Circle, G, Text as SVGText, Defs, LinearGradient, Stop } from 'react-native-svg';

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const clientLink = `https://lethan.com/register?ref=${user?.id}`;

  const copyToClipboard = () => {
    Clipboard.setString(clientLink);
    Alert.alert('Link Copiado', 'O link do cliente foi copiado para a área de transferência.');
  };

  const pieData = [
    {
      key: 1,
      amount: 50,
      svg: { fill: '#00CFFF' },
      label: 'Cáceres',
    },
    {
      key: 2,
      amount: 80,
      svg: { fill: '#FFC300' },
      label: 'Cuiabá',
    },
    {
      key: 3,
      amount: 30,
      svg: { fill: '#1ABC9C' },
      label: 'Araputanga',
    },
    {
      key: 4,
      amount: 40,
      svg: { fill: '#8E44AD' },
      label: 'Frederico W',
    },
    {
      key: 5,
      amount: 60,
      svg: { fill: '#FF5733' },
      label: 'Nova Mutum',
    },
  ];

  const smallData1 = [
    {
      key: 1,
      amount: 5,
      svg: { fill: 'url(#grad1)' },
      label: 'Atendidas',
    },
  ];

  const smallData2 = [
    {
      key: 1,
      amount: 4,
      svg: { fill: 'url(#grad2)' },
      label: 'Pendentes',
    },
  ];

  const Gradient = ({ id, colors }: { id: string, colors: string[] }) => (
    <G>
      <Defs>
        <LinearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          {colors.map((color, index) => (
            <Stop key={index} offset={`${(index / (colors.length - 1)) * 100}%`} stopColor={color} />
          ))}
        </LinearGradient>
      </Defs>
    </G>
  );

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? '#222222' : '#DDDDDD',
    },
    container: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
    },
    header: {
      width: '100%',
      alignItems: 'center',
      paddingTop: StatusBar.currentHeight,
      paddingBottom: 20,
      backgroundColor: isDarkMode ? '#222222' : '#DDDDDD',
      position: 'relative',
    },
    logoBackground: {
      position: 'absolute',
      top: StatusBar.currentHeight,
      width: '100%',
      height: 180,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.0,
    },
    logo: {
      width: 190,
      height: 190,
      marginTop: -40,
      marginBottom: -45,
      resizeMode: 'contain',
    },
    themeButton: {
      position: 'absolute',
      top: StatusBar.currentHeight,
      right: 370,
      padding: 6,
      marginTop: 40,
      zIndex: 1,
    },
    contentContainer: {
      width: '100%',
      alignItems: 'center',
      padding: 20,
      backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
      borderRadius: 10,
      marginTop: 20,
    },
    title: {
      fontSize: 30,
      color: isDarkMode ? '#FFFFFF' : '#000000',
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'CustomFont-Bold',
    },
    welcome: {
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000',
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'CustomFont-Bold',
    },
    linkInput: {
      width: '100%',
      height: 30,
      borderColor: 'gray',
      borderWidth: 3,
      marginBottom: 10,
      paddingHorizontal: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 25,
      color: '#333',
    },
    copyButton: {
      width: '100%',
      height: 40,
      backgroundColor: '#069DD9',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginBottom: 20,
      marginTop: 5,
    },
    copyButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    chartTitle: {
      fontSize: 18,
      color: isDarkMode ? '#FFFFFF' : '#000000',
      backgroundColor: '#FFC300',
      padding: 10,
      borderRadius: 5,
      textAlign: 'center',
      marginBottom: 10,
      fontFamily: 'CustomFont-Bold',
    },
    chartLegend: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
      marginTop: 10,
    },
    chartLegendText: {
      fontSize: 16,
      color: isDarkMode ? '#FFFFFF' : '#000000',
      fontFamily: 'CustomFont-Regular',
      marginHorizontal: 10,
    },
    chartContainer: {
      width: Dimensions.get('window').width - 40,
      height: 220,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    smallChartContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      flexDirection: 'row',
    },
    smallChart: {
      width: 150,
      height: 150,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#333333' : '#FFFFFF',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      margin: 10,
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
      marginBottom: 10,
    },
    serviceCard: {
      width: 130,
      height: 90,
      backgroundColor: '#0066ff',
      borderRadius: 15,
      padding: 10,
      marginHorizontal: 4,
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
      borderRadius: 15,
      marginBottom: 20,
      marginTop: 5,
    },
    registerButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    smallCardRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    smallCard: {
      flex: 1,
      backgroundColor: '#0066ff',
      borderRadius: 13,
      padding: 13,
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
      margin: 50,
      marginTop: 95,
      backgroundColor: '#ffffff',
      borderRadius: 40,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#0080ff',
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 0.20,
      shadowRadius: 9,
      elevation: 10,
    },
    button: {
      borderRadius: 20,
      padding: 13,
      elevation: 10,
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
        <Text style={styles.chartTitle}>Indicação Entre Unidades</Text>
        <View style={styles.chartContainer}>
          <PieChart
            style={{ height: 200 }}
            data={pieData}
            innerRadius={30}
            outerRadius={60}
            padAngle={0.05}
          />
          <View style={styles.chartLegend}>
            {pieData.map((item) => (
              <Text key={item.key} style={styles.chartLegendText}>
                <Text style={{ color: item.svg.fill }}>■ </Text>
                {item.label}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.smallChartContainer}>
          <View style={styles.smallChart}>
            <Text style={styles.chartTitle}>Nº Indicação Atendidas</Text>
            <PieChart
              style={{ height: 100 }}
              data={smallData1}
              innerRadius={40}
              outerRadius={50}
              padAngle={0.05}
            />
            <SVGText
              x={75}
              y={75}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={24}
              fill="#8E44AD"
            >
              {smallData1[0].amount}
            </SVGText>
          </View>
          <View style={styles.smallChart}>
            <Text style={styles.chartTitle}>Nº Indicação Pendentes</Text>
            <PieChart
              style={{ height: 100 }}
              data={smallData2}
              innerRadius={40}
              outerRadius={50}
              padAngle={0.05}
            />
            <SVGText
              x={75}
              y={75}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize={24}
              fill="#8E44AD"
            >
              {smallData2[0].amount}
            </SVGText>
          </View>
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
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Cadastro de Indicação</Text>
          <TextInput
            style={styles.linkInput}
            placeholder="Nome do Completo"
            placeholderTextColor="#ff0000"
          />
          <TextInput
            style={styles.linkInput}
            placeholder="Email"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.linkInput}
            placeholder="Telefone"
            placeholderTextColor="#ff0000"
          />
          <TextInput
            style={styles.linkInput}
            placeholder="Kwh"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.linkInput}
            placeholder="Cidade"
            placeholderTextColor="#ff0000"
          />
          <TextInput
            style={styles.linkInput}
            placeholder="Vendedor"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.linkInput}
            placeholder="ID - Geração Automatica"
            placeholderTextColor="#ff0000"
          />
          <Text style={styles.modalText}>Campos em Vermelho Obrigatorio</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Cadastrar Indicação</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
