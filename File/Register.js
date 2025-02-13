import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { auth } from './References';
import { dataRef } from './References';
import { showMessage } from 'react-native-flash-message';

export default function Register({ navigation, Route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ownpass, setOwnpass] = useState('');
  const [blankFill, setblankFill] = useState(false);
  const [ownersalah, setownersalah] = useState(false);

  const handleSignUp = () => {
    console.log(email, password);
    if (email == '' || password == '') {
      Alert.alert('Email dan password harus diisi!');
      setblankFill(true);
    } else if ( ownpass != '12345') {
        Alert.alert('Password Owner salah!');
        setownersalah(true);
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Register berhasil');
          let data = {
            email: email
          };
          const ref = dataRef.push(data);
          const keyuser = ref.key;
          dataRef.child(keyuser).update({ keyuser: keyuser });
          showMessage({
            message: "Registrasi Berhasil!",
            type: "success",
            duration: 3000,
          });
          navigation.navigate('LoginScreen');
        })
        .catch(() => {
          console.log('Register gagal');
          showMessage({
            message: "Registrasi Gagal!",
            type: "danger",
            duration: 3000,
          });
        });
    }
  };

  const login = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.idcontainer}>
        <Image
          style={styles.logo}
          source={require('../assets/Inpetory2.png')}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginRight: -30,
        }}></View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.titlec}>R </Text>
        <Text style={styles.title}>EGISTER </Text>
      </View>
      <View style={styles.form}>
        <View>
          <Text style={{ color: '#3A3A3A', fontWeight: 'bold' }}>
            Email Address
          </Text>
        </View>
        <View style={styles.itemForm}>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setEmail(value)}
            value={email}
            autoCapitalize={'none'}
          />
        </View>
        <View>
          <Text style={{ color: '#3A3A3A', fontWeight: 'bold' }}>Password</Text>
        </View>
        <View style={styles.itemForm}>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true}
          />
        </View>
        <View>
        <Text style={{ color: '#3A3A3A', fontWeight: 'bold' }}>Owner Password</Text>
        </View>
        <View style={styles.itemForm}>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setOwnpass(value)}
            value={ownpass}
            secureTextEntry={true}
          />
        </View>
        <View>
          {blankFill && (
            <Text style={{ color: 'red' }}>
              Email dan Password harus diisi!
            </Text>
          )}
          {ownersalah && (
            <Text style={{ color: 'red' }}>
              Owner Password Salah!
            </Text>
          )}
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSignUp(email, password)}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.otherlogin, { marginTop: 30 }]}>
        <Text style={{ color: '#3A3A3A' }}>Sudah Punya Akun?</Text>
        <TouchableOpacity onPress={() => login()}>
          <Text style={{ color: '#00B2FF', fontWeight: 'bold' }}> Masuk </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  title: {
    marginTop: 40,
    marginLeft: -10,
    color: '#1CB0F6',
    fontSize: 30,
    fontWeight: 'bold',
  },
  titlec: {
    marginTop: 30,
    color: '#1CB0F6',
    fontSize: 40,
    fontWeight: 'bold',
  },
  idcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 50,
  },
  logo: {
    height: 150,
    width: 150,
  },
  form: {
    marginTop: 20,
  },
  itemForm: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    paddingLeft: 10,
    height: 40,
    marginTop: 5,
    marginBottom: 20,
  },
  textInput: {
    fontSize: 14,
    width: 230,
    color: '#3A3A3A',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1CB0F6',
    borderBottomWidth: 3,
    borderWidth: 1,
    borderBottomColor: '#0076AE',
    borderColor: '#1CB0F6',
    height: 40,
    width: 250,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 15,
  },
  otherlogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
});
