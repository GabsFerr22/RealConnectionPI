import React, { useState } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';

const HeaderIcon = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 40, paddingBottom: 10 }}>
    <Image source={require('../../assets/logo2.png')} style={{ width: 30, height: 30, marginRight: 10 }} />
    <Text style={{ fontSize: 24, color: '#FD814A', fontWeight: 'bold' }}>Comunidade</Text>
  </View>
);

const posts = [
  {
    id: '1',
    familia: 'Familia Ferreira',
    texto: 'Hoje fomos fazer uma visita em família para a galeria de artes.',
    imagens: [
      'https://images.unsplash.com/photo-1581090700227-1e8f9cfd35ca',
      'https://images.unsplash.com/photo-1616627989390-1df5aa3c86c5',
      'https://images.unsplash.com/photo-1600025277283-f3fc8b5802eb',
    ],
  },
  {
    id: '2',
    familia: 'Familia Mendes',
    texto: 'Hoje fomos à praia, muito divertido passar tempo em família.',
    imagens: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      'https://images.unsplash.com/photo-1577471671167-854e1b27b8b5',
    ],
  },
];

export default function Comunidade() {
  const router = useRouter();
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const animatedValues = posts.reduce((acc, post) => {
    acc[post.id] = new Animated.Value(1);
    return acc;
  }, {} as { [key: string]: Animated.Value });

  const toggleLike = (id: string) => {
    const isLiked = likes[id];

    Animated.sequence([
      Animated.timing(animatedValues[id], {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[id], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setLikes({ ...likes, [id]: !isLiked });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo2.png')} style={styles.logo} />
        <Text style={styles.title}>Comunidade</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageGrid}>
              {item.imagens.map((img, idx) => (
                <Image key={idx} source={img} style={styles.postImage} />
              ))}
            </View>

            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.texto}>{item.texto}</Text>

              <View style={styles.actions}>
                <Ionicons name="chatbubble-outline" size={20} color="#ccc" />
                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                  <Animated.View style={{ transform: [{ scale: animatedValues[item.id] }] }}>
                    <Ionicons
                      name={likes[item.id] ? 'heart' : 'heart-outline'}
                      size={20}
                      color={likes[item.id] ? '#FD814A' : '#ccc'}
                    />
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Bottom Nav */}
      <View style={styles.navBar}>
        <TouchableOpacity>
          <Ionicons name="people" size={24} color="#FD814A" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="edit" size={24} color="#FD814A" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.plusButton}>
          <Entypo name="plus" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="bar-chart" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FD814A',
  },
  list: { paddingBottom: 100 },
  card: {
    backgroundColor: 'white',
    margin: 12,
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  postImage: {
    width: '30%',
    height: 70,
    borderRadius: 10,
  },
  info: { paddingHorizontal: 8 },
  nome: { fontWeight: 'bold', fontSize: 14, marginBottom: 4 },
  texto: { fontSize: 13, color: '#555', marginBottom: 8 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
    alignItems: 'center',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 8,
  },
  plusButton: {
    backgroundColor: '#FD814A',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 10,
  },
});