import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Image,
  ActivityIndicator,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../../lib/api";
import defaultImage from "../../assets/default.jpeg";
import { truncateString } from "../../lib/util";
import { useState } from "react";
import { useRouter } from "expo-router";

// TODO: Option to Save characters/Bookmark Characters

const isIOS = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";

export default function Page() {
  const status = ["Alive", "Dead", "Unknown"];
  const [page, setPage] = useState<number>(1);
  const [statusState, setStatusState] = useState<string>("");
  const router = useRouter();

  const { width: w, height: h } = useWindowDimensions();

  const { data, isLoading, error } = useQuery({
    queryKey: ["characters", page, statusState],
    queryFn: () => getCharacters(page, statusState),
  });

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
          className={`border-2 border-morty p-2 rounded-xl mr-4 bg-morty ${
            isAndroid && "p-3"
          }`}
        >
          <MagnifyingGlassIcon strokeWidth={3} size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Status */}
      <View className="mx-4 my-2">
        <View>
          <Text className="text-white text-3xl font-semibold">Status</Text>
        </View>

        <View className="flex flex-row justify-between items-center">
          <FlatList
            data={status}
            renderItem={(a) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setPage(1);
                    setStatusState(a.item.toLocaleLowerCase());
                  }}
                >
                  <View
                    className={`flex flex-row items-center justify-between  border-2 border-morty my-2 mr-3 rounded-xl ${
                      statusState !== a.item.toLocaleLowerCase() && "opacity-50"
                    }`}
                  >
                    <Text className="text-morty p-2 py-1 text-base">
                      {a.item}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            horizontal
          />
          {statusState !== "" && (
            <TouchableOpacity
              onPress={() => {
                setPage(1);
                setStatusState("");
              }}
            >
              <Text className="text-morty">Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="mx-4 my-5">
        <View>
          <Text className="text-white text-3xl font-semibold">Characters</Text>
        </View>

        {isLoading && (
          <View className="mt-60">
            <ActivityIndicator color="#fff" size="large" />
          </View>
        )}

        {/* TODO: Error Component */}

        {!isLoading && data && !error && (
          <FlatList
            data={data.results}
            style={{ marginTop: 10 }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/character/${item.id}`);
                  }}
                >
                  <View className="mr-3 ml-1 mt-4">
                    <Image
                      style={{
                        width: (w * 0.85) / 2,
                        height: (w * 0.85) / 2,
                        borderRadius: 10,
                      }}
                      source={{ uri: item.image }}
                      loadingIndicatorSource={defaultImage}
                    />
                    <View className="flex flex-row items-center justify-between mt-1">
                      <Text className="text-white text-lg font-semibold">
                        {truncateString(item.name, 15)}
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
            keyExtractor={(item) => item.id.toString() + item.name}
            contentContainerStyle={{ paddingBottom: h * 0.3 }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            ListFooterComponent={() => {
              return (
                <View className="flex flex-row justify-between mt-10 mx-2">
                  <TouchableOpacity
                    onPress={() => {
                      if (data.info.prev) {
                        setPage(page - 1);
                      }
                    }}
                  >
                    <ArrowSmallLeftIcon
                      color="#fff"
                      size={30}
                      strokeWidth={3}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (data.info.next) {
                        setPage(page + 1);
                      }
                    }}
                  >
                    <ArrowSmallRightIcon
                      color="#fff"
                      size={30}
                      strokeWidth={3}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
