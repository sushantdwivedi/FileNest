import * as WebBrowser from "expo-web-browser"; // For PDF preview
import { Image, TouchableOpacity } from "react-native";
import "../global.css";

export default function FilePreview({ file }: { file: any }) {
  console.log("file", file)
  const isImage = file?.mimeType?.startsWith("image");

  const handleOpenPDF = async () => {
    await WebBrowser.openBrowserAsync(file.uri);
  };

  return (
    <TouchableOpacity onPress={handleOpenPDF} className="flex items-center justify-center p-4">
      {isImage ? (
        <Image
          source={{ uri: file.uri }}
          style={{ width: 200, height: 200, resizeMode: "contain" }}
        />
      ) : (
        <Image
          source={require('../assets/images/pdf_8176584.png')}
          style={{ width: 100, height: 100, resizeMode: "contain", opacity:0.4 }}
        />
      )}
    </TouchableOpacity>
  );
}
