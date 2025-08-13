import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useUpload from "../hooks/useUpload";

// Type for file object
interface File {
  id: string;
  name: string;
  url: string;
}

export default function FileGallery() {
  const {
    files,
    fetchFiles,
    loading,
    error,
  }: {
    files: File[];
    fetchFiles: () => void;
    loading: boolean;
    error: string | null;
  } = useUpload();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const renderItem = ({ item }: { item: File }) => {
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name);
    const isPDF = /\.pdf$/i.test(item.name);
console.log("isImage", isImage)
    return (
      <TouchableOpacity
        onPress={() => Linking.openURL(item.url)}
        className="w-36 h-36 m-2 border border-gray-200 rounded-lg overflow-hidden items-center justify-center"
      >
        {isImage ? (
          <Image
            source={{ uri: item.url }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : isPDF ? (
          <View className="items-center justify-center p-2">
            <Text className="text-center text-xs text-gray-800 mb-1">
              📄 PDF File
            </Text>
            <Text className="text-center text-[10px] text-blue-600">
              {item.name.length > 25
                ? item.name.slice(0, 22) + "..."
                : item.name}
            </Text>
          </View>
        ) : (
          <Text className="text-sm text-red-500">Unsupported File</Text>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4 text-black">Uploaded Files</Text>
      {files && files.length > 0 ? (
        <FlatList
          data={files}
          keyExtractor={(item) => item.id || item.name}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <Text className="text-gray-500">No files uploaded yet.</Text>
      )}
    </View>
  );
}
