import { Link, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

/** One entry per reproduction; each lives in `app/issues/<slug>/`. */
const ISSUES = [
  {
    href: '/issues/expo-ui-host-matchcontents',
    title: '<Host matchContents> jumps when its content resizes',
    packageName: '@expo/ui',
    platforms: 'iOS',
  },
  {
    href: '/issues/expo-ui-material-colors-cache',
    title: 'useMaterialColors calls the native module on every render',
    packageName: '@expo/ui',
    platforms: 'Android',
  },
] as const;

export default function Index() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: 'Expo repros', headerLargeTitleEnabled: true }} />

      <Text style={styles.intro}>
        Minimal reproductions for Expo bug reports. Open one to see the bug and the steps to trigger it.
      </Text>

      <Text style={styles.sectionHeader}>Issues</Text>
      <View style={styles.group}>
        {ISSUES.map((issue, index) => (
          <Link key={issue.href} href={issue.href} asChild>
            <Pressable>
              {({ pressed }) => (
                <View style={[styles.row, index > 0 && styles.separator, pressed && styles.pressed]}>
                  <View style={styles.rowText}>
                    <Text style={styles.title}>{issue.title}</Text>
                    <Text style={styles.meta}>
                      {issue.packageName} · {issue.platforms}
                    </Text>
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </View>
              )}
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  intro: { marginHorizontal: 20, marginTop: 8, marginBottom: 24, fontSize: 15, color: '#6b6b70' },
  sectionHeader: {
    marginHorizontal: 32,
    marginBottom: 8,
    fontSize: 13,
    color: '#6b6b70',
    textTransform: 'uppercase',
  },
  group: { marginHorizontal: 16, borderRadius: 12, backgroundColor: '#fff', overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
  separator: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#c6c6c8' },
  pressed: { backgroundColor: '#e5e5ea' },
  rowText: { flex: 1, gap: 2 },
  title: { fontSize: 16, color: '#000' },
  meta: { fontSize: 13, color: '#6b6b70' },
  chevron: { marginLeft: 8, fontSize: 22, color: '#c4c4c7' },
});
