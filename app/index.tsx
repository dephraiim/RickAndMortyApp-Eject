import { Text, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
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
    </SafeAreaView>
  );
}
