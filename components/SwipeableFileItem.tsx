import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"; // For swipe functionality
import "../global.css";

export default function SwipeableFileItem({
  file,
  children,
  onDelete,
}: {
  file: any;
  children: React.ReactNode;
  onDelete: (fileId: string) => void;
}) {
  const renderRightActions = () => {
    return (
      <Pressable onPress={() => onDelete(file.id)} className="bg-red-500 justify-center items-center p-4">
        <MaterialIcons name="delete" size={24} color="white" />
      </Pressable>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <View className="bg-white rounded-lg shadow mb-2">{children}</View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
