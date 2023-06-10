import { Stack, useLocalSearchParams } from "expo-router";
import { Image, View, useWindowDimensions } from "react-native";
import defaultImage from "../../../assets/default.jpeg";

type Params = {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  originName: string;
  originId: string;
  locationName: string;
  locationId: string;
};

export default function Page() {
  const { id, name } = useLocalSearchParams<Params>();
  const { width: w, height: h } = useWindowDimensions();

  const url = `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`;

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: name,
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          },
          headerTintColor: "#52af38",
        }}
      />
      <View className="bg-black flex-1 py-4">
        <Image
          style={{
            width: w * 0.9,
            height: w * 0.9,
            borderRadius: 30,
            marginLeft: "auto",
            marginRight: "auto",
          }}
          source={{ uri: url }}
          loadingIndicatorSource={defaultImage}
        />
      </View>
    </>
  );
}
