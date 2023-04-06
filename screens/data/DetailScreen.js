import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { DataTable, List, Button } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

const DetailScreen = ({ route, navigation }) => {
  // console.log(props)
  const db = SQLite.openDatabase('db');
  const [items, setItems] = useState([]);
  const params = route.params
  useEffect(() => {
    db.transaction((tx) => {
        // 実行したいSQL
        tx.executeSql(
          "SELECT rowid AS id, strftime('%m月%d日 %H:%M', created_at, 'unixepoch', 'localtime') AS date, ansei, hitai, karui_heigan, tsuyoi_heigan, katame, biyoku, hoho, eee, kuchibue, henoji, ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji AS sum FROM health_data WHERE rowid = ?;",
          [
            JSON.stringify(params.id),
          ],
          (_, resultSet) => {
            // 成功時のコールバック
            // console.log("select result:" + JSON.stringify(resultSet.rows._array[0]));
            setItems(resultSet.rows._array[0]);
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
        <DataTable.Row>
          <DataTable.Cell>日付</DataTable.Cell>
          <DataTable.Cell numeric>{items.date}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>安静時非対称</DataTable.Cell>
          <DataTable.Cell numeric>{items.ansei}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>額のしわ寄せ</DataTable.Cell>
          <DataTable.Cell numeric>{items.hitai}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>軽い閉眼</DataTable.Cell>
          <DataTable.Cell numeric>{items.karui_heigan}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>強い閉眼</DataTable.Cell>
          <DataTable.Cell numeric>{items.tsuyoi_heigan}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>片目つぶり</DataTable.Cell>
          <DataTable.Cell numeric>{items.katame}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>鼻翼を動かす</DataTable.Cell>
          <DataTable.Cell numeric>{items.biyoku}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>頬を膨らます</DataTable.Cell>
          <DataTable.Cell numeric>{items.hoho}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>イーと歯を見せる</DataTable.Cell>
          <DataTable.Cell numeric>{items.eee}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>口笛</DataTable.Cell>
          <DataTable.Cell numeric>{items.kuchibue}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>口をへの字に曲げる</DataTable.Cell>
          <DataTable.Cell numeric>{items.henoji}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>合計</DataTable.Cell>
          <DataTable.Cell numeric>{items.sum}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <List.Section style={styles.bg_white}>
        <List.Item title="データを削除" titleStyle={styles.labelRed} />
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
  bg_white: {
    backgroundColor: '#fff',
  },
});

export default DetailScreen;