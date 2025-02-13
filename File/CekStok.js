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
import Mailer from 'react-native-mail';
import { FontAwesome } from '@expo/vector-icons';

export default function Stok({ navigation }) {
  const [dbarang, setDbarang] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const dataFocus = navigation.addListener('focus', () => {
      const listener = dataRef.on('value', (snapshot) => {
        let data = snapshot.val();
        let dbarang = Object.values(data).filter((item) =>
          item.hasOwnProperty('key')
        );
        setDbarang(dbarang);
      });
    });
  });

  const sendData = (item) => {
    navigation.navigate('EditStack', {
      screen: 'Edit',
      params: {
        key: item.key,
        id: item.id,
        name: item.name,
        price: item.price,
        product: item.product,
        unit: item.unit,
        weight: item.weight,
        category: item.category,
      },
    });
  };

  const handleSort = () => {
    const sortedData = [...dbarang].sort((a, b) => {
      if (sortAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setDbarang(sortedData);
    setSortAscending(!sortAscending);
  };

  const qtysort = () => {
    const sortedData = [...dbarang].sort((a, b) => {
      if (sortAscending) {
        return a.product - b.product;
      } else {
        return b.product - a.product;
      }
    });

    setDbarang(sortedData);
    setSortAscending(!sortAscending);
  };

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
    for (let i in dbarang) {
      const item = dbarang[i];
      table = table + `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${item.weight} ${item.unit}</td>
        <td>${item.price}</td>
        <td>${item.product}</td>
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
          border: 1px solid #69B7FF;
          text-align: left;
          padding: 8px;
        }
        
        tr:nth-child(even) {
          background-color: #69B7FF;
        }
      </style>
      </head>
      <body>
      
      <h2>DETAIL STOK BARANG</h2>
      
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Netto/Weight</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
        ${table}
      </table>
      
      </body>
    </html>
      `;
    return html;
  }

  const masuk = () => {
    navigation.navigate('StokMasuk');
  };

  const keluar = () => {
    navigation.navigate('StokKeluar');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerStyle}>STOK BARANG</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.tributton}>
          <View style={styles.posButton}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>ALL STOCK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.posButton1}>
            <TouchableOpacity style={styles.button} onPress={() => masuk()}>
              <Text style={styles.textButton}>MASUK</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.posButton2}>
            <TouchableOpacity style={styles.button} onPress={() => keluar()}>
              <Text style={styles.textButton}>KELUAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.judul}>
          <TouchableOpacity onPress={() => handleSort()}>
            <View
              style={{
                flexDirection: 'row',
                width: 200,
                height: 40,
                backgroundColor: '#69B7FF',
              }}>
              <Text style={styles.textJudul}>Nama</Text>
              <FontAwesome name="sort" size="14" style={styles.textIcon} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => qtysort()}>
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                height: 40,
                backgroundColor: '#69B7FF',
              }}>
              <Text style={styles.textJudul}>Qty</Text>
              <FontAwesome name="sort" size="14" style={styles.textIcon} />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <FlatList
            style={{ height: 370 }}
            data={dbarang}
            keyExtractor={(item, index) => item.key}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => sendData(item)}>
                  <View style={styles.listbiru}>
                    <View style={styles.biru}>
                      <Text style={styles.textlist}> {item.name} </Text>
                    </View>
                    <View style={styles.biru}>
                      <Text style={styles.textlist}> {item.product}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => kirim()}>
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
    backgroundColor: '#1CB0F6',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#0080BD',
    borderColor: '#1CB0F6',
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
    backgroundColor: '#C2C2C2',
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#808080',
    borderColor: '#C2C2C2',
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
  textIcon: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 13,
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
    backgroundColor: '#69B7FF',
  },
  putih: {
    width: 100,
    height: 40,
    backgroundColor: '#ffff',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#69B7FF',
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
    marginVertical: 30
  },
};
