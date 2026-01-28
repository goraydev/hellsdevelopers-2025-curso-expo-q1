import * as FileSystem from "expo-file-system";
import { useStore } from "@/store/storte";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import Share from "react-native-share";

export default function IconShareProduct() {
  const { productSelected } = useStore();

  const handleShare = async () => {
    let fileUri = "";
    try {
      const productInfo = `
Producto: ${productSelected.productName}
Descripción: ${productSelected.productDescription}
Precio: $${productSelected.productPrice}
    `.trim();

      if (productSelected.productImage) {
        const base64Data = productSelected.productImage.replace(
          /^data:image\/\w+;base64,/,
          "",
        );

        // Crear nombre único para el archivo
        const fileName = `producto_${Date.now()}.jpg`;
        fileUri = `${FileSystem.cacheDirectory}${fileName}`;

        // Guardar la imagen en el sistema de archivos
        await FileSystem.writeAsStringAsync(fileUri, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const shareOptions = {
          title: "Compartir Producto",
          message: productInfo,
          url: fileUri,
          type: "image/jpeg",
        };

        await Share.open(shareOptions);
      } else {
        await Share.open({
          title: "Compartir Producto",
          message: productInfo,
        });
      }
    } catch (error: any) {
      //Alert.alert("Error", error.message);
    } finally {
      if (fileUri) {
        setTimeout(async () => {
          try {
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (fileInfo.exists) {
              await FileSystem.deleteAsync(fileUri, { idempotent: true });
              console.log("Archivo temporal eliminado");
            }
          } catch (e) {
            console.log("Error limpiando archivo temporal:", e);
          }
        }, 5000); // Esperar 5 segundos antes de eliminar
      }
    }
  };
  return (
    <Ionicons
      name="share-social-outline"
      size={30}
      color="white"
      onPress={handleShare}
    />
  );
}
