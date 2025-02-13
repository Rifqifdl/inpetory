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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { auth } from './References';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [blankFill, setblankFill] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const clearForm = () => {
    setEmail('');
    setPassword('');
  };

  const submit = () => {
    if (email == '' || password == '') {
      Alert.alert('email dan password harus diisi!');
      setblankFill(true);
    } else {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Login berhasil');
          showMessage({
            message: 'Login Berhasil',
            type: 'success',
            duration: 2000,
          });
          navigation.navigate('MyDrawer');
          setLoginFailed(false);
          clearForm();
        })
        .catch(() => {
          console.log('Login gagal');
          setLoginFailed(true);
        });
    }
  };

  const handlePasswordChange = (newValue) => {
    setPassword(newValue);
  };

  const register = () => {
    navigation.navigate('Register');
  };

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
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
        <Text style={styles.titlec}>L </Text>
        <Text style={styles.title}>OGIN </Text>
      </View>
      <View style={styles.form}>
        <View>
          <Text style={{ color: '#3A3A3A', fontWeight: 'bold' }}>
            Email Adress
          </Text>
        </View>
        <View style={styles.itemForm}>
          <TextInput
            style={styles.textInput}
            returnKeyType={'next'}
            onSubmitEditing={() => {
              this.secondTextInput.focus();
            }}
            blurOnSubmit={false}
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
            ref={(input) => {
              this.secondTextInput = input;
            }}
            secureTextEntry={!showPassword}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <TouchableOpacity
            style={{ justifyContent: 'flex-end', marginLeft: 20 }}
            onPress={passwordVisibility}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#808080"
            />
          </TouchableOpacity>
        </View>
        <View>
          {loginFailed && (
            <Text style={{ color: 'red' }}>
              Login gagal. Periksa email/password dan koneksi internet anda
            </Text>
          )}
          {blankFill && (
            <Text style={{ color: 'red' }}>
              Email dan Password harus diisi!
            </Text>
          )}
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              submit();
            }}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.otherlogin, { marginTop: 30 }]}>
        <Text style={{ color: '#3A3A3A' }}>Belum Punya Akun?</Text>
        <TouchableOpacity onPress={() => register()}>
          <Text style={{ color: '#00B2FF', fontWeight: 'bold' }}> Daftar </Text>
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
  topacc: {
    height: 90,
    resizeMode: 'stretch',
    marginLeft: -30,
  },
  titlecap: {
    marginTop: 40,
    color: '#1CB0F6',
    fontSize: 30,
    fontWeight: 'bold',
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
  lupasandi: {
    marginTop: -15,
    fontSize: 10,
    color: '#00B2FF',
    fontWeight: 'bold',
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
