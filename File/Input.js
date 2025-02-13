import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NumberFormat
} from 'react-native';
import { dataRef } from './References';
import { Picker } from '@react-native-picker/picker';
import { showMessage } from 'react-native-flash-message';
import DatePicker from 'react-native-datepicker';

export default function App({ navigation }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [product, setProduct] = useState('');

  const submit = () => {
    let data = {
      id: id,
      name: name,
      weight: weight,
      unit: unit,
      category: category,
      price: price,
      product: product,
    };

    const ref = dataRef.push(data);
    const key = ref.key;
    dataRef.child(key).update({ key: key });
    showMessage({
      message: "Success",
      description: "Data telah disimpan",
      type: "success",
      duration: 3000,
    });
    navigation.navigate('CekStok');
    clearForm();
  };
  
  const clearForm = () => {
  setId('');
  setName('');
  setUnit('');
  setCategory('');
  setPrice('');
  setProduct('');
  setWeight('');
  };

  const stok = () => {
    navigation.navigate('CekStok');
  };

  const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState('');
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.tittle}>INPUT DATA</Text>
      </View>
      <ScrollView contentContainerStyle={{
              flexGrow: 1,
              }}>
        <View style={styles.form}>
          <View>
            <Text style={styles.label}>ID Barang</Text>
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              keyboardType={'numeric'}
              inputMode={'numeric'}
              returnKeyType={'next'}
              onSubmitEditing={() => {this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={(value) => setId(value)}
              value={id}
            />
          </View>
          <View>
            <Text style={styles.label}>Nama Barang</Text>
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              ref={(input) => { this.secondTextInput = input; }}
              onChangeText={(value) => setName(value)}
              value={name}
            />
          </View>
          <View>
            <Text style={styles.label}>Kategori</Text>
          </View>
          <View style={styles.textDropdown}>
            <Picker
              style={styles.dropdown}
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}>
              <Picker.Item label="Pilih kategori" value="" />
              <Picker.Item label="Pakan" value="pakan" />
              <Picker.Item label="Aksesoris" value="ass" />
              <Picker.Item label="Vitamin & Obat" value="vit" />
              <Picker.Item label="Kebersihan" value="kebersihan" />
              <Picker.Item label="Kandang" value="kandang" />
            </Picker>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 36,
            }}>
            <Text style={styles.label}>Berat</Text>
            <Text style={[styles.label, {marginRight: 50 }]}>Satuan</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TextInput
              style={[styles.textInput, { width: 155 }]}
              keyboardType={'numeric'}
              inputMode={'numeric'}
              returnKeyType={'next'}
              onSubmitEditing={() => {this.thirdTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={(value) => setWeight(value)}
              value={weight}
            />
            <View style={{flex: 1,
                  flexDirection:'row',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderRadius: 7,
                  borderColor: '#AE57D7',
                  height: 35,
                  width: 50,
                  marginLeft: 10, }}>
              <Picker
                style={[styles.dropdown, {width: 70}]}
                ref={(input) => { this.thirdTextInput = input; }}
                selectedValue={unit}
                onValueChange={(itemValue) => setUnit(itemValue)}>
                <Picker.Item label="Pilih" value="" />
                <Picker.Item label="kilogram" value="kg" />
                <Picker.Item label="gram" value="g" />
                <Picker.Item label="liter" value="l" />
                <Picker.Item label="mililiter" value="ml" />
              </Picker>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Harga (Rupiah)</Text>
            <TextInput
              style={styles.textInput}
              keyboardType={'numeric'}
              inputMode={'numeric'}
              returnKeyType={'next'}
              onSubmitEditing={() => {this.fourthTextInput.focus(); }}
              blurOnSubmit={false}
              onChangeText={(value) => setPrice(value)}
              value={price}
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
              ]}
              keyboardType={'numeric'}
              inputMode={'numeric'}
              ref={(input) => { this.fourthTextInput = input; }}
              onChangeText={(value) => setProduct(value)}
              value={product}
            />
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.btnBatal} onPress={() => clearForm()}>
              <Text style={styles.textButton}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnSimpan}
              onPress={() => {
                submit(), stok();
              }}>
              <Text style={styles.textButton}>Simpan</Text>
            </TouchableOpacity>
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
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'flex-end',
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
    fontWeight: 'bold',
  },
  textInput: {
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 7,
    borderColor: '#AE57D7',
    height: 35,
    marginBottom: 10,
    paddingLeft: 15
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
    fontWeight: 'bold',
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
    marginBottom: 50,
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
});
