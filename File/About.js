import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function About({navigation}) {
  const home=()=>{
        navigation.navigate("Home");
    };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.tittle}>ABOUT</Text>
      </View>
      <View style={styles.idcontainer}>
        <Image
          style={styles.logo}
          source={require('../assets/Inpetory2.png')}
        />
      </View>
      <View style={styles.idcontainer}>
        <Text style={styles.asSlogan}>Manage your</Text>
        <Text style={styles.asPetSlogan}> Pet Shop</Text>
        <Text style={styles.asSlogan}> Inventory</Text>
      </View>
      <View>
        <Text style={styles.namaText}>App ini dibuat oleh :</Text>
      </View>
      <View
        style={{
          
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image style={styles.nama} source={require('../assets/nama.png')} />
      </View>
      <View>
        <Text style={styles.asText}>Untuk memenuhi tugas mata kuliah Mobile Prorgamming</Text>
        <Text style={styles.asText}>INFORMATIKA PAGI B</Text>
        <Text style={styles.asText2}>STT WASTUKANCANA 2023 PURWAKARTA</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.btnReturn} onPress={() => home()}>
          <Text style={styles.textButton}>KEMBALI KE HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderTopColor: '#C0C0C0',
  },
  tittle: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'flex-end',
  },
  idcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    height: 150,
    width: 150,
  },
  namaText: {
    color: '#3B3B3B',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
  },
  nama: {
    marginTop: 15,
    height: 110,
    width: 278,
  },
  asText: {
    color: '#3B3B3B',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
  },
  asText2: {
    color: '#3B3B3B',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 30,
    marginRight: 30,
    textAlign: 'center',
  },
  btnReturn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFC801',
    borderBottomWidth: 6,
    borderWidth: 1, 
    borderColor: '#FFC801',
    borderBottomColor: '#DB8000',
    height: 40,
    width: 273,
    borderRadius: 10, 
    marginTop: 40,
    alignItems: 'center',
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Alata',
    fontWeight: 'bold',
    fontSize: 16,
  },
  asSlogan: {
    color: '#2380FF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  asPetSlogan: {
    color: '#FF9501',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  
});