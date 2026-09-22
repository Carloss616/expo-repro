import { Link, Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

/** One entry per reproduction; each lives in `app/issues/`. */
const ISSUES = [
  {
    href: '/issues/expo-ui-host-matchcontents',
    title: '<Host matchContents> jumps when its content resizes (iOS)',
  },
] as const;

export default function Index() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: 'Expo repros' }} />
      {ISSUES.map((issue) => (
        <Link key={issue.href} href={issue.href} style={styles.row}>
          <Text style={styles.title}>{issue.title}</Text>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  title: { fontSize: 16 },
});
