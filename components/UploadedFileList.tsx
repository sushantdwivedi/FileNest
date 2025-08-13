// import useUpload from "@/hooks/useUpload";
// import { useEffect } from "react";
// import { FlatList, Text, View } from "react-native";
// import "../global.css";
// import FilePreview from "./FilePreview";
// import SwipeableFileItem from "./SwipeableFileItem"; // For the swipe to delete functionality



// export default function UploadedFileList({
//   // files,
//   onDelete,
// }: {
//   files: any[];
//   onDelete: (fileId: string) => void;
// }) {

//   const {
//     files,
//     fetchFiles,
//     loading,
//     error,
//   }: {
//     files: File[];
//     fetchFiles: () => void;
//     loading: boolean;
//     error: string | null;
//   } = useUpload();

//   useEffect(() => {
//     fetchFiles();
//   }, [fetchFiles]);

//   return (
//     <FlatList
//       data={files}
//       // keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <SwipeableFileItem file={item} onDelete={onDelete}>
//           <View className="p-4">
//             <Text className="font-bold">{item?.name}</Text>
//             <FilePreview file={item} />
//           </View>
//         </SwipeableFileItem>
//       )}
//     />
//   );
// }

// !!!!!!!!!!!!!!!


import useUpload from "@/hooks/useUpload";
import { Dimensions, FlatList, LayoutAnimation, Text, View } from "react-native";
import "../global.css";
import FilePreview from "./FilePreview";
import SwipeableFileItem from "./SwipeableFileItem";

const { width } = Dimensions.get('window');
const ITEM_MARGIN = 1;
const NUM_COLUMNS = 2;
const ITEM_WIDTH = (width - (NUM_COLUMNS + 1) * ITEM_MARGIN) / NUM_COLUMNS;


function truncateFileName(name) {
  if (!name) return '';

  const lastDotIndex = name.lastIndexOf('.');
  if (lastDotIndex === -1) return name;

  const baseName = name.substring(0, lastDotIndex);
  const extension = name.substring(lastDotIndex);

  if (baseName.length <= 5) {
    return name;
  }

  const firstLetters = baseName.substring(0, 5);
  // const lastTwo = baseName.substring(baseName.length - 3);

  return `${firstLetters}...${extension}`;
}

  export default function UploadedFileList({
    files,
    onDelete,
  }: {
    onDelete: (filePath: string) => void;
  }) {
    const {
      // files,
      fetchFiles,
      loading,
      error,
    }: {
      files: File[];
      fetchFiles: (force?: boolean) => void;
      loading: boolean;
      error: string | null;
    } = useUpload();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // useEffect(() => {
    //   fetchFiles();
    //   console.log("files files files files", files)
    // });

    const handleDelete = async (filePath: string, closeSwipe: () => void) => {
      try {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        await onDelete(filePath); // calls deleteFileFromSupabase
        await fetchFiles(true); // Refresh file list
        closeSwipe(); // ✅ Close swipe after success
      } catch (err) {
        console.error("Failed to delete:", err);
      }
    };


return (
    <FlatList
      data={files}
      keyExtractor={(item, idx) => idx.toString()}
      // numColumns={2}
      contentContainerStyle={{ padding: ITEM_MARGIN }}
      renderItem={({ item }) => (
        <SwipeableFileItem file={item} onDelete={handleDelete}>
          <View
            className="bg-white rounded-[16px] p-4 items-center m-2"
            // style={{ width: ITEM_WIDTH }}
          >
            <Text className="font-bold text-lg mb-2 text-gray-800">
              {truncateFileName(item?.name)}
            </Text>
            <FilePreview file={item} />
          </View>
        </SwipeableFileItem>
      )}
    />
  );


    // return (
    //   <FlatList
    //     data={files}
    //     keyExtractor={(item, idx) => idx.toString()}
    //     renderItem={({ item }) => (
    //       <SwipeableFileItem file={item} onDelete={handleDelete}>

    //         <View className="p-4 items-center ">
    //           <Text className="font-bold">{item?.name}</Text>
    //           <FilePreview file={item} />
    //         </View>
    //       </SwipeableFileItem>
    //     )}
    //   />
    // );
  }


