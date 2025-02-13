import React, { Component, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Button,
} from 'react-native';
import { dataRef } from './References';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function Keluar({ navigation }) {
  const [dbarangkeluar, setDbarangkeluar] = useState([]);

  useEffect(() => {
    const dataFocus = navigation.addListener('focus', () => {
      const listener = dataRef.on('value', (snapshot) => {
        let data = snapshot.val();
        let dbarangkeluar = Object.values(data).filter((item) =>
          item.hasOwnProperty('keykeluar')
        );
        setDbarangkeluar(dbarangkeluar);
      });
    });
  });

  let kirim = async () => {
    const file = await printToFileAsync({
      html: html(),
      name: 'Laporan.pdf',
      base64: false,
    });

    await shareAsync(file.uri);
  };
  

  const html = () => {
    var table = '';
    for (let i in dbarangkeluar) {
      const item = dbarangkeluar[i];
      table = table + `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.date}</td>
        <td>${item.stokkeluar}</td>
      </tr>
      `
    }
    console.log(table);
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
      <style>
        table {
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        
        td, th {
          border: 1px solid #FF9595;
          text-align: left;
          padding: 8px;
        }
        
        tr:nth-child(even) {
          background-color: #FF9595;
          border: 1px solid #FFFFFF;
        }
      </style>
      </head>
      <body>
      
      <h2>DETAIL STOK BARANG KELUAR </h2>
      
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Date Out</th>
          <th>Out</th>
        </tr>
        ${table}
      </table>
      
      </body>
    </html>
      `;
    return html;
  }

  const allstok = () => {
    navigation.navigate('CekStok');
  };
  const masuk = () => {
    navigation.navigate('StokMasuk');
  };
  const keluar = () => {
    navigation.navigate('StokKeluar');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerStyle}>STOK BARANG</Text>
      <View style={styles.form}>
        <View style={styles.tributton}>
          <View style={styles.posButton}>
            <TouchableOpacity style={styles.button} onPress={() => allstok()}>
              <Text style={styles.textButton}>ALL STOCK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.posButton1}>
            <TouchableOpacity style={styles.button}  onPress={() => masuk()}>
              <Text style={styles.textButton}>MASUK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.posButton2}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>KELUAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.judul}>
          <View
            style={{
              width: 100,
              height: 40,
              backgroundColor: '#FF9595',
            }}>
            <Text style={styles.textJudul}>Nama</Text>
          </View>
          <View
            style={{
              width: 100,
              height: 40,
              backgroundColor: '#FF9595',
            }}>
            <Text style={styles.textJudul}>Tanggal</Text>
          </View>
          <View style={{ width: 100, height: 40, backgroundColor: '#FF9595' }}>
            <Text style={styles.textJudul}>Qty</Text>
          </View>
        </View>
        <ScrollView>
          <FlatList
            style={{ height: 370 }}
            data={dbarangkeluar}
            keyExtractor={(item, index) => item.key}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.listbiru}>
                  <View
                    style={{
                      width: 100,
                      height: 40,
                      backgroundColor: '#FF9595',
                    }}>
                    <Text style={styles.textlist}> {item.name} </Text>
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 40,
                      backgroundColor: '#FF9595',
                    }}>
                    <Text style={styles.textlist}> {item.date} </Text>
                  </View>
                  <View
                    style={{
                      width: 100,
                      height: 40,
                      backgroundColor: '#FF9595',
                    }}>
                    <Text style={styles.textlist}> {item.stokkeluar}</Text>
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={() => kirim()}>
          <View style={styles.kirimbutton}>
              <Text style={styles.textButton}>KIRIM KE OWNER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  //ganti Container
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderTopColor: '#C0C0C0',
  },
  headerStyle: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'flex-end',
  },
  elementsContainer: {
    backgroundColor: '#ecf5fd',
    marginLeft: 14,
    marginRight: 24,
    marginBottom: 24,
    flexDirection: 'column',
  },
  form: {
    flexDirection: 'column',
    paddingHorizontal: 30,
  },
  //Ganti tributton
  tributton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 1,
    marginBottom: 30,
  },
  //Ganti posButton - posButton2
  posButton: {
    width: 100,
    height: 35,
    backgroundColor: '#C2C2C2',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#808080',
    borderColor: '#C2C2C2',
  },
  posButton1: {
    width: 100,
    height: 35,
    backgroundColor: '#C2C2C2',
    borderBottomWidth: 4,
    borderColor: '#808080',
  },
  posButton2: {
    width: 100,
    height: 35,
    backgroundColor: '#FC4849',
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#D20001',
    borderColor: '#FC4849',
  },
  textButton: {
    fontSize: 16,
    color: '#ffff',
    textAlign: 'center',
    margin: 5,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 15,
  },
  //Ganti Judul
  judul: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 1,
    marginBottom: 10,
  },
  textJudul: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    margin: 10,
  },
  listbiru: {
    flexDirection: 'row',
    marginTop: 1,
    width: 200,
  },
  textlist: {
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
    margin: 10,
  },
  biru: {
    width: 200,
    height: 40,
    backgroundColor: '#ffff',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#FF9595',
  },
  putih: {
    width: 100,
    height: 40,
    backgroundColor: '#ffff',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#FF9595',
  },
  listputih: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  //Ganti kirimbutton
  kirimbutton: {
    borderRadius: 10,
    width: 290,
    backgroundColor: '#FFB801',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderWidth: 1,
    borderColor: '#FFB801',
    borderBottomColor: '#DB8000',
    marginVertical: 30,
  },
};
