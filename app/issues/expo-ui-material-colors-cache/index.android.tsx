import { Stack } from 'expo-router';
import { memo, Profiler, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getMaterialColors, useMaterialColors } from '@expo/ui/jetpack-compose';

const SEED = '#5e6ad2';
const SWATCHES = 50;
const CALLS = 20;

type Scheme = 'light' | 'dark';

function Instructions() {
  return (
    <View style={styles.instructions}>
      <Text style={styles.instructionsIcon}>ⓘ</Text>
      <View style={styles.instructionsBody}>
        <Text style={styles.instructionsText}>
          <Text style={styles.bold}>Bug:</Text>{' '}
          <Text style={styles.code}>useMaterialColors</Text> calls the synchronous native{' '}
          <Text style={styles.code}>getMaterialColors</Text> on every render. The palette for a
          given seed and scheme never changes, but it is recomputed every time and never cached.
        </Text>
        <Text style={styles.instructionsText}>
          1. Tap <Text style={styles.bold}>Time identical calls</Text>. It calls{' '}
          <Text style={styles.code}>getMaterialColors</Text> {CALLS} times with the same
          arguments. Expected: close to 0 ms per call. Actual: several ms, every time.
        </Text>
        <Text style={styles.instructionsText}>
          2. Tap <Text style={styles.bold}>Toggle scheme</Text>. The {SWATCHES} bars below each
          use <Text style={styles.code}>useMaterialColors</Text>, so a light/dark switch pays that
          cost {SWATCHES} times. Expected: about 20 ms, which is what a cached palette gives. Actual: well over 100 ms.
        </Text>
      </View>
    </View>
  );
}

// Stands in for a design system where each text, icon or chip reads the palette itself.
function Swatch({ scheme }: { scheme: Scheme }) {
  const m3 = useMaterialColors({ seedColor: SEED, colorScheme: scheme });
  return <View style={[styles.swatch, { backgroundColor: m3.primaryContainer }]} />;
}

// `memo` so the Profiler only reports scheme changes, not the result text updating.
const Swatches = memo(function Swatches({
  scheme,
  onRender,
}: {
  scheme: Scheme;
  onRender: (ms: number) => void;
}) {
  return (
    <Profiler
      id="swatches"
      onRender={(_, phase, actualDuration) => {
        if (phase === 'update') onRender(actualDuration);
      }}
    >
      {Array.from({ length: SWATCHES }, (_, i) => (
        <Swatch key={i} scheme={scheme} />
      ))}
    </Profiler>
  );
});

export default function MaterialColorsCache() {
  const [scheme, setScheme] = useState<Scheme>('light');
  const [perCall, setPerCall] = useState<string>();
  const [renderMs, setRenderMs] = useState<number>();

  const timeCalls = () => {
    const start = performance.now();
    for (let i = 0; i < CALLS; i++) getMaterialColors({ scheme, seedColor: SEED });
    setPerCall(((performance.now() - start) / CALLS).toFixed(2));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'Material colors cache' }} />
      <Instructions />

      <Button title="Time identical calls" onPress={timeCalls} />
      <Text style={styles.result}>
        Per getMaterialColors call: {perCall ?? '–'} ms
      </Text>

      <Button
        title="Toggle scheme"
        onPress={() => setScheme((s) => (s === 'light' ? 'dark' : 'light'))}
      />
      <Text style={styles.result}>
        Last {SWATCHES}-swatch render: {renderMs?.toFixed(1) ?? '–'} ms
      </Text>

      <Swatches scheme={scheme} onRender={setRenderMs} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 8 },
  instructions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#e8e8ed',
  },
  instructionsIcon: { fontSize: 16, lineHeight: 20, color: '#6b6b70' },
  instructionsBody: { flex: 1, gap: 8 },
  instructionsText: { fontSize: 15, lineHeight: 20, color: '#6b6b70' },
  bold: { fontWeight: '600', color: '#3c3c43' },
  code: { fontFamily: 'monospace', fontSize: 14, color: '#3c3c43' },
  result: { marginBottom: 8, fontSize: 16, fontVariant: ['tabular-nums'] },
  swatch: { height: 8, borderRadius: 4 },
});
