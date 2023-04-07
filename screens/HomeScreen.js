import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { DataTable, Card, List, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const HomeScreen = ({ navigation }) => {
  // console.log(props)
  const db = SQLite.openDatabase('db');
  const [items, setItems] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      db.transaction((tx) => {
          // 実行したいSQL
          tx.executeSql(
            "SELECT rowid AS id, strftime('%m月%d日 %H:%M', created_at, 'unixepoch', 'localtime') AS date, ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji AS score FROM health_data;",
            [],
            (_, resultSet) => {
              // 成功時のコールバック
              // console.log("select result:" + JSON.stringify(resultSet.rows._array));
              setItems(resultSet.rows._array);
            },
            () => {
              // 失敗時のコールバック
              console.log("SELECT TABLE Failed.");
              setItems([]);
              return false;  // return true でロールバックする
          });
        },
        () => { console.log("SELECT TABLE Failed All."); },
        () => { console.log("SELECT TABLE Success All."); }
      );
    }, [])
  );
  return (
    <View style={styles.container}>
      <DataTable style={styles.bg_white}>
        {items.map((item, index) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.score}</DataTable.Cell>
            <DataTable.Cell numeric>{item.date}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <List.Section style={styles.bg_white}>
        <List.Item title="全てのデータを表示" onPress={() => navigation.navigate('Data')} right={() => <List.Icon icon="chevron-right" />} />
        <List.Item title="今日のテスト" onPress={() => navigation.navigate('Diagnose01')} right={() => <List.Icon icon="chevron-right" />} />
        <List.Item title="今日のトレーニング（記録なし）" onPress={() => navigation.navigate('Training01')} right={() => <List.Icon icon="chevron-right" />} />
        <List.Item title="病気について" onPress={() => navigation.navigate('About')} right={() => <List.Icon icon="chevron-right" />} />
      </List.Section>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  bg_white: {
    backgroundColor: '#fff',
  },
});

export default HomeScreen;