import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

const { height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TouchableOpacity onPress={() => router.push('../login')} style={styles.button}>
        <Image source={require('../assets/play.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F4F9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: height * 0.15,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#FB8469',
    borderRadius: 50,
    padding: 18,
    marginBottom: 40,
  },
  icon: {
    width: 36,
    height: 36,
    tintColor: '#fff',
  },
});