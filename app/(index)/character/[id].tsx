import { Stack, useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
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
  const {
    id,
    name,
    gender,
    locationId,
    locationName,
    originId,
    originName,
    species,
    status,
    type,
  } = useLocalSearchParams<Params>();
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
      <ScrollView>
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

          <View className="px-5 py-4">
            <Text className="text-4xl text-white">{name}</Text>
            <Text
              className={`text-2xl text-white ${
                status === "Alive"
                  ? "text-green-600"
                  : status === "Dead"
                  ? "text-red-600"
                  : "text-gray-700"
              } `}
            >
              {status}
            </Text>
            <Text className="text-2xl text-white">{species}</Text>
            {type && <Text className="text-2xl text-white">{type}</Text>}
            <Text className="text-2xl text-white">{gender}</Text>
            <Text className="text-2xl text-white">{originName}</Text>
            <Text className="text-2xl text-white">{locationName}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
