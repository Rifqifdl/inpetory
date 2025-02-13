import * as React from 'react';
import {Button,View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { dataRef } from './References';
import { auth } from './References';

export default function HomeScreen({navigation}) {
  const tanggal = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const currentHari = daysOfWeek[currentDate.getDay()];
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Note: Month is zero-based, so we add 1
    const year = currentDate.getFullYear();
    const date = currentHari + ', ' + day + '/' + month + '/' + year;
    return date;
  };

  const cekstok=()=>{
        navigation.navigate("Stok");
    };

  const inputdata=()=>{
        navigation.navigate("Input");
    };
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>DASHBOARD</Text>
      </View>
      <View style={styles.subtitle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{ fontWeight: 'bold', color: '#2A7CF8', fontSize: 24 }}>
          Welcome To In</Text>
          <Text style={{ fontWeight: 'bold', color: '#FF9501', fontSize: 24 }}>pet</Text>
          <Text style={{ fontWeight: 'bold', color: '#2A7CF8', fontSize: 24 }}>ory!</Text>
        </View>
        <Text style={{ fontWeight: 'bold', color: '#2A7CF8', fontSize: 15, marginVertical:5 }}>Today is {tanggal()}! </Text>
        <Text style={{ color: '#2A7CF8' }}>Have a Nice Day! </Text>
      </View>
      <View style={{flexDirection: 'column', alignItems: 'center', alignSelf:'center' }}>
        <View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={() => inputdata()}>
              <Text style={styles.buttonText}>Input Data Barang</Text>
              <Text style={{ transform: [{ rotate: '22deg' }], marginTop: 5 }}>
                <MaterialCommunityIcons
            name='file-document-edit' size={50} style={{color:'#AE57D7'}}
            />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.button} onPress={()=>cekstok()}>
              <Text style={styles.buttonText}>Cek Stok</Text>
              <Text
                style={{
                  transform: [{ rotate: '-22deg' }],
                  marginLeft: 75,
                }}>
                 <MaterialCommunityIcons
            name='file-table-box' size={50} style={{color:'#FF9501'}}
            />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
  buttonView: {
    flexDirection: 'row',
    marginTop: 20,
    
  },
  title: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'flex-end',
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: '#D9D9D9',
    height: 70,
    width: 300,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonText: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#3B3B3B',
    fontFamily: 'Arial',
    fontSize: 18,
  },
});
