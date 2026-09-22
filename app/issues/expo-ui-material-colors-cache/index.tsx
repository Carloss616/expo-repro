import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

// The repro is `index.android.tsx`; other platforms land here.
export default function MaterialColorsCache() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Material colors cache' }} />
      <Text style={styles.text}>This issue only reproduces on Android.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  text: { fontSize: 16, textAlign: 'center' },
});
