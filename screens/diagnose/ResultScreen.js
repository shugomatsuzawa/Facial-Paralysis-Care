import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { useTheme, DataTable, Button, Dialog, Portal, Text, ProgressBar, Card } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

const DiagnoseResultScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const params = route.params
  // console.debug(params);
  const db = SQLite.openDatabase('FacialParalysisCare.db');
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const openErrorDialog = () => setIsErrorDialogOpen(true);
  const closeErrorDialog = () => setIsErrorDialogOpen(false);
  const [errorTitle, setErrorTitle] = useState('操作を完了できませんでした');
  const [errorDescription, setErrorDescription] = useState('不明なエラーが発生しました。');

  const paramsArray = [
    params.ansei,
    params.hitai,
    params.karui_heigan,
    params.tsuyoi_heigan,
    params.katame,
    params.biyoku,
    params.hoho,
    params.eee,
    params.kuchibue,
    params.henoji,
  ];
  const paramsSum = paramsArray.reduce((accumulator, current) => accumulator + current);
  const scoreBar = paramsSum / 40;

  const saveData = () => {
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
          () => {
            // 失敗時のコールバック
            console.error("CREATE TABLE Failed.");
            return true;  // return true でロールバックする
        });

        tx.executeSql(
          "INSERT INTO health_data( \
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
          VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
          paramsArray,
          () => {
            console.log("INSERT TABLE Success.");
            if (paramsSum >= 20) {
              db.transaction((tx) => {
                  tx.executeSql(
                    "SELECT \
                      ( \
                        SELECT \
                        COUNT(rowid) \
                        FROM \
                          health_data \
                        LIMIT \
                          2 \
                      ) AS has_data, \
                      ( \
                        SELECT \
                        COUNT(rowid) \
                        FROM \
                          health_data \
                        WHERE \
                          ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji >= 40 \
                        LIMIT \
                          2 \
                      ) AS has_40, \
                      ( \
                        SELECT \
                        COUNT(rowid) \
                        FROM \
                          health_data \
                        WHERE \
                          ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji >= 20 \
                        LIMIT \
                          2 \
                      ) AS has_20 \
                    ;",
                    [],
                    (_, resultSet) => {
                      // 成功時のコールバック
                      // console.debug("resultSet:" + JSON.stringify(resultSet.rows._array));
                      const hasData = resultSet.rows._array[0].has_data;
                      const has40 = resultSet.rows._array[0].has_40;
                      const has20 = resultSet.rows._array[0].has_20;
                      console.log("SELECT TABLE Success. (hasData:" + hasData + ", has40:" + has40 + ", has20:" + has20 + ")");
                      if (hasData > 1 && has40 <= 1 && paramsSum >= 40) {
                        navigation.navigate('DiagnoseCongratulation', { isFirst: '40' });
                      } else if (hasData > 1 && has20 <= 1 && paramsSum >= 20) {
                        console.log("Is First 20");
                        navigation.navigate('DiagnoseCongratulation', { isFirst: '20' });
                      } else {
                        console.log("Is Else");
                        navigation.popToTop();
                      }
                    },
                    () => {
                      // 失敗時のコールバック
                      console.error("SELECT TABLE Failed.");
                      return false;  // return true でロールバックする
                  });
                },
                () => { console.error("SELECT TABLE Failed All."); },
                () => { console.log("SELECT TABLE Success All."); }
              );
            } else {
              console.log("Is Not paramsSum >= 20");
              navigation.popToTop();
            }
          },
          () => {
            // 失敗時のコールバック
            console.error("INSERT TABLE Failed.");
            openErrorDialog();
            return true;  // return true でロールバックする
        });
      },
      () => { console.error("saveData Failed All."); },
      () => { console.log("saveData Success All."); }
    );
  };

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.colors.dynamic.background}]} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={styles.sectionContainer}>
        <DataTable style={[styles.roundedList, {backgroundColor: theme.colors.dynamic.surface}]}>
          <DataTable.Row>
            <DataTable.Cell>安静時非対称</DataTable.Cell>
            <DataTable.Cell numeric>{params.ansei == 4 ? 'ほぼ正常(' + params.ansei + ')' : params.ansei == 2 ? '少し非対称(' + params.ansei + ')' : params.ansei == 0 ? 'かなり非対称(' + params.ansei + ')' : '**エラー**(' + params.ansei + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>額のしわ寄せ</DataTable.Cell>
            <DataTable.Cell numeric>{params.hitai == 4 ? '動く(' + params.hitai + ')' : params.hitai == 2 ? '少し動く(' + params.hitai + ')' : params.hitai == 0 ? '動かない(' + params.hitai + ')' : '**エラー**(' + params.hitai + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>軽い閉眼</DataTable.Cell>
            <DataTable.Cell numeric>{params.karui_heigan == 4 ? '動く(' + params.karui_heigan + ')' : params.karui_heigan == 2 ? '少し動く(' + params.karui_heigan + ')' : params.karui_heigan == 0 ? '動かない(' + params.karui_heigan + ')' : '**エラー**(' + params.karui_heigan + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>強い閉眼</DataTable.Cell>
            <DataTable.Cell numeric>{params.tsuyoi_heigan == 4 ? '動く(' + params.tsuyoi_heigan + ')' : params.tsuyoi_heigan == 2 ? '少し動く(' + params.tsuyoi_heigan + ')' : params.tsuyoi_heigan == 0 ? '動かない(' + params.tsuyoi_heigan + ')' : '**エラー**(' + params.tsuyoi_heigan + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>片目つぶり</DataTable.Cell>
            <DataTable.Cell numeric>{params.katame == 4 ? '動く(' + params.katame + ')' : params.katame == 2 ? '少し動く(' + params.katame + ')' : params.katame == 0 ? '動かない(' + params.katame + ')' : '**エラー**(' + params.katame + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>鼻翼を動かす</DataTable.Cell>
            <DataTable.Cell numeric>{params.biyoku == 4 ? '動く(' + params.biyoku + ')' : params.biyoku == 2 ? '少し動く(' + params.biyoku + ')' : params.biyoku == 0 ? '動かない(' + params.biyoku + ')' : '**エラー**(' + params.biyoku + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>頬を膨らます</DataTable.Cell>
            <DataTable.Cell numeric>{params.hoho == 4 ? '動く(' + params.hoho + ')' : params.hoho == 2 ? '少し動く(' + params.hoho + ')' : params.hoho == 0 ? '動かない(' + params.hoho + ')' : '**エラー**(' + params.hoho + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>イーと歯を見せる</DataTable.Cell>
            <DataTable.Cell numeric>{params.eee == 4 ? '動く(' + params.eee + ')' : params.eee == 2 ? '少し動く(' + params.eee + ')' : params.eee == 0 ? '動かない(' + params.eee + ')' : '**エラー**(' + params.eee + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>口笛</DataTable.Cell>
            <DataTable.Cell numeric>{params.kuchibue == 4 ? '動く(' + params.kuchibue + ')' : params.kuchibue == 2 ? '少し動く(' + params.kuchibue + ')' : params.kuchibue == 0 ? '動かない(' + params.kuchibue + ')' : '**エラー**(' + params.kuchibue + ')'}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.bb0}>
            <DataTable.Cell>口をへの字に曲げる</DataTable.Cell>
            <DataTable.Cell numeric>{params.henoji == 4 ? '動く(' + params.henoji + ')' : params.henoji == 2 ? '少し動く(' + params.henoji + ')' : params.henoji == 0 ? '動かない(' + params.henoji + ')' : '**エラー**(' + params.henoji + ')'}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <Card mode="contained" style={[styles.mt10, {backgroundColor: theme.colors.surface}]}>
          <Card.Title title="合計" />
          <Card.Content>
            <View style={styles.scoreSum}>
              <Text variant="displayLarge" style={{color: theme.colors.dynamic.primary}}>{paramsSum}</Text>
              <Text variant="labelMedium" style={{color: theme.colors.dynamic.secondary}}> / 40</Text>
            </View>
            <ProgressBar progress={scoreBar} />
          </Card.Content>
        </Card>
        <Button mode="contained" style={styles.mt10} onPress={saveData}>保存</Button>
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
  scoreSum: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  mt10: {
    marginTop: 10,
  },
  bb0: {
    borderBottomWidth: 0,
  },
});

export default DiagnoseResultScreen;