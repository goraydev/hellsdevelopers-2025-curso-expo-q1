import { Link } from "@/components/share/Link";
import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";
import { useStore } from "@/store/storte";
import { FlatList, Image, StyleSheet, View } from "react-native";

export default function Gallery() {
  const { galleryBase64Data } = useStore();

  return (
    <Screen title="Galería de imágenes" scroll={false}>
      <View style={styles.gallery}>
        {
          <FlatList
            data={galleryBase64Data || []}
            numColumns={2}
            renderItem={({ item }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 8,
                  marginHorizontal: 8,
                }}
              >
                <Image
                  source={{ uri: `data:image/jpeg;base64,${item.productImage}` }}
                  style={{ width: 200, height: 200, objectFit: "cover" }}
                />
              </View>
            )}
            ListEmptyComponent={() => (
              <Text center color="#fff">
                No hay imágenes
              </Text>
            )}
            ListFooterComponent={() => (
              <View style={{ marginTop: 10 }}>
                <Link href="/cameragallery">
                  <View style={styles.box}>
                    <Text color="white">Subir imagen</Text>
                  </View>
                </Link>
              </View>
            )}
          />
        }
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  box: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    padding: 8,
  },
  gallery: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
