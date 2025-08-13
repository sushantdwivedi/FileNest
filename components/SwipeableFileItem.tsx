

import { MaterialIcons } from "@expo/vector-icons";
import { useRef } from "react";
import { Pressable, View } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import "../global.css";

export default function SwipeableFileItem({
  file,
  children,
  onDelete,
}: {
  file: any;
  children: React.ReactNode;
  onDelete: (fileId: string, closeSwipe: () => void) => void;
}) {
  const swipeableRef = useRef<Swipeable>(null);

  const handleDelete = () => {
    onDelete(file.id, () => {
      swipeableRef.current?.close();
    });
  };

  const renderRightActions = () => {
    return (
      <Pressable
        onPress={handleDelete}
        className="bg-red-500 justify-center items-center p-4"
      >
        <MaterialIcons name="delete" size={24} color="white" />
      </Pressable>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
        <View className="bg-white rounded-lg mb-2">{children}</View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
