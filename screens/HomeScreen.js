import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useTheme, Card, List, Button, Text, Badge } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import AdventureImage from '../components/AdventureImage';

LocaleConfig.locales['jp'] = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
  today: "今日"
};
LocaleConfig.defaultLocale = 'jp';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const db = SQLite.openDatabase('FacialParalysisCare.db');
  const [items, setItems] = useState([]);
  const today = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit",}).split("/").join("-");
  // console.debug(today)
  const [calendarKey, setCalendarKey] = useState(0);
  const reloadCalendar = () => {
    setCalendarKey(calendarKey + 1);
  };

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
                  strftime('%Y-%m-%d', created_at, 'unixepoch', 'localtime') AS date_string, \
                  ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji AS score, \
                  row_number() over ( \
                    PARTITION BY \
                      date(created_at, 'unixepoch', 'localtime') \
                    ORDER BY \
                      ansei + hitai + karui_heigan + tsuyoi_heigan + katame + biyoku + hoho + eee + kuchibue + henoji DESC \
                  ) date_id \
                FROM \
                  health_data \
              ) with_date_id \
            WHERE \
              date_id = 1 \
            ;",
            [],
            (_, resultSet) => {
              // 成功時のコールバック
              console.log("SELECT TABLE Success.");
              // console.debug("select result:" + JSON.stringify(resultSet.rows._array));
              setItems(resultSet.rows._array);
            },
            () => {
              // 失敗時のコールバック
              console.warn("SELECT TABLE Failed.");
              setItems([]);
              return false;  // return true でロールバックする
          });
        },
        () => { console.warn("SELECT TABLE Failed All."); },
        () => { console.log("SELECT TABLE Success All."); }
      );
    }, [])
  );

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView style={{backgroundColor: theme.colors.surface}}>
        <CalendarList
          current={today}
          key={calendarKey}
          monthFormat={'yyyy年 M月'}
          staticHeader
          calendarHeight={400}
          horizontal={true}
          pagingEnabled={true}
          maxDate={today}
          style = {{ backgroundColor: theme.colors.surface }}
          dayComponent={({date, state}) => {
            const item = items.find((v) => v.date_string === date.dateString);
            if (item) {
              return (
                <Pressable onPress={() => navigation.navigate('DataDetail',{ id: item.id, })} style={styles.calendarDayInner}>
                  <Text style={state === 'disabled' ? {color: theme.colors.onSurfaceDisabled} : ''}>{date.day}</Text>
                  <Badge style={[styles.calendarDayBadge, item.score >= 40 ? {backgroundColor: theme.colors.badgeGold, color: theme.colors.onBadgeGold} : item.score >= 20 ? {backgroundColor: theme.colors.badgeSilver, color: theme.colors.onBadgeSilver} : {backgroundColor: theme.colors.primary, color: theme.colors.onPrimary}, state === 'today' ? [styles.calendarDayBadgeBorder, {borderColor: theme.colors.onSurface}] : '']}>{JSON.stringify(item.score)}</Badge>
                  {/* <Text>{JSON.stringify(state)}</Text> */}
                </Pressable>
              );
            } else {
              return (
                <View style={styles.calendarDayInner}>
                  <Text style={state === 'disabled' ? {color: theme.colors.onSurfaceDisabled} : ''}>{date.day}</Text>
                  <Badge style={[styles.calendarDayBadge, {backgroundColor: theme.colors.surfaceDisabled}, state === 'today' ? [styles.calendarDayBadgeBorder, {borderColor: theme.colors.onSurface}] : '']} />
                  {/* <Text>{JSON.stringify(state)}</Text> */}
                </View>
              );
            }
          }}
          theme={{
            calendarBackground: theme.colors.surface,
            textSectionTitleColor: theme.colors.onSurface,
            textSectionTitleDisabledColor: theme.colors.onSurfaceDisabled,
            monthTextColor: theme.colors.onSurface,
            arrowColor: theme.colors.primary,
            'stylesheet.calendar.header': {
              week: {
                marginTop: 16,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                borderBottomWidth: 1,
                borderBottomColor: theme.colors.outlineVariant,
              }
            },
            'stylesheet.calendar.main': {
              dayContainer: {
                flex: 1,
                alignItems: 'center',
              },
              emptyDayContainer: {
                flex: 1,
              },
            }
          }}
        />
        <View style={styles.calendarButtons}>
          <Button onPress={reloadCalendar}>今日</Button>
          <Button onPress={() => navigation.navigate('Data')}>全てのデータを表示</Button>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.sectionContainer}>
        <List.Section style={[styles.roundedList, {backgroundColor: theme.colors.surface}]}>
          <List.Item title="今日のテスト" onPress={() => navigation.navigate('Diagnose01')} left={() => <List.Icon icon="stethoscope" color={theme.colors.secondary} />} right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceDisabled} />} style={[styles.iconList, styles.bb1, {borderBottomColor: theme.colors.outlineVariant}]} />
          <List.Item title="今日のトレーニング（記録なし）" onPress={() => navigation.navigate('Training01')} left={() => <List.Icon icon="dumbbell" color={theme.colors.tertiary} />} right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceDisabled} />} style={styles.iconList} />
        </List.Section>
        <Card onPress={() => navigation.navigate('About')} style={[styles.mt10, {backgroundColor: theme.colors.primaryContainer}]}>
          <Card.Content style={styles.mt10}>
            <Text variant="titleLarge">はじめに</Text>
            <Text variant="bodyMedium">アプリの詳細情報と、顔面神経麻痺という病気について学びます。</Text>
          </Card.Content>
          <Card.Content style={styles.cardCover}>
            <AdventureImage style={{width: '100%', height: 180, objectFit: 'contain',}} />
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
  calendarDayInner: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  calendarDayBadge: {
    alignSelf: 'auto',
  },
  calendarDayBadgeBorder: {
    borderWidth: 3,
    lineHeight: 14,
    paddingHorizontal: 0.
  },
  calendarButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  roundedList: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  iconList: {
    paddingHorizontal: 16,
  },
  cardCover: {
    marginTop: 10,
    paddingBottom: 0,
  },
  mt10: {
    marginTop: 10,
  },
  bb1: {
    borderBottomWidth: 1,
  },
});

export default HomeScreen;