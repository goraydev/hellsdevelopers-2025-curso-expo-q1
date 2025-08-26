import { Screen } from "@/components/share/Screen";
import { Text } from "@/components/share/Text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  getEntityByUUID,
  TypeImageProductsTableScheme,
  updateEntity,
} from "../../_database";
import { TextInput } from "@/components/share/TextInput";
import { styles } from "./style";
import { Alert, Button, FlatList, Image, View } from "react-native";
import { CameraShare } from "@/components/share/CameraShare";
import { useStore } from "@/store/storte";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "@/components/share/Link";

export default function ProductItem() {
  const { base64Data, setBase64Data } = useStore();
  const router = useRouter();
  const { id: idProduct } = useLocalSearchParams();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [brandUUID, setBrandUUID] = useState("");
  const [modelUUID, setModelUUID] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productImages, setProductImages] = useState<
    TypeImageProductsTableScheme[]
  >([]);
  const [productPrice, setProductPrice] = useState("");

  const getProductData = async () => {
    try {
      const productData = await getEntityByUUID(idProduct as string);
      if (!productData) {
        return;
      }

      setProductName(productData.productName);
      setProductDescription(productData.productDescription);
      setBrandUUID(productData.brandUUID);
      setProductImage(productData.productImage || "");
      setModelUUID(productData.modelUUID);
      setProductImages(productData.productImages || []);
      setProductPrice(String(productData.productPrice));
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleEditProduct = async () => {
    if (!productName.trim()) {
      Alert.alert("Error", "El nombre del producto es obligatorio");
      return;
    }

    if (!productPrice.trim()) {
      Alert.alert("Error", "El precio del producto es obligatorio");
      return;
    }
    try {
      await updateEntity(idProduct as string, {
        productName,
        productDescription,
        brandUUID,
        modelUUID,
        productImage: base64Data || productImage,
        productPrice: parseFloat(productPrice),
      });

      Alert.alert("Éxito", "El producto fue actualizado exitosamente");
      router.back();
      setBase64Data("");
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, [idProduct]);

  useEffect(() => {
    setBase64Data("");
  }, []);

  return (
    <Screen
      title="Editar Producto"
      footerAction={() => handleEditProduct()}
      footerText="Actualizar producto"
    >
      <Text variant="label">Nombre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setProductName}
        placeholder="Nombre del Producto"
        defaultValue={productName}
      />
      <Text variant="label">Descripción:</Text>
      <TextInput
        onChangeText={setProductDescription}
        placeholder="Descripción del producto"
        defaultValue={productDescription}
      />
      <Text variant="label">Brand UUID:</Text>
      <TextInput
        onChangeText={setBrandUUID}
        placeholder="Brand UUID"
        defaultValue={brandUUID}
      />

      <Text variant="label">Model UUID:</Text>
      <TextInput
        onChangeText={setModelUUID}
        placeholder="Model UUID"
        defaultValue={modelUUID}
      />

      <Text variant="label">Precio:</Text>
      <TextInput
        onChangeText={setProductPrice}
        inputMode="numeric"
        placeholder="Precio del Producto"
        defaultValue={productPrice}
      />
      <CameraShare currentBase64={productImage} />
      <View
        style={{
          marginBottom: 100,
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Ionicons name="image" size={30} color="white" />
        <Link href={`/gallery/${idProduct}/edit`}>
          <Text bold color="white">
            Editar imágenes de galeria
          </Text>
        </Link>
      </View>
    </Screen>
  );
}
