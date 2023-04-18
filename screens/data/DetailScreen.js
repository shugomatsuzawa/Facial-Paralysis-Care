import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { useTheme, DataTable, List, Button, Dialog, Portal, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const DetailScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const db = SQLite.openDatabase('db');
  const [items, setItems] = useState([]);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const params = route.params

  useFocusEffect(
    React.useCallback(() => {
      db.transaction((tx) => {
          // 実行したいSQL
          tx.executeSql(
            "SELECT \
              rowid AS id, \
              strftime('%m月%d日 %H:%M', created_at, 'unixepoch', 'localtime') AS date, \
              ansei, \
              hitai, \
              karui_heigan, \
              tsuyoi_heigan, \
              katame, \
              biyoku, \
              hoho, \
              eee, \
              kuchibue, \
              henoji, \
              ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji AS sum \
            FROM \
              health_data \
            WHERE \
              rowid = ?\
            ;",
            [params.id],
            (_, resultSet) => {
              // 成功時のコールバック
              console.log("SELECT TABLE Success.");
              // console.log("select result:" + JSON.stringify(resultSet.rows._array[0]));
              setItems(resultSet.rows._array[0]);
            },
            () => {
              // 失敗時のコールバック
              console.log("SELECT TABLE Failed.");
              openErrorDialog();
              setItems([]);
              return false;  // return true でロールバックする
          });
        },
        () => { console.log("SELECT TABLE Failed All."); },
        () => { console.log("SELECT TABLE Success All."); }
      );
    }, [])
  );

  const openErrorDialog = () => setIsErrorDialogOpen(true);
  const closeErrorDialog = () => setIsErrorDialogOpen(false);
  const deleteData = () => {
    db.transaction((tx) => {
        // 実行したいSQL
        tx.executeSql(
          "DELETE FROM \
            health_data \
          WHERE \
            rowid = ?\
          ;",
          [params.id],
          () => {
            // 成功時のコールバック
            console.log("DELETE success");
            navigation.goBack();
          },
          () => {
            // 失敗時のコールバック
            console.log("DELETE Failed.");
            openErrorDialog();
            return true;  // return true でロールバックする
        });
      },
      () => { console.log("deleteData Failed All."); },
      () => { console.log("deleteData Success All."); }
    );
  }

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.sectionContainer}>
        <DataTable style={[styles.roundedList, {backgroundColor: theme.colors.surface}]}>
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
          <DataTable.Row style={styles.bb0}>
            <DataTable.Cell>合計</DataTable.Cell>
            <DataTable.Cell numeric>{items.sum}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <List.Section style={[styles.roundedList, {backgroundColor: theme.colors.surface}]}>
          <List.Item title="データを削除" titleStyle={{color: theme.colors.error}} onPress={deleteData} />
        </List.Section>
      </SafeAreaView>
      <Portal>
        <Dialog visible={isErrorDialogOpen} onDismiss={closeErrorDialog} style={{backgroundColor: theme.colors.surface}}>
          <Dialog.Title>エラー</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">問題が発生しました</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={closeErrorDialog}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  bb0: {
    borderBottomWidth: 0,
  },
});

export default DetailScreen;