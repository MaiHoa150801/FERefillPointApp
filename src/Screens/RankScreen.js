import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllRefillPoint } from '../service/RefillPointService';
export default function RankScreen({ navigation }) {
  const [refillPoints, setRefillPoints] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPoint();
    });
    return unsubscribe;
  }, []);
  const getPoint = async () => {
    const {
      data: { refillPoint },
    } = await getAllRefillPoint();
    setRefillPoints(refillPoint);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.txtTitle}>Bảng xếp hạng điểm tích lũy</Text>
      </View>
      <View style={styles.content}>
        <ScrollView>
          {refillPoints.length > 0 &&
            refillPoints.map((point, index) => (
              <View key={index} style={styles.body}>
                <View style={styles.viewText}>
                  <Text style={styles.text1}>{index + 1}</Text>
                </View>
                <Text style={styles.text}>{point.account_id.name}</Text>
                <Text style={styles.text}>{point.score} GP</Text>
              </View>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    marginHorizontal: 40,
    marginTop: 30,
  },
  title: {
    width: '100%',
    height: 70,
    backgroundColor: 'rgb(18, 136, 58)',
  },
  txtTitle: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    height: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  viewText: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#bdc750',
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c75058',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#65c750',
  },
});
