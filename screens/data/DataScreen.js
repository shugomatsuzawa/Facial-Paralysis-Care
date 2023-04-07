import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { DataTable, List, Button, Dialog, Portal, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const DataScreen = ({ navigation }) => {
  // console.log(props)
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
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <DataTable style={styles.bg_white}>
          {items.map((item, index) => (
            <DataTable.Row key={item.id} onPress={() => navigation.navigate('DataDetail',{ id: item.id, })}>
              <DataTable.Cell>{item.score}</DataTable.Cell>
              <DataTable.Cell numeric>{item.date}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <List.Section style={styles.bg_white}>
          {/* <List.Item title="インポート" titleStyle={styles.labelBlue} /> */}
          {/* <List.Item title="エクスポート" titleStyle={items.length ? styles.labelBlue : styles.labelDisabled } /> */}
          <List.Item title="全てのデータを削除" titleStyle={items.length ? styles.labelRed : styles.labelDisabled } onPress={items.length ? openDeleteDialog : ""} />
        </List.Section>
      </View>
      <Portal>
        <Dialog visible={isDeleteDialogOpen} onDismiss={closeDeleteDialog}>
          <Dialog.Icon icon="alert" />
          <Dialog.Title>全てのデータを削除します</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">変更は元には戻せません。よろしいですか？</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button textColor="red" onPress={deleteDatabase}>削除</Button>
            <Button onPress={closeDeleteDialog}>キャンセル</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={isErrorDialogOpen} onDismiss={closeErrorDialog}>
          <Dialog.Icon icon="alert" />
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
    </View>
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
  labelRed: {
    color: 'red',
  },
  labelBlue: {
    color: 'blue',
  },
  labelDisabled: {
    color: 'gray',
  },
  bg_white: {
    backgroundColor: '#fff',
  },
});

export default DataScreen;