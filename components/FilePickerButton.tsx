import * as DocumentPicker from 'expo-document-picker';
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import "../global.css";
import { isValidFile } from "../utils/validation"; // Validation logic

export default function FilePickerButton({ onFileSelect }: { onFileSelect: (file: any) => void }) {
  const [error, setError] = useState("");

  const handlePickFile = async () => {
    try {
      // Pick either an image or a document (PDF)
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
console.log("result", result)
      // if (result.type === 'cancel') {
      //   return;
      // }

const file = result.assets?.[0];

      // Validate file
      const { valid, error: validationError } = isValidFile(file);

      if (!valid) {
        setError(validationError);
        return;
      }

      // Pass the file to parent component
      onFileSelect(file);
    } catch (err) {
      console.error("Error picking document:", err);
      setError("Failed to pick document. Please try again.");
    }
  };

  return (
    <View className="flex items-center justify-center p-4">
      <Pressable className="bg-blue-500 px-6 py-3 rounded-lg" onPress={handlePickFile}>
        <Text className="text-white text-lg font-bold">Pick a File</Text>
      </Pressable>
      {error && <Text className="text-red-500 mt-2">{error}</Text>}
    </View>
  );
}


// import { useState } from "react";
// import { Pressable, Text, View } from "react-native";
// import { isValidFile } from "../utils/validation"; // Validation logic

// export default function FilePickerButton({ onFileSelect }: { onFileSelect: (file: any) => void }) {

  

//   return (
//     <View className="flex items-center justify-center p-4">
//       <Pressable className="bg-blue-500 px-6 py-3 rounded-lg" >
//         <Text className="text-white text-lg font-bold">Pick a File</Text>
//       </Pressable>
//       {/* {error && <Text className="text-red-500 mt-2">{error}</Text>} */}
//     </View>
//   );
// }


