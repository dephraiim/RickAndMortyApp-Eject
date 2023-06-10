import { Tabs } from "expo-router";
import {
  MapPinIcon,
  UserCircleIcon,
  FilmIcon,
} from "react-native-heroicons/outline";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { useAppState } from "../hooks/useAppState";
import { useOnlineManager } from "../hooks/useOnlineManager";
import { AppStateStatus, Platform } from "react-native";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function Layout() {
  useOnlineManager();
  useAppState(onAppStateChange);

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: "#52af38",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="(index)"
          options={{
            tabBarIcon: ({ color, size }) => {
              return <UserCircleIcon color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name="location"
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MapPinIcon color={color} size={size} />;
            },
            tabBarStyle: {
              backgroundColor: "#0faec7",
            },
          }}
        />
        <Tabs.Screen
          name="episode"
          options={{
            tabBarIcon: ({ color, size }) => {
              return <FilmIcon color={color} size={size} />;
            },
            tabBarStyle: {
              backgroundColor: "#cda053",
            },
          }}
        />
      </Tabs>
    </QueryClientProvider>
  );
}
