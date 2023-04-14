import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { useTheme, DataTable, Card, List, Button, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const db = SQLite.openDatabase('db');
  const [items, setItems] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      db.transaction((tx) => {
          // 実行したいSQL
          tx.executeSql(
            "SELECT \
              * \
            FROM \
              ( \
                SELECT \
                  rowid AS id, \
                  strftime('%m月%d日 %H:%M', created_at, 'unixepoch', 'localtime') AS date, \
                  ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji AS score, \
                  row_number() over ( \
                    PARTITION BY \
                      date(created_at, 'unixepoch', 'localtime') \
                    ORDER BY \
                      ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji DESC \
                  ) date_id \
                FROM \
                  health_data \
                WHERE \
                  date(created_at, 'unixepoch', 'localtime') >= datetime('now', '-7 days', 'localtime') \
                ORDER BY \
                  created_at DESC \
              ) with_date_id \
            WHERE \
              date_id = 1 \
            ;",
            [],
            (_, resultSet) => {
              // 成功時のコールバック
              console.log("SELECT TABLE Success.");
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
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={{backgroundColor: theme.colors.surface}}>
        <DataTable>
          {items.map((item, index) => (
            <DataTable.Row key={item.id} onPress={() => navigation.navigate('DataDetail',{ id: item.id, })} style={item.score >= 40 ? {borderStartWidth: 5, borderStartColor: 'gold'} : item.score >= 20 ? {borderStartWidth: 5, borderStartColor: 'silver'} : {borderStartWidth: 5, borderStartColor: 'transparent'}}>
              <DataTable.Cell>{item.score}</DataTable.Cell>
              <DataTable.Cell numeric textStyle={{color: theme.colors.onSurfaceVariant}}>{item.date}</DataTable.Cell>
              {/* <DataTable.Cell numeric>{item.date_id}</DataTable.Cell> */}
            </DataTable.Row>
          ))}
        </DataTable>
        <List.Section>
          <List.Item title="全てのデータを表示" onPress={() => navigation.navigate('Data')} right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceDisabled} />} />
        </List.Section>
      </SafeAreaView>
      <SafeAreaView style={styles.sectionContainer}>
        <List.Section style={[styles.roundedList, {backgroundColor: theme.colors.surface}]}>
          <List.Item title="今日のテスト" onPress={() => navigation.navigate('Diagnose01')} right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceDisabled} />} style={[styles.bb1, {borderBottomColor: theme.colors.outlineVariant}]} />
          <List.Item title="今日のトレーニング（記録なし）" onPress={() => navigation.navigate('Training01')} right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceDisabled} />} />
        </List.Section>
        <Card onPress={() => navigation.navigate('About')} style={styles.mt10}>
          <Card.Cover source={{ uri: 'https://source.unsplash.com/random/640x480/?healing' }} style={styles.cardCover} />
          <Card.Content style={styles.mt10}>
            <Text variant="titleLarge">病気について</Text>
            <Text variant="bodyMedium">顔面神経麻痺について学びます。</Text>
          </Card.Content>
        </Card>
      </SafeAreaView>
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  roundedList: {
    borderRadius: 10,
  },
  cardCover: {
    margin: 6,
  },
  mt10: {
    marginTop: 10,
  },
  bb1: {
    borderBottomWidth: 1,
  },
});

export default HomeScreen;