import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const status = ["Alive", "Dead", "Unknown"];

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
        <TouchableOpacity className="border-2 border-morty p-2 rounded-xl bg-morty">
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
    </SafeAreaView>
  );
}
