import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#E84393' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hoje',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="checkmark-circle-outline"
              color={color as string}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="progresso"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-outline"
              color={color as string}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}