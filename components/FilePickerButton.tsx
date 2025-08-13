

import * as DocumentPicker from 'expo-document-picker';
import { useState } from "react";
import { LayoutAnimation, Pressable, Text, View } from "react-native";
import "../global.css";
import { isValidFile } from "../utils/validation"; 

export default function FilePickerButton({
  onFileSelect,
}: {
  onFileSelect: (file: any) => void;
}) {
  const [error, setError] = useState("");

  const handlePickFile = async () => {
    try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'],
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        setError("No file selected.");
        return;
      }

      const file = result.assets?.[0];

      const { valid, error: validationError } = isValidFile(file);

      if (!valid) {
        setError(validationError);
        return;
      }

      onFileSelect(file);
      setError(""); 
    } catch (err) {
      console.error("Error picking document:", err);
      setError("Failed to pick file. Please try again.");
    }
  };

  return (
    <View className="flex items-center justify-center p-4">
      <Pressable
        onPress={handlePickFile}
        className="rounded-2xl overflow-hidden w-94 bg-blue-500 px-6 py-3"
        android_ripple={{ color: '#ffffff33' }}
      >
        <Text className="text-white text-lg font-bold text-center">
          Pick a File
        </Text>
      </Pressable>

      {error && (
        <Text className="text-red-500 mt-3 text-center">{error}</Text>
      )}
    </View>
  );
}
