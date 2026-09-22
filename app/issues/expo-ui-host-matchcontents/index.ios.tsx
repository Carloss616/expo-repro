import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Host, Label, Rectangle, Text, VStack } from '@expo/ui/swift-ui';
import {
  background,
  font,
  foregroundStyle,
  frame,
  lineLimit,
  padding,
  shapes,
} from '@expo/ui/swift-ui/modifiers';

const TEXT = 'Lorem ipsum dolor sit amet, '.repeat(30);
const INSTRUCTIONS =
  'Tap "Toggle" a few times. The orange rectangle should stay still, but on some taps this whole block jumps for a frame or two, by half the text\'s height change.';

export default function HostMatchContents() {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: 'Host matchContents' }} />
      <Host matchContents={{ vertical: true }} style={{ width: '100%' }}>
        <VStack alignment="leading" spacing={16}>
          <Label
            systemImage="info.circle"
            title={INSTRUCTIONS}
            modifiers={[
              font({ textStyle: 'callout' }),
              foregroundStyle({ type: 'hierarchical', style: 'secondary' }),
              padding({ all: 12 }),
              frame({ maxWidth: Infinity, alignment: 'leading' }),
              background(
                { type: 'hierarchical', style: 'quinary' },
                shapes.roundedRectangle({ cornerRadius: 12 }),
              ),
              padding({ horizontal: 16, top: 8 }),
            ]}
          />
          <Rectangle modifiers={[frame({ height: 200 }), foregroundStyle('orange')]} />
          <Button label="Toggle" onPress={() => setExpanded((e) => !e)} />
          <Text modifiers={expanded ? [] : [lineLimit(3)]}>{TEXT}</Text>
        </VStack>
      </Host>
    </ScrollView>
  );
}
