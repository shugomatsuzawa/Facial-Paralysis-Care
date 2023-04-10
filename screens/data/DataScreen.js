import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { useTheme, DataTable, List, Button, Dialog, Portal, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const DataScreen = ({ navigation }) => {
  const theme = useTheme();
  const db = SQLite.openDatabase('db');
  const [items, setItems] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      db.transaction((tx) => {
          // 実行したいSQL
          tx.executeSql(
            "SELECT rowid AS id, strftime('%m月%d日 %H:%M', created_at, 'unixepoch', 'localtime') AS date, ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji AS score FROM health_data;",
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

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);
  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);
  const openErrorDialog = () => setIsErrorDialogOpen(true);
  const closeErrorDialog = () => setIsErrorDialogOpen(false);
  const deleteDatabase = () => {
    if ( !db.closeAsync() ){
      console.log("closeAsync Failed.");
      closeDeleteDialog();
      openErrorDialog();
    } else if ( !db.deleteAsync() ) {
      console.log("deleteAsync Failed.");
      closeDeleteDialog();
      openErrorDialog();
    } else if ( db.deleteAsync() ) {
      closeDeleteDialog();
      navigation.popToTop();
    }
  }

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.sectionContainer}>
        <DataTable style={[styles.roundedList, {backgroundColor: theme.colors.surface}]}>
          {items.map((item, index) => (
            <DataTable.Row key={item.id} onPress={() => navigation.navigate('DataDetail',{ id: item.id, })} style={index === items.length - 1 ? styles.bb0 : ''}>
              <DataTable.Cell>{item.score}</DataTable.Cell>
              <DataTable.Cell numeric textStyle={{color: theme.colors.onSurfaceVariant}}>{item.date}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <List.Section style={[styles.roundedList, {backgroundColor: theme.colors.surface}]}>
          {/* <List.Item title="インポート" titleStyle={{color: theme.colors.primary}} style={[styles.bb1, {borderBottomColor: theme.colors.outlineVariant}]} /> */}
          {/* <List.Item title="エクスポート" titleStyle={items.length ? {color: theme.colors.primary} : {color: theme.colors.onSurfaceDisabled}} style={[styles.bb1, {borderBottomColor: theme.colors.outlineVariant}]} /> */}
          <List.Item title="全てのデータを削除" titleStyle={items.length ? {color: theme.colors.error} : {color: theme.colors.onSurfaceDisabled}} onPress={items.length ? openDeleteDialog : ""} />
        </List.Section>
      </SafeAreaView>
      <Portal>
        <Dialog visible={isDeleteDialogOpen} onDismiss={closeDeleteDialog}>
          <Dialog.Title>全てのデータを削除します</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">変更は元には戻せません。よろしいですか？</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor={theme.colors.error} onPress={deleteDatabase}>削除</Button>
            <Button onPress={closeDeleteDialog}>キャンセル</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  bb0: {
    borderBottomWidth: 0,
  },
  bb1: {
    borderBottomWidth: 1,
  },
});

export default DataScreen;