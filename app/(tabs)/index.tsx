// import FilePickerButton from "@/components/FilePickerButton";
// import FilePreview from "@/components/FilePreview";
// import UploadedFileList from "@/components/UploadedFileList";
// import useUpload from "@/hooks/useUpload";
// import { supabase } from "@/lib/supabase";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// // import FilePickerButton from "../components/FilePickerButton";
// // import FilePreview from "../components/FilePreview";
// // import UploadedFileList from "../components/UploadedFileList";
// // import useUpload from "../hooks/useUpload";
// // import { supabase } from "../lib/supabase"; // Ensure you have this configured

// export default function HomeScreen() {
//   const [selectedFile, setSelectedFile] = useState<any>(null);
//   const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
//   const { uploadFile, loading, error } = useUpload();

//   // Fetch previously uploaded files
//   useEffect(() => {
//     const fetchUploadedFiles = async () => {
//       try {
//         const { data, error } = await supabase.storage.from("uploads").list();
//         if (error) throw error;
//         setUploadedFiles(data);
//       } catch (error: any) {
//         Alert.alert("Error", error.message);
//       }
//     };
//     fetchUploadedFiles();
//   }, []);

//   // Handle file selection
//   const handleFileSelect = (file: any) => {
//     setSelectedFile(file);
//   };

//   // Handle file upload
//   const handleUpload = async () => {
//     if (!selectedFile) return;

//     const { data, error } = await uploadFile(selectedFile);
//     if (error) {
//       Alert.alert("Upload Error", error);
//       return;
//     }

//     // Add uploaded file to the list
//     setUploadedFiles((prev) => [...prev, data]);
//     setSelectedFile(null); // Clear the selected file after upload
//   };

//   // Handle file deletion
//   const handleDeleteFile = async (fileId: string) => {
//     try {
//       const { error } = await supabase.storage.from("uploads").remove([fileId]);
//       if (error) throw error;

//       setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
//       Alert.alert("Success", "File deleted successfully.");
//     } catch (error: any) {
//       Alert.alert("Error", error.message);
//     }
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white">
//     <ScrollView className="flex-1 bg-gray-100 p-4">
//       <View className="mb-6">
//         <FilePickerButton onFileSelect={handleFileSelect} />
//         {selectedFile && (
//           <View className="mt-4">
//             <Text className="font-bold text-lg">File Selected:</Text>
//             <Text className="text-sm text-gray-500">{selectedFile.name}</Text>
//             <FilePreview file={selectedFile} />
//             <Pressable
//               onPress={handleUpload}
//               className="bg-blue-500 px-6 py-3 mt-4 rounded-lg"
//             >
//               {loading ? (
//                 <ActivityIndicator color="white" />
//               ) : (
//                 <Text className="text-white text-lg font-bold">Upload</Text>
//               )}
//             </Pressable>
//           </View>
//         )}
//         {error && <Text className="text-red-500 mt-2">{error}</Text>}
//       </View>

//       <Text className="font-bold text-xl mb-4">Uploaded Files</Text>

//       {uploadedFiles.length > 0 ? (
//         <UploadedFileList files={uploadedFiles} onDelete={handleDeleteFile} />
//       ) : (
//         <Text className="text-gray-500">No files uploaded yet.</Text>
//       )}
//     </ScrollView>
//    </SafeAreaView> 
//   );
// }



import FileGallery from "@/components/FileGallery";
import FilePickerButton from "@/components/FilePickerButton";
import FilePreview from "@/components/FilePreview";
import UploadedFileList from "@/components/UploadedFileList";
import useUpload from "@/hooks/useUpload";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const { uploadFile, loading, error } = useUpload();

  // Fetch previously uploaded files
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        const { data, error } = await supabase.storage.from("uploads").list();
        if (error) throw error;
        setUploadedFiles(data);
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
    };
    fetchUploadedFiles();
  }, []);

  // Handle file selection
  const handleFileSelect = (file: any) => {
    setSelectedFile(file);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    const { data, error } = await uploadFile(selectedFile);
    if (error) {
      Alert.alert("Upload Error", error);
      return;
    }

    setUploadedFiles((prev) => [...prev, data]);
    setSelectedFile(null);
  };

  // Handle file deletion
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <FilePickerButton onFileSelect={handleFileSelect} />
          {selectedFile && (
            <View style={styles.previewSection}>
              <Text style={styles.label}>File Selected:</Text>
              <Text style={styles.fileName}>{selectedFile.name}</Text>
              <FilePreview file={selectedFile} />
              <Pressable onPress={handleUpload} style={styles.uploadButton}>
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.uploadButtonText}>Upload</Text>
                )}
              </Pressable>
            </View>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <Text style={styles.sectionTitle}>Uploaded Files</Text>

        {/* {uploadedFiles.length > 0 ? ( */}
          <UploadedFileList files={uploadedFiles} onDelete={handleDeleteFile} />
        {/* ) : (
          <Text style={styles.placeholderText}>No files uploaded yet.</Text>
        )} */}
        <FileGallery />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#f3f4f6", // gray-100
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  previewSection: {
    marginTop: 16,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  fileName: {
    fontSize: 14,
    color: "#6b7280", // gray-500
  },
  uploadButton: {
    backgroundColor: "#3b82f6", // blue-500
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ef4444", // red-500
    marginTop: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
  },
  placeholderText: {
    color: "#6b7280", // gray-500
  },
});
