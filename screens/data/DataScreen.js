import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme, DataTable, List, Button, Dialog, Portal, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useSQLiteContext, deleteDatabaseAsync } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

const DataScreen = ({ navigation }) => {
  const theme = useTheme();
  const db = useSQLiteContext();
  const [items, setItems] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState('操作を完了できませんでした');
  const [errorDescription, setErrorDescription] = useState('不明なエラーが発生しました。');

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          // 実行したいSQL
          const rows = await db.getAllAsync(`
            SELECT
              rowid AS id,
              strftime('%m月%d日 %H:%M', created_at, 'unixepoch', 'localtime') AS date,
              ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji AS score
            FROM
              health_data
            ORDER BY
              created_at DESC;
          `, []);
          setItems(rows);
        } catch (error) {
          console.warn(error);
          setItems([]);
        }
      })();
    }, [])
  );

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);
  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);
  const openErrorDialog = () => setIsErrorDialogOpen(true);
  const closeErrorDialog = () => setIsErrorDialogOpen(false);
  const deleteDatabase = async () => {
    try {
      await db.closeAsync();
    } catch (e) {
      console.warn('closeAsync Failed.', e);
    }
    try {
      await deleteDatabaseAsync('FacialParalysisCare.db');
      closeDeleteDialog();
      navigation.popToTop();
    } catch (e) {
      console.error('deleteDatabaseAsync Failed.', e);
      closeDeleteDialog();
      openErrorDialog();
    }
  }

  const today = new Date().toLocaleString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).split(/\/| |:/).join("-");
  // console.debug(today);
  const exportFile = () => {
    (async () => {
      try {
        // 実行したいSQL
        const rows = await db.getAllAsync(`
          SELECT
            *
          FROM
            health_data;
        `, []);
        let fileName = "FacialParalysisCare_" + String(today);
        let fileUri = FileSystem.cacheDirectory + fileName + ".json";
        let txtFile = JSON.stringify(rows);
        await FileSystem.writeAsStringAsync(fileUri, txtFile, { encoding: FileSystem.EncodingType.UTF8 });
        await Sharing.shareAsync(fileUri, {mimeType: 'application/json'});
        await FileSystem.deleteAsync(fileUri);
        console.log('Export Table Success All.');
      } catch (error) {
        console.error(error);
        setItems([]);
      }
    })();
  }

  const importFile = async () => {
    const { assets, canceled } = await DocumentPicker.getDocumentAsync({multiple: false, type: 'application/json'});
    if (canceled === false) {
      const fileUri = assets[0].uri;
      console.debug(fileUri);
      const txtFileRaw = await FileSystem.readAsStringAsync(fileUri);
      try{
        const txtFile = JSON.parse(txtFileRaw);

        try {
          // 実行したいSQL
          await db.execAsync(`
            CREATE TABLE IF NOT EXISTS health_data(
              created_at INTEGER UNIQUE NOT NULL DEFAULT (strftime('%s','now')),
              ansei INTEGER,
              hitai INTEGER,
              karui_heigan INTEGER,
              tsuyoi_heigan INTEGER,
              katame INTEGER,
              biyoku INTEGER,
              hoho INTEGER,
              eee INTEGER,
              kuchibue INTEGER,
              henoji INTEGER
            );
          `);
          await db.withTransactionAsync(async () => {
            for (const item of txtFile) {
              await db.runAsync(`
                INSERT INTO health_data(
                  created_at,
                  ansei,
                  hitai,
                  karui_heigan,
                  tsuyoi_heigan,
                  katame,
                  biyoku,
                  hoho,
                  eee,
                  kuchibue,
                  henoji
                )
                VALUES(
                  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )
                ON CONFLICT(
                  created_at
                )
                DO NOTHING;
              `, [
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
                item.henoji,
              ]);
            }
          });
          console.log('Import Table Success All.');
          navigation.replace('Data');
        } catch (error) {
          console.error('Import Table Failed All.', error);
          openErrorDialog();
        }
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
    <ScrollView style={[styles.container, {backgroundColor: theme.colors.dynamic.background}]} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.sectionContainer}>
        {items.length > 0 ? (
        <DataTable style={[styles.roundedList, {backgroundColor: theme.colors.dynamic.surface}]}>
          {items.map((item, index) => (
            <DataTable.Row key={item.id} onPress={() => navigation.navigate('DataDetail',{ id: item.id, })} style={[index === items.length - 1 ? styles.bb0 : '', styles.tableMark, item.score >= 40 ? {borderStartColor: theme.colors.badgeGold} : item.score >= 20 ? {borderStartColor: theme.colors.badgeSilver} : {borderStartColor: 'transparent'}]}>
              <DataTable.Cell>{item.score}</DataTable.Cell>
              <DataTable.Cell numeric textStyle={{color: theme.colors.dynamic.onSurfaceVariant}}>{item.date}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        ) : (
          <Text variant="labelLarge">データなし</Text>
        )}
        <List.Section style={[styles.roundedList, {backgroundColor: theme.colors.dynamic.surface}]}>
          <List.Item title="インポート" titleStyle={{color: theme.colors.dynamic.primary}} style={[styles.bb1, {borderBottomColor: theme.colors.dynamic.outlineVariant}]} onPress={importFile} />
          <List.Item title="エクスポート" titleStyle={items.length ? {color: theme.colors.dynamic.primary} : {color: theme.colors.dynamic.onSurfaceDisabled}} style={[styles.bb1, {borderBottomColor: theme.colors.dynamic.outlineVariant}]} onPress={items.length ? exportFile : ""} />
          <List.Item title="全てのデータを削除" titleStyle={items.length ? {color: theme.colors.dynamic.error} : {color: theme.colors.dynamic.onSurfaceDisabled}} onPress={items.length ? openDeleteDialog : ""} />
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
