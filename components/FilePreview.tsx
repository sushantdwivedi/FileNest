

import * as WebBrowser from "expo-web-browser";
import { Image, Text, TouchableOpacity, View } from "react-native";
import "../global.css";

// Helper to get file extension
const getFileExtension = (filename: string) => {
  return filename?.split(".").pop()?.toLowerCase();
};

export default function FilePreview({ file }: { file: any }) {
  const fileUri = file?.uri || file?.url;
  const fileName = file?.name || fileUri;
console.log("fileUri", fileUri)
console.log("fileName", fileName)
const extension = getFileExtension(fileName);
console.log("extension", extension)

  const isImage =
    file?.mimeType?.startsWith("image") ||
    ["jpg", "jpeg", "png"].includes(extension);

  const isPDF =
    file?.mimeType === "application/pdf" || extension === "pdf";

  const handleOpenPDF = async () => {
    if (fileUri) {
      await WebBrowser.openBrowserAsync(fileUri);
    }
  };

  if (!fileUri) return null;

  return (
    <View className="flex items-center justify-center p-4">
      {isImage ? (
        <Image
          source={{ uri: fileUri }}
          style={{ width: 200, height: 200, resizeMode: "contain" }}
        />
      ) : isPDF ? (
        <TouchableOpacity
          onPress={handleOpenPDF}
          className="flex items-center justify-center"
        >
          <Image
            source={require("../assets/images/pdf_8176584.png")}
            style={{ width: 100, height: 100, resizeMode: "contain", opacity: 0.6 }}
          />
          <Text className="text-sm text-blue-600 mt-2 font-medium">Open PDF</Text>
        </TouchableOpacity>
      ) : (
        <Text className="text-red-500 text-center">Unsupported file type</Text>
      )}
    </View>
  );
}
