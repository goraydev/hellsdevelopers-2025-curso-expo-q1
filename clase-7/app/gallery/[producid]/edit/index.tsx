import {
  deleteImageEntity,
  getEntityByUUID,
  searchItemsGallery,
  TypeImageProductsTableScheme,
} from "@/app/backoffice/products/_database";
import { Link } from "@/components/share/Link";
import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";
import { useStore } from "@/store/storte";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, StyleSheet, View } from "react-native";

export default function Gallery() {
  const { producid } = useLocalSearchParams();
  const [refreshing, setRefreshing] = useState(false);
  const [productImages, setProductImages] = useState<
    TypeImageProductsTableScheme[]
  >([]);

  const getProductData = async () => {
    try {
      const productData = await getEntityByUUID(producid as string);
      if (!productData) {
        return;
      }

      setProductImages(productData.productImages || []);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  async function getImages() {
    const products = await searchItemsGallery();

    setProductImages(products);
  }

  const handleDeletePress = (idimagen: string) => {
    //Eliminar el producto
    Alert.alert("¿Seguro de eliminar la imagen?", "No se podrá revertir", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: async () => {
          console.log(idimagen);
          await deleteImageEntity(idimagen);
        },
      },
    ]);
  };

  useEffect(() => {
    getProductData();
  }, [producid]);

  useEffect(() => {
    getImages();
  }, [productImages]);

  return (
    <Screen title="Edición de galería de imágenes" scroll={false}>
      <View style={styles.gallery}>
        {
          <FlatList
            data={productImages}
            numColumns={2}
            renderItem={({ item }) => (
              <View
                style={{
                  position: "relative",
                  marginVertical: 8,
                }}
              >
                <Ionicons
                  name="trash"
                  size={25}
                  color="red"
                  style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}
                  onPress={() => handleDeletePress(item.producdUUIDImage)}
                />
                <Image
                  source={{
                    uri: `data:image/jpeg;base64,${item.productImage}`,
                  }}
                  style={{ width: 180, height: 180, objectFit: "scale-down" }}
                />
              </View>
            )}
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await getImages();
              setRefreshing(false);
            }}
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
