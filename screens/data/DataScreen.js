import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { DataTable, List, Button } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

const DataScreen = ({ navigation }) => {
  // console.log(props)
  const db = SQLite.openDatabase('db');
  const [items, setItems] = useState([]);
  useEffect(() => {
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
            return false;  // return true でロールバックする
        });
      },
      () => { console.log("SELECT TABLE Failed All."); },
      () => { console.log("SELECT TABLE Success All."); }
    );
  }, []);
  return (
    <View style={styles.container}>
      <DataTable style={styles.bg_white}>
        {items.map((item, index) => (
          <DataTable.Row key={item.id} onPress={() => navigation.navigate('DataDetail',{ id: item.id, })}>
            <DataTable.Cell>{item.score}</DataTable.Cell>
            <DataTable.Cell numeric>{item.date}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <List.Section style={styles.bg_white}>
        <List.Item title="インポート" titleStyle={styles.labelBlue} />
        <List.Item title="エクスポート" titleStyle={styles.labelBlue} />
        <List.Item title="全てのデータを削除" titleStyle={styles.labelRed} />
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
  labelRed: {
    color: 'red',
  },
  labelBlue: {
    color: 'blue',
  },
  bg_white: {
    backgroundColor: '#fff',
  },
});

export default DataScreen;