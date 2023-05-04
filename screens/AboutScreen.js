import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Image } from 'react-native';
import { useTheme, Text, List } from 'react-native-paper';
import * as Linking from 'expo-linking';
import * as appJson from '../app.json';
import WildernessImage from '../components/WildernessImage';

const AboutScreen = ({ navigation }) => {
  const theme = useTheme();
  const version = appJson.expo.version;

  const openBrowser = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "エラー",
        "このページを開ませんでした",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  return (
    <ScrollView style={styles.container} contentInsetAdjustmentBehavior="automatic">
      <View style={{backgroundColor: theme.colors.surface}}>
        <WildernessImage style={{width: '100%', height: 200, objectFit: 'contain', backgroundColor: theme.colors.primaryContainer}} />
        <SafeAreaView style={styles.sectionContainer}>
          <Text variant="headlineLarge">顔面神経麻痺に関する詳しい情報</Text>
          <Text variant="bodyMedium" style={styles.mt10}>顔面神経麻痺の症状が現れた場合、早期に適切な治療を受けることが非常に重要です。まだ受診がお済みでない方はすぐにお近くの耳鼻咽喉科を受診してください。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>実際に顔面神経麻痺と診断された患者さんにおかれましては、ショックを受けていることと思います。症状が出た時は突然のことで、急に日常生活に支障が出てしまうため、精神的な負担も大きいでしょう。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>しかしながら、顔面神経麻痺は、適切な治療を受ければ多くの場合回復が期待できる病気です。特に、早期の治療が重要であり、多くの患者さんが完全に回復することができます。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>また、周りの人々からのサポートも非常に大切です。ご家族や友人に話を聞いてもらったり、話すことで気持ちを整理することができます。また、医療スタッフに相談して治療方針を決めることも大切です。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>医療スタッフが患者さんに対して十分な情報提供やサポートを行っていますので、どうか心配しないでください。一緒に治療に取り組み、完全な回復を目指しましょう。</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.sectionContainer}>
          <Text variant="headlineMedium">病気について</Text>
          <Text variant="bodyMedium" style={styles.mt10}>顔面神経麻痺（Bell麻痺・Ramsay Hunt症候群）とは、顔の筋肉を動かす神経である「顔面神経」が一時的にもしくは永久的に損傷を受けることによって起こる症状のことを言います。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>顔面神経麻痺が起こる原因は、ウイルス感染やストレス、頭部外傷などが挙げられます。症状としては、顔の片側の筋肉が動かなくなる、口を閉じることができない、目が開けにくい、食べ物が口から漏れるなどがあります。また、顔面神経麻痺の場合、耳の中に異常を感じることもあるとされています。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>顔面神経麻痺の治療法は、症状の程度によって異なります。軽度の場合は、時間が経過することで自然に改善することがあります。また、顔の筋肉を刺激する運動やマッサージなどを行うことで、症状の改善が期待できることもあります。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>重度の場合には、抗ウイルス薬やステロイド薬の投与、手術などの治療法があります。手術は、筋肉を支える手術や、神経を修復する手術がありますが、手術にはリスクが伴うため、症状の程度や病状によって適切な治療法を選択する必要があります。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>顔面神経麻痺は、一時的なものであっても日常生活に支障をきたすことがあります。症状が出た場合は、早めに医療機関を受診し、適切な治療を受けることが大切です。</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.sectionContainer}>
          <Text variant="headlineMedium">このアプリについて</Text>
          <Text variant="bodyMedium" style={styles.mt10}>このアプリては、日本で顔面神経麻痺の重症度の評価に使われている40点法（柳原法）に基づきテストを行います。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>この方法では、顔の筋肉の動きを次の10個のアイテムに分けて評価します。それぞれのアイテムについて、患者さんがどの程度動かすことができるかを「動く（4点）」「やや動く（2点）」「動かない（0点）」の3段階で評価し、その合計点で病気の程度を評価します。合計得点が40点の場合は治癒と判断されます。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>・安静時非対象</Text>
          <Text variant="bodyMedium" style={styles.mt10}>・ひたいの皺寄せ</Text>
          <Text variant="bodyMedium" style={styles.mt10}>・軽い閉眼</Text>
          <Text variant="bodyMedium" style={styles.mt10}>・強い閉眼</Text>
          <Text variant="bodyMedium" style={styles.mt10}>・片目つぶり</Text>
          <Text variant="bodyMedium" style={styles.mt10}>・鼻翼を動かす</Text>
          <Text variant="bodyMedium" style={styles.mt10}>・頬をふくらます</Text>
          <Text variant="bodyMedium" style={styles.mt10}>・イーと歯を見せる</Text>
          <Text variant="bodyMedium" style={styles.mt10}>・口笛</Text>
          <Text variant="bodyMedium" style={styles.mt10}>・口をへの字に曲げる</Text>
          <Text variant="bodyMedium" style={styles.mt10}>このアプリはオープンソースです。このアプリの使用によって発生したいかなる危害や損害について責任を負いません。</Text>
          <Text variant="bodyMedium" style={styles.mt10}>医師のアドバイスに基づいてアプリを使用してください。くれぐれもアプリの結果だけを頼りに医療上の判断を行わないでください。</Text>
        </SafeAreaView>
      </View>
      <SafeAreaView style={styles.sectionContainer}>
        <List.Section style={[styles.roundedList, {backgroundColor: theme.colors.surface}]}>
          <List.Item title="開発者Webサイト" onPress={() => openBrowser('https://shugomatsuzawa.com/works/2023/facial-paralysis-care/')} right={() => <List.Icon icon="open-in-new" color={theme.colors.onSurfaceDisabled} />} style={[styles.bb1, {borderBottomColor: theme.colors.outlineVariant}]} />
          <List.Item title="問題を報告" onPress={() => openBrowser('https://github.com/shugomatsuzawa/Facial-Paralysis-Care/issues')} right={() => <List.Icon icon="open-in-new" color={theme.colors.onSurfaceDisabled} />} style={[styles.bb1, {borderBottomColor: theme.colors.outlineVariant}]} />
          <List.Item title="プライバシーポリシー" onPress={() => navigation.navigate('WebView', { uri: 'https://shugomatsuzawa.com/privacy/' })} right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceDisabled} />} style={[styles.bb1, {borderBottomColor: theme.colors.outlineVariant}]} />
          <List.Item title="謝辞" onPress={() => navigation.navigate('Acknowledgements')} right={() => <List.Icon icon="chevron-right" color={theme.colors.onSurfaceDisabled} />} />
        </List.Section>
        <Text variant="bodyMedium" style={styles.mt10}>バージョン {version}</Text>
        <Text variant="bodyMedium" style={[styles.mt10, {color: theme.colors.onSurfaceDisabled}]}>©︎ 2023 Shugo Matsuzawa</Text>
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
    overflow: 'hidden',
  },
  mt10: {
    marginTop: 10,
  },
  bb1: {
    borderBottomWidth: 1,
  },
});

export default AboutScreen;