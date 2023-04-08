import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { useTheme, DataTable, Button, Dialog, Portal, Text } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

const DiagnoseResultScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const params = route.params
  // console.log(params);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const openErrorDialog = () => setIsErrorDialogOpen(true);
  const closeErrorDialog = () => setIsErrorDialogOpen(false);
  const saveData = () => {
    const db = SQLite.openDatabase('db');
    db.transaction((tx) => {
        // 実行したいSQL
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS health_data(created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')), ansei INTEGER, hitai INTEGER, karui_heigan INTEGER, tsuyoi_heigan INTEGER, katame INTEGER, biyoku INTEGER, hoho INTEGER, eee INTEGER, kuchibue INTEGER, henoji INTEGER);",
          null,
          () => {
            // 成功時のコールバック
            console.log("CREATE TABLE Success.");
          },
          () => {
            // 失敗時のコールバック
            console.log("CREATE TABLE Failed.");
            return true;  // return true でロールバックする
        });
      },
      () => { console.log("CREATE TABLE Failed All."); },
      () => { console.log("CREATE TABLE Success All."); }
    );
    db.transaction((tx) => {
        // 実行したいSQL
        tx.executeSql(
          "INSERT INTO health_data(ansei, hitai, karui_heigan, tsuyoi_heigan, katame, biyoku, hoho, eee, kuchibue, henoji) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
          [
            JSON.stringify(params.ansei),
            JSON.stringify(params.hitai),
            JSON.stringify(params.karui_heigan),
            JSON.stringify(params.tsuyoi_heigan),
            JSON.stringify(params.katame),
            JSON.stringify(params.biyoku),
            JSON.stringify(params.hoho),
            JSON.stringify(params.eee),
            JSON.stringify(params.kuchibue),
            JSON.stringify(params.henoji),
          ],
          () => {
            // 成功時のコールバック
            console.log("INSERT TABLE Success.");
            navigation.popToTop();
          },
          () => {
            // 失敗時のコールバック
            console.log("INSERT TABLE Failed.");
            openErrorDialog();
            return true;  // return true でロールバックする
        });
      },
      () => { console.log("INSERT TABLE Failed All."); },
      () => { console.log("INSERT TABLE Success All."); }
    );
  }
  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.sectionContainer}>
        <DataTable style={[styles.roundedList, {backgroundColor: theme.colors.surface}]}>
          <DataTable.Row>
            <DataTable.Cell>安静時非対称</DataTable.Cell>
            <DataTable.Cell numeric>{JSON.stringify(params.ansei)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>額のしわ寄せ</DataTable.Cell>
            <DataTable.Cell numeric>{JSON.stringify(params.hitai)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>軽い閉眼</DataTable.Cell>
            <DataTable.Cell numeric>{JSON.stringify(params.karui_heigan)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>強い閉眼</DataTable.Cell>
            <DataTable.Cell numeric>{JSON.stringify(params.tsuyoi_heigan)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>片目つぶり</DataTable.Cell>
            <DataTable.Cell numeric>{JSON.stringify(params.katame)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>鼻翼を動かす</DataTable.Cell>
            <DataTable.Cell numeric>{JSON.stringify(params.biyoku)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>頬を膨らます</DataTable.Cell>
            <DataTable.Cell numeric>{JSON.stringify(params.hoho)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>イーと歯を見せる</DataTable.Cell>
            <DataTable.Cell numeric>{JSON.stringify(params.eee)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>口笛</DataTable.Cell>
            <DataTable.Cell numeric>{JSON.stringify(params.kuchibue)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>口をへの字に曲げる</DataTable.Cell>
            <DataTable.Cell numeric>{JSON.stringify(params.henoji)}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.bb0}>
            <DataTable.Cell>合計</DataTable.Cell>
            <DataTable.Cell numeric></DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <Button mode="contained" style={styles.inputButton} onPress={saveData}>保存</Button>
      </SafeAreaView>
      <Portal>
        <Dialog visible={isErrorDialogOpen} onDismiss={closeErrorDialog}>
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
  inputButton: {
    marginTop: 10,
  },
  bb0: {
    borderBottomWidth: 0,
  },
});

export default DiagnoseResultScreen;