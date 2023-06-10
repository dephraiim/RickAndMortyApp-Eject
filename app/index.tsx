import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Image,
  useWindowDimensions,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

import { sample } from "../data/sample";

const isIOS = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";

export default function Page() {
  const status = ["Alive", "Dead", "Unknown"];
  const { width: w, height: h } = useWindowDimensions();

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Search */}
      <View className="flex flex-row items-center justify-center">
        <TextInput
          placeholder="Search for a character..."
          placeholderTextColor="#515151"
          style={{
            lineHeight: 20,
          }}
          className="text-white text-lg m-4 mr-2 p-4 py-2 flex-1 border-2 border-morty rounded-xl"
        />
        <TouchableOpacity
          className={`border-2 border-morty p-2 rounded-xl mr-2 bg-morty ${
            isAndroid && "p-3"
          }`}
        >
          <MagnifyingGlassIcon size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Status */}
      <View className="mx-4 my-2">
        <View>
          <Text className="text-white text-3xl font-semibold">Status</Text>
        </View>

        <FlatList
          data={status}
          renderItem={(a) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log(a.item);
                }}
              >
                <View className="flex flex-row items-center justify-between  border-2 border-morty my-2 mr-3 rounded-xl">
                  <Text className="text-morty p-2 py-1 text-base">
                    {a.item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          horizontal
        />
      </View>

      {/* Characters */}

      <View className="mx-4 my-5">
        <View>
          <Text className="text-white text-3xl font-semibold">Characters</Text>
        </View>

        <FlatList
          data={sample}
          style={{ marginBottom: h * 0.2 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log(item);
                }}
              >
                <View className="m-2 mt-4">
                  <Image
                    style={{
                      width: (w * 0.85) / 2,
                      height: (w * 0.85) / 2,
                      borderRadius: 10,
                    }}
                    source={{ uri: item.image }}
                  />
                  <View className="flex flex-row items-center justify-between mt-1">
                    <Text className="text-white text-lg font-semibold">
                      {item.name}
                    </Text>
                    <View
                      className={`w-2 h-2 rounded-full ${
                        item.status === "Alive"
                          ? "bg-green-600"
                          : item.status === "Dead"
                          ? "bg-red-600"
                          : "bg-gray-700"
                      }`}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}
