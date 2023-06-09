import { Tabs } from "expo-router";
import {
  MapPinIcon,
  UserCircleIcon,
  FilmIcon,
} from "react-native-heroicons/outline";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#52af38",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <UserCircleIcon color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <MapPinIcon color={color} size={size} />;
          },
        }}
      />
      <Tabs.Screen
        name="episode"
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FilmIcon color={color} size={size} />;
          },
        }}
      />
    </Tabs>
  );
}
