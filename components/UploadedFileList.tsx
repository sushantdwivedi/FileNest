import useUpload from "@/hooks/useUpload";
import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import "../global.css";
import FilePreview from "./FilePreview";
import SwipeableFileItem from "./SwipeableFileItem"; // For the swipe to delete functionality

export default function UploadedFileList({
  // files,
  onDelete,
}: {
  files: any[];
  onDelete: (fileId: string) => void;
}) {

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

  return (
    <FlatList
      data={files}
      // keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SwipeableFileItem file={item} onDelete={onDelete}>
          <View className="p-4">
            <Text className="font-bold">{item?.name}</Text>
            <FilePreview file={item} />
          </View>
        </SwipeableFileItem>
      )}
    />
  );
}
