import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text variant="headlineLarge">顔面神経麻痺に関する詳しい情報</Text>
        <Text variant="bodyMedium">顔面神経麻痺の症状が現れた場合、早期に適切な治療を受けることが非常に重要です。まだ受診がお済みでない方はすぐにお近くの耳鼻咽喉科を受診してください。</Text>
        <Text variant="bodyMedium">実際に顔面神経麻痺と診断された患者さんにおかれましては、ショックを受けていることと思います。症状が出た時は突然のことで、急に日常生活に支障が出てしまうため、精神的な負担も大きいでしょう。</Text>
        <Text variant="bodyMedium">しかしながら、顔面神経麻痺は、適切な治療を受ければ多くの場合回復が期待できる病気です。特に、早期の治療が重要であり、多くの患者さんが完全に回復することができます。</Text>
        <Text variant="bodyMedium">また、周りの人々からのサポートも非常に大切です。ご家族や友人に話を聞いてもらったり、話すことで気持ちを整理することができます。また、医療スタッフに相談して治療方針を決めることも大切です。</Text>
        <Text variant="bodyMedium">医療スタッフが患者さんに対して十分な情報提供やサポートを行っていますので、どうか心配しないでください。一緒に治療に取り組み、完全な回復を目指しましょう。</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text variant="headlineMedium">病気について</Text>
        <Text variant="bodyMedium">顔面神経麻痺とは、顔の筋肉を動かす神経である「顔面神経」が一時的にもしくは永久的に損傷を受けることによって起こる症状のことを言います。</Text>
        <Text variant="bodyMedium">顔面神経麻痺が起こる原因は、ウイルス感染やストレス、頭部外傷などが挙げられます。症状としては、顔の片側の筋肉が動かなくなる、口を閉じることができない、目が開けにくい、食べ物が口から漏れるなどがあります。また、顔面神経麻痺の場合、耳の中に異常を感じることもあるとされています。</Text>
        <Text variant="bodyMedium">顔面神経麻痺の治療法は、症状の程度によって異なります。軽度の場合は、時間が経過することで自然に改善することがあります。また、顔の筋肉を刺激する運動やマッサージなどを行うことで、症状の改善が期待できることもあります。</Text>
        <Text variant="bodyMedium">重度の場合には、抗ウイルス薬やステロイド薬の投与、手術などの治療法があります。手術は、筋肉を支える手術や、神経を修復する手術がありますが、手術にはリスクが伴うため、症状の程度や病状によって適切な治療法を選択する必要があります。</Text>
        <Text variant="bodyMedium">顔面神経麻痺は、一時的なものであっても日常生活に支障をきたすことがあります。症状が出た場合は、早めに医療機関を受診し、適切な治療を受けることが大切です。</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
});

export default AboutScreen;