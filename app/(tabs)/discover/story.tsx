import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";

const initialStories = [
  { name: "story1.webp", image: require("@/assets/images/story1.webp") },
  { name: "story2.jpg", image: require("@/assets/images/story2.jpg") },
  { name: "story3.webp", image: require("@/assets/images/story3.webp") },
  { name: "story4.jpeg", image: require("@/assets/images/story4.jpeg") },
  { name: "story5.jpg", image: require("@/assets/images/story5.jpg") },
  { name: "story6.webp", image: require("@/assets/images/story6.webp") },
];

export default function StoryList() {
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [seenStories, setSeenStories] = useState<Set<string>>(new Set());
  const [stories, setStories] = useState(initialStories);



  const openStory = (storyName: string,image: any) => {
    setSelectedImage(image);
    setVisible(true);
    setSeenStories((prev) => new Set(prev).add(storyName));

   // Move the selected story to the end
   setStories((prev) => {
    const storyIndex = prev.findIndex((s) => s.name === storyName);
    if (storyIndex === -1) return prev;
    const reordered = [...prev];
    const [selected] = reordered.splice(storyIndex, 1);
    reordered.push(selected);
    return reordered;
  });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={styles.scrollContainer}
      >
        {stories.map((story, index) => {
              const isSeen = seenStories.has(story.name);
        return(
          <TouchableOpacity key={index} onPress={() => openStory(story.name,story.image)}>
            <View style={[styles.imageWapper,
                { borderColor: isSeen ? "#ccc" : "#C1553B" },
            ]}>
              <Image key={index} source={story.image} style={styles.image} />
            </View>
          </TouchableOpacity>
         );
        })}
      </ScrollView>
      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.modalBackground} onPress={() => setVisible(false)}>
          <Image source={selectedImage} style={styles.fullImage} resizeMode="cover" />
        </Pressable>
      </Modal>
    </View>
    )}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
  },
  imageWapper: {
    borderWidth: 3,
    padding: 3,
    marginRight: 12,
    borderRadius: 14,
  },
  image: {
    width: 65,
    height: 90,
    borderRadius: 10,
  },
  modalBackground:{
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage:{
    width: "90%",
    height: "75%",
    borderRadius: 16,
  }
});
