import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme, DataTable, List, Button, Dialog, Portal, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

const DataScreen = ({ navigation }) => {
  const theme = useTheme();
  const db = SQLite.openDatabase('FacialParalysisCare.db');
  const [items, setItems] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState('操作を完了できませんでした');
  const [errorDescription, setErrorDescription] = useState('不明なエラーが発生しました。');

  useFocusEffect(
    React.useCallback(() => {
      db.transaction((tx) => {
          // 実行したいSQL
          tx.executeSql(
            "SELECT \
              rowid AS id, \
              strftime('%m月%d日 %H:%M', created_at, 'unixepoch', 'localtime') AS date, \
              ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji AS score \
            FROM \
              health_data \
            ORDER BY \
              created_at DESC \
            ;",
            [],
            (_, resultSet) => {
              // 成功時のコールバック
              console.log("SELECT TABLE Success.");
              // console.log("select result:" + JSON.stringify(resultSet.rows._array));
              setItems(resultSet.rows._array);
            },
            (_, error) => {
              // 失敗時のコールバック
              console.warn(error);
              setItems([]);
              return false;  // return true でロールバックする
          });
        },
        () => { console.warn("SELECT TABLE Failed All."); },
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
      console.error("closeAsync Failed.");
      closeDeleteDialog();
      openErrorDialog();
    } else if ( !db.deleteAsync() ) {
      console.error("deleteAsync Failed.");
      closeDeleteDialog();
      openErrorDialog();
    } else if ( db.deleteAsync() ) {
      closeDeleteDialog();
      navigation.popToTop();
    }
  }

  const today = new Date().toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).split(/\/| |:/).join("-");
  // console.debug(today);
  const exportFile = () => {
    db.transaction((tx) => {
        // 実行したいSQL
        tx.executeSql(
          "SELECT \
            * \
          FROM \
            health_data \
          ;",
          [],
          (_, resultSet) => {
            // 成功時のコールバック
            console.log("SELECT TABLE Success.");
            // console.debug("select result:" + JSON.stringify(resultSet.rows._array));
            (async () => {
            let fileName = "FacialParalysisCare_" + String(today);
            let fileUri = FileSystem.cacheDirectory + fileName + ".json";
            let txtFile = JSON.stringify(resultSet.rows._array);
            await FileSystem.writeAsStringAsync(fileUri, txtFile, { encoding: FileSystem.EncodingType.UTF8 });
            await Sharing.shareAsync(fileUri, {mimeType: 'application/json'});
            await FileSystem.deleteAsync(fileUri);
            })();
          },
          (_, error) => {
            // 失敗時のコールバック
            console.error(error);
            setItems([]);
            return false;  // return true でロールバックする
        });
      },
      () => { console.error("Export Table Failed All."); },
      () => { console.log("Export Table Success All."); }
    );
  }

  const importFile = async () => {
    const { type, uri } = await DocumentPicker.getDocumentAsync({type: 'application/json'});
    if (type === 'success') {
      const fileUri = uri;
      console.debug(fileUri);
      const txtFileRaw = await FileSystem.readAsStringAsync(fileUri);
      try{
        const txtFile = JSON.parse(txtFileRaw);

        db.transaction((tx) => {
            // 実行したいSQL
            tx.executeSql(
              "CREATE TABLE IF NOT EXISTS health_data( \
                created_at INTEGER UNIQUE NOT NULL DEFAULT (strftime('%s','now')), \
                ansei INTEGER, \
                hitai INTEGER, \
                karui_heigan INTEGER, \
                tsuyoi_heigan INTEGER, \
                katame INTEGER, \
                biyoku INTEGER, \
                hoho INTEGER, \
                eee INTEGER, \
                kuchibue INTEGER, \
                henoji INTEGER \
              );",
              null,
              () => {
                // 成功時のコールバック
                console.log("CREATE TABLE Success.");
              },
              (_, error) => {
                // 失敗時のコールバック
                console.error(error);
                return true;  // return true でロールバックする
            });

            txtFile.map((item) => {
              // console.debug(item);
              tx.executeSql(
                "INSERT INTO health_data( \
                  created_at, \
                  ansei, \
                  hitai, \
                  karui_heigan, \
                  tsuyoi_heigan, \
                  katame, \
                  biyoku, \
                  hoho, \
                  eee, \
                  kuchibue, \
                  henoji \
                ) \
                VALUES( \
                  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? \
                ) \
                ON CONFLICT( \
                  created_at \
                ) \
                DO NOTHING \
                ;",
                [
                  item.created_at,
                  item.ansei,
                  item.hitai,
                  item.karui_heigan,
                  item.tsuyoi_heigan,
                  item.katame,
                  item.biyoku,
                  item.hoho,
                  item.eee,
                  item.kuchibue,
                  item.henoji
                ],
                () => {
                  console.log("INSERT TABLE Success.");
                  navigation.replace('Data');
                },
                (_, error) => {
                  // 失敗時のコールバック
                  console.error(error);
                  openErrorDialog();
                  return true;  // return true でロールバックする
              });
            })
          },
          () => { console.error("Import Table Failed All."); },
          () => { console.log("Import Table Success All."); }
        );
      }catch(e){
        console.error(e);
        setErrorDescription('選択したファイルに問題がある可能性があります。');
        openErrorDialog();
      }
      await FileSystem.deleteAsync(fileUri);
    } else {
      console.log('DocumentPicker Cancelled');
    }
  }

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.sectionContainer}>
        {items.length > 0 ? (
        <DataTable style={[styles.roundedList, {backgroundColor: theme.colors.surface}]}>
          {items.map((item, index) => (
            <DataTable.Row key={item.id} onPress={() => navigation.navigate('DataDetail',{ id: item.id, })} style={[index === items.length - 1 ? styles.bb0 : '', styles.tableMark, item.score >= 40 ? {borderStartColor: theme.colors.badgeGold} : item.score >= 20 ? {borderStartColor: theme.colors.badgeSilver} : {borderStartColor: 'transparent'}]}>
              <DataTable.Cell>{item.score}</DataTable.Cell>
              <DataTable.Cell numeric textStyle={{color: theme.colors.onSurfaceVariant}}>{item.date}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        ) : (
          <Text variant="labelLarge">データなし</Text>
        )}
        <List.Section style={[styles.roundedList, {backgroundColor: theme.colors.surface}]}>
          <List.Item title="インポート" titleStyle={{color: theme.colors.primary}} style={[styles.bb1, {borderBottomColor: theme.colors.outlineVariant}]} onPress={importFile} />
          <List.Item title="エクスポート" titleStyle={items.length ? {color: theme.colors.primary} : {color: theme.colors.onSurfaceDisabled}} style={[styles.bb1, {borderBottomColor: theme.colors.outlineVariant}]} onPress={items.length ? exportFile : ""} />
          <List.Item title="全てのデータを削除" titleStyle={items.length ? {color: theme.colors.error} : {color: theme.colors.onSurfaceDisabled}} onPress={items.length ? openDeleteDialog : ""} />
        </List.Section>
      </SafeAreaView>
      <Portal>
        <Dialog visible={isDeleteDialogOpen} onDismiss={closeDeleteDialog} style={{backgroundColor: theme.colors.surface}}>
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
        <Dialog visible={isErrorDialogOpen} onDismiss={closeErrorDialog} style={{backgroundColor: theme.colors.surface}}>
          <Dialog.Title>{errorTitle}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{errorDescription}</Text>
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
    overflow: 'hidden',
  },
  tableMark: {
    borderStartWidth: 5,
  },
  bb0: {
    borderBottomWidth: 0,
  },
  bb1: {
    borderBottomWidth: 1,
  },
});

export default DataScreen;