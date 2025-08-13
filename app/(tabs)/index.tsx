
import FilePickerButton from "@/components/FilePickerButton";
import FilePreview from "@/components/FilePreview";
import UploadedFileList from "@/components/UploadedFileList";
import useUpload from "@/hooks/useUpload";
import { supabase } from "@/lib/supabase";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  LayoutAnimation,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { uploadFile, loading, error, deleteFile, fetchFiles, files } = useUpload();

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  const handleFileSelect = (file: any) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const { data, error } = await uploadFile(selectedFile);
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    await fetchFiles(true);
    if (error) {
      Alert.alert("Upload Error", error);
      return;
    }

    setUploadedFiles((prev) => [...prev, data]);
    setSelectedFile(null);
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const { error } = await supabase.storage.from("uploads").remove([fileId]);
      if (error) throw error;

      setUploadedFiles((prev) => prev.filter((file) => file.name !== fileId));
      Alert.alert("Success", "File deleted successfully.");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
fetchFiles()  
   
  })
  

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      await fetchFiles(true); // You might want to update state with fetched files
    } catch (err) {
      console.error("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerClassName="flex-grow px-4 pt-6 pb-10"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* App Title */}
        <View className="mb-8 items-center my-3">
          <Text className="text-xl font-extrabold text-blue-700 tracking-wide">
            FileNest
          </Text>
          <Text className="text-sm text-gray-500 mt-1">Your cloud file vault</Text>
        </View>

        {/* Upload Section */}
        <View className="mb-8 rounded-2xl p-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Upload a File</Text>

          <FilePickerButton onFileSelect={handleFileSelect} />

          {selectedFile && (
            <View className="mt-6">
              <Text className="text-base font-medium text-gray-700 mb-1">Selected File:</Text>
              <Text className="text-sm text-gray-500 mb-2">{selectedFile.name}</Text>

              <FilePreview file={selectedFile} />

              <TouchableOpacity
                onPress={handleUpload}
                className="bg-black py-3 px-6 mt-4 rounded-lg items-center active:scale-95"
              >
                <Text className="text-white text-lg font-semibold">Upload</Text>
              </TouchableOpacity>
            </View>
          )}

          {error && (
            <Text className="text-red-500 mt-4 text-sm text-center">{error}</Text>
          )}
        </View>

        {/* Uploaded Files Section */}
        <View>
          <Text className="text-xl font-bold text-gray-800 mb-4 mt-4">Uploaded Files</Text>

          <UploadedFileList
            files={files}
            onDelete={(filePath: string) => deleteFile(filePath)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
