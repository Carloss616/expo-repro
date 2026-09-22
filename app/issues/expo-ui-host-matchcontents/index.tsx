import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

// The repro is `index.ios.tsx`; other platforms land here.
export default function HostMatchContents() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Host matchContents' }} />
      <Text style={styles.text}>This issue only reproduces on iOS.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  text: { fontSize: 16, textAlign: 'center' },
});
