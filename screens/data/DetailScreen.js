import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme, DataTable, List, Button, Dialog, Portal, Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

const DetailScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const db = SQLite.openDatabase('FacialParalysisCare.db');
  const [items, setItems] = useState([]);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState('操作を完了できませんでした');
  const [errorDescription, setErrorDescription] = useState('不明なエラーが発生しました。');
  const params = route.params

  useFocusEffect(
    React.useCallback(() => {
      db.transaction((tx) => {
          // 実行したいSQL
          tx.executeSql(
            "SELECT \
              rowid AS id, \
              strftime('%Y/%m/%d %H:%M:%S', created_at, 'unixepoch', 'localtime') AS date, \
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
              // console.debug("select result:" + JSON.stringify(resultSet.rows._array[0]));
              setItems(resultSet.rows._array[0]);
            },
            () => {
              // 失敗時のコールバック
              console.error("SELECT TABLE Failed.");
              openErrorDialog();
              setItems([]);
              return false;  // return true でロールバックする
          });
        },
        () => { console.error("SELECT TABLE Failed All."); },
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
            console.error("DELETE Failed.");
            openErrorDialog();
            return true;  // return true でロールバックする
        });
      },
      () => { console.error("deleteData Failed All."); },
      () => { console.log("deleteData Success All."); }
    );
  }

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.colors.dynamic.background}]} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.sectionContainer}>
        <DataTable style={[styles.roundedList, {backgroundColor: theme.colors.dynamic.surface}]}>
          <DataTable.Row>
            <DataTable.Cell>日付</DataTable.Cell>
            <DataTable.Cell numeric>{items.date}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>安静時非対称</DataTable.Cell>
            <DataTable.Cell numeric>{items.ansei == 4 ? 'ほぼ正常(' + items.ansei + ')' : items.ansei == 2 ? '少し非対称(' + items.ansei + ')' : items.ansei == 0 ? 'かなり非対称(' + items.ansei + ')' : '**エラー**(' + items.ansei + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>額のしわ寄せ</DataTable.Cell>
            <DataTable.Cell numeric>{items.hitai == 4 ? '動く(' + items.hitai + ')' : items.hitai == 2 ? '少し動く(' + items.hitai + ')' : items.hitai == 0 ? '動かない(' + items.hitai + ')' : '**エラー**(' + items.hitai + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>軽い閉眼</DataTable.Cell>
            <DataTable.Cell numeric>{items.karui_heigan == 4 ? '動く(' + items.karui_heigan + ')' : items.karui_heigan == 2 ? '少し動く(' + items.karui_heigan + ')' : items.karui_heigan == 0 ? '動かない(' + items.karui_heigan + ')' : '**エラー**(' + items.karui_heigan + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>強い閉眼</DataTable.Cell>
            <DataTable.Cell numeric>{items.tsuyoi_heigan == 4 ? '動く(' + items.tsuyoi_heigan + ')' : items.tsuyoi_heigan == 2 ? '少し動く(' + items.tsuyoi_heigan + ')' : items.tsuyoi_heigan == 0 ? '動かない(' + items.tsuyoi_heigan + ')' : '**エラー**(' + items.tsuyoi_heigan + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>片目つぶり</DataTable.Cell>
            <DataTable.Cell numeric>{items.katame == 4 ? '動く(' + items.katame + ')' : items.katame == 2 ? '少し動く(' + items.katame + ')' : items.katame == 0 ? '動かない(' + items.katame + ')' : '**エラー**(' + items.katame + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>鼻翼を動かす</DataTable.Cell>
            <DataTable.Cell numeric>{items.biyoku == 4 ? '動く(' + items.biyoku + ')' : items.biyoku == 2 ? '少し動く(' + items.biyoku + ')' : items.biyoku == 0 ? '動かない(' + items.biyoku + ')' : '**エラー**(' + items.biyoku + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>頬を膨らます</DataTable.Cell>
            <DataTable.Cell numeric>{items.hoho == 4 ? '動く(' + items.hoho + ')' : items.hoho == 2 ? '少し動く(' + items.hoho + ')' : items.hoho == 0 ? '動かない(' + items.hoho + ')' : '**エラー**(' + items.hoho + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>イーと歯を見せる</DataTable.Cell>
            <DataTable.Cell numeric>{items.eee == 4 ? '動く(' + items.eee + ')' : items.eee == 2 ? '少し動く(' + items.eee + ')' : items.eee == 0 ? '動かない(' + items.eee + ')' : '**エラー**(' + items.eee + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>口笛</DataTable.Cell>
            <DataTable.Cell numeric>{items.kuchibue == 4 ? '動く(' + items.kuchibue + ')' : items.kuchibue == 2 ? '少し動く(' + items.kuchibue + ')' : items.kuchibue == 0 ? '動かない(' + items.kuchibue + ')' : '**エラー**(' + items.kuchibue + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>口をへの字に曲げる</DataTable.Cell>
            <DataTable.Cell numeric>{items.henoji == 4 ? '動く(' + items.henoji + ')' : items.henoji == 2 ? '少し動く(' + items.henoji + ')' : items.henoji == 0 ? '動かない(' + items.henoji + ')' : '**エラー**(' + items.henoji + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.bb0}>
            <DataTable.Cell>合計</DataTable.Cell>
            <DataTable.Cell numeric>{items.sum} / 40</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <List.Section style={[styles.roundedList, {backgroundColor: theme.colors.dynamic.surface}]}>
          <List.Item title="データを削除" titleStyle={{color: theme.colors.dynamic.error}} onPress={deleteData} />
        </List.Section>
      </SafeAreaView>
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
  },
  bb0: {
    borderBottomWidth: 0,
  },
});

export default DetailScreen;