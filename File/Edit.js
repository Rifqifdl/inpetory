import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { dataRef } from './References';
import { Picker } from '@react-native-picker/picker';
import { showMessage } from 'react-native-flash-message';

export default function App({ navigation, route }) {
  const { key, id, name, weight, unit, category, price, product } =
    route.params;
  const [keyUbah, setKey] = useState(key);
  const [idbrg, setIdbrg] = useState(id);
  const [namebrg, setNamebrg] = useState(name);
  const [weightbrg, setWeightbrg] = useState(weight);
  const [unitbrg, setUnitbrg] = useState(unit);
  const [categorybrg, setCategorybrg] = useState(category);
  const [pricebrg, setPricebrg] = useState(price);
  const [productbrg, setProductbrg] = useState(product);
  const [brgmasuk, setBrgmasuk] = useState('');
  const [brgkeluar, setBrgkeluar] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isPickerEnabled, setIsPickerEnabled] = useState(false);
  const [stokchange, setNewQuantity] = useState('');
  const [dbarang, setDbarang] = useState([]);

  useEffect(() => {
    const dataFocus = navigation.addListener('focus', () => {
      const listener = dataRef.on('value', (snapshot) => {
        let data = snapshot.val();
        let dbarang = Object.values(data);
        setDbarang(dbarang);
      });
    });
  });

  const ubahData = (keyUbah) => {
    const updatestok = calculateQuantityChange();
    const date = tanggal();
    if (productbrg > product) {
      let data = {
        id: id,
        name: name,
        date: date,
        price: price,
        stokmasuk: updatestok,
      };
      const ref = dataRef.push(data);
      const keymasuk = ref.key;
      dataRef.child(keymasuk).update({ keymasuk: keymasuk });
      navigation.navigate('StokMasuk');
    } else if (productbrg < product) {
      let data = {
        id: id,
        name: name,
        date: date,
        price: price,
        stokkeluar: updatestok,
      };
      const ref = dataRef.push(data);
      const keykeluar = ref.key;
      dataRef.child(keykeluar).update({ keykeluar: keykeluar });
      navigation.navigate('StokKeluar');
    } else {
      navigation.navigate('CekStok');
    }
    dataRef
      .child(keyUbah)
      .update({
        id: idbrg,
        name: namebrg,
        weight: weightbrg,
        unit: unitbrg,
        category: categorybrg,
        price: pricebrg,
        product: productbrg,
      });
      showMessage({
      message: "Berhasil",
      description: "Data telah diubah",
      type: "success",
      duration: 3000,
    });
  };

  const handleQtyChange = (event) => {
    setQty(parseInt(event.target.value));
  };

  const hapusData = (keyUbah) => {
    Alert.alert(
      'Hapus Data',
      'Yakin ingin hapus data ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            dataRef.child(key).remove();
            showMessage({
              message: 'Terhapus',
              description: 'Data telah dihapus',
              type: 'danger',
              duration: 2000,
            });
            console.log('Data dihapus');
            navigation.navigate('CekStok');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const toggleReadOnly = () => {
    setIsReadOnly((prevState) => !prevState);
    setIsDisabled((prevState) => !prevState);
    setIsPickerEnabled((prevValue) => !prevValue);
  };

  const calculateQuantityChange = () => {
    if (product !== '' && productbrg !== '') {
      const stokchange = parseInt(productbrg) - parseInt(product);
      return isNaN(stokchange) ? '' : stokchange.toString();
    }
    return '';
  };

  const tanggal = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Note: Month is zero-based, so we add 1
    const year = currentDate.getFullYear();
    const date = day + '/' + month + '/' + year;
    return date;
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.tittle}>DETAIL & EDIT</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 30,
        }}>
        <Text style={styles.toggle}>Enable Editing:</Text>
        <Switch value={isReadOnly} onValueChange={toggleReadOnly} />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>ID Barang</Text>
          </View>
          <View>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: isReadOnly ? 'black' : '#AE57D7',
                  fontWeight: isReadOnly ? 'normal' : 'bold',
                },
              ]}
              keyboardType={'numeric'}
              inputMode={'numeric'}
              editable={isReadOnly}
              onChangeText={(value) => setIdbrg(value)}
              value={idbrg}
            />
          </View>
          <View>
            <Text style={styles.label}>Nama Barang</Text>
          </View>
          <View>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: isReadOnly ? 'black' : '#AE57D7',
                  fontWeight: isReadOnly ? 'normal' : 'bold',
                },
              ]}
              editable={isReadOnly}
              onChangeText={(value) => setNamebrg(value)}
              value={namebrg}
            />
          </View>
          <View>
            <Text style={styles.label}>Kategori</Text>
          </View>
          <View style={styles.textDropdown}>
            <Picker
              style={styles.dropdown}
              selectedValue={categorybrg}
              enabled={isReadOnly}
              onValueChange={(itemValue, itemIndex) =>
                setCategorybrg(itemValue)
              }>
              <Picker.Item label="Pilih kategori" value="" />
              <Picker.Item
                label="Pakan"
                value="pakan"
                color={isPickerEnabled ? 'black' : '#AE57D7'}
              />
              <Picker.Item
                label="Aksesoris"
                value="ass"
                color={isPickerEnabled ? 'black' : '#AE57D7'}
              />
              <Picker.Item
                label="Vitamin & Obat"
                value="vit"
                color={isPickerEnabled ? 'black' : '#AE57D7'}
              />
              <Picker.Item
                label="Kebersihan"
                value="kebersihan"
                color={isPickerEnabled ? 'black' : '#AE57D7'}
              />
              <Picker.Item
                label="Kandang"
                value="kandang"
                color={isPickerEnabled ? 'black' : '#AE57D7'}
              />
            </Picker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 36,
            }}>
            <Text style={styles.label}>Berat</Text>
            <Text style={styles.label}>Satuan</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={[
                styles.textInput,
                { width: 155 },
                {
                  color: isReadOnly ? 'black' : '#AE57D7',
                  fontWeight: isReadOnly ? 'normal' : 'bold',
                },
              ]}
              editable={isReadOnly}
              keyboardType={'numeric'}
              inputMode={'numeric'}
              onChangeText={(value) => setWeightbrg(value)}
              value={weightbrg}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                borderWidth: 2,
                borderRadius: 7,
                borderColor: '#AE57D7',
                height: 35,
                width: 50,
                marginLeft: 10,
              }}>
              <Picker
                style={[styles.dropdown, { width: 70 }]}
                ref={(input) => {
                  this.thirdTextInput = input;
                }}
                selectedValue={unitbrg}
                enabled={isReadOnly}
                onValueChange={(itemValue) => setUnitbrg(itemValue)}>
                <Picker.Item label="Pilih" value="" />
                <Picker.Item
                  label="kilogram"
                  value="kg"
                  color={isPickerEnabled ? 'black' : '#AE57D7'}
                />
                <Picker.Item
                  label="gram"
                  value="g"
                  color={isPickerEnabled ? 'black' : '#AE57D7'}
                />
                <Picker.Item
                  label="liter"
                  value="l"
                  color={isPickerEnabled ? 'black' : '#AE57D7'}
                />
                <Picker.Item
                  label="mililiter"
                  value="ml"
                  color={isPickerEnabled ? 'black' : '#AE57D7'}
                />
              </Picker>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Harga (Rupiah)</Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  color: isReadOnly ? 'black' : '#AE57D7',
                  fontWeight: isReadOnly ? 'normal' : 'bold',
                },
              ]}
              editable={isReadOnly}
              keyboardType={'numeric'}
              inputMode={'numeric'}
              onChangeText={(value) => setPricebrg(value)}
              value={pricebrg}
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.label, { marginTop: 15 }]}>
              Jumlah Barang (pcs):
            </Text>
            <TextInput
              style={[
                styles.textInput,
                { width: 80, marginBottom: 50, marginTop: 10 },
                {
                  color: isReadOnly ? 'black' : '#AE57D7',
                  fontWeight: isReadOnly ? 'normal' : 'bold',
                },
              ]}
              editable={isReadOnly}
              keyboardType={'numeric'}
              inputMode={'numeric'}
              onChangeText={(value) => setProductbrg(value)}
              value={productbrg}
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={[
                styles.btnBatal,
                { backgroundColor: isDisabled ? '#FF3839' : '#C2C2C2' },
                { borderColor: isDisabled ? '#FF3839' : '#C2C2C2' },
                { borderBottomColor: isDisabled ? '#C83838' : '#808080' },
              ]}
              disabled={!isDisabled}
              onPress={() => hapusData(keyUbah)}>
              <Text style={styles.textButton}>Hapus</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.btnSimpan,
                { backgroundColor: isDisabled ? '#1CB0F6' : '#C2C2C2' },
                { borderColor: isDisabled ? '#1CB0F6' : '#C2C2C2' },
                { borderBottomColor: isDisabled ? '#0076AE' : '#808080' },
              ]}
              disabled={!isDisabled}
              onPress={() => ubahData(keyUbah)}>
              <Text style={styles.textButton}>Simpan</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button
              title="Kembali"
              color="#FFC801"
              onPress={() => navigation.goBack()}></Button>
          </View>
        </View>
      </ScrollView>
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
  form: {
    paddingHorizontal: 30,
  },
  tittle: {
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    fontFamily: 'Arial',
  },
  toggle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginTop: 8,
  },
  textInput: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#AE57D7',
    height: 35,
    marginBottom: 10,
    paddingLeft: 15,
  },
  textDropdown: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#AE57D7',
    height: 35,
    marginBottom: 10,
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#AE57D7',
    alignSelf: 'center',
  },
  textButton: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Arial',
    fontSize: 15,
  },
  btnBatal: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FF3839',
    borderBottomWidth: 3,
    borderWidth: 3,
    borderColor: '#FF3839',
    borderBottomColor: '#C83838',
    height: 35,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnSimpan: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#1CB0F6',
    borderBottomWidth: 3,
    borderWidth: 3,
    borderColor: '#1CB0F6',
    borderBottomColor: '#0076AE',
    height: 35,
    width: 120,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnReturn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFC801',
    borderBottomWidth: 10,
    borderColor: '#DAAB00',
    height: 350,
    width: 400,
    borderRadius: 10,
    alignItems: 'center',
  },
});
