import { Stack } from "expo-router";





export default function RootLayout() {
  return   <Stack  screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
      }} />;

  
}
