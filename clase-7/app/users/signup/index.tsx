import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { insertItemUser, User } from "../_database";
import { useRouter } from "expo-router";
import { useStore } from "@/store/storte";

export default function SignUp() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const setState = useStore((state) => state.setState);

  const handleSignUp = async () => {
    const level = 2;
    try {
      if ([userName, userEmail, userPassword].every((c) => c != "")) {
        if (userPassword.length < 8) {
          Alert.alert("Error", "Cree una contraseña de más de 8 caracteres");
          return;
        }

        //enviamos a crear a la BD
        const user: User = {
          user_name: userName,
          user_email: userEmail,
          user_level: level,
          user_password: userPassword,
        };

        insertItemUser(user);
        setState(user);
        router.push("/home");
      }
    } catch (error) {
      console.error("Error al crear cuenta", error);
      Alert.alert("ERROR", "No se pudo crear tu cuenta");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <Text style={styles.label}>Nombre de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Crea un nombre de usuario"
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Registra tu email"
        value={userEmail}
        onChangeText={setUserEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Crea una contraseña"
        value={userPassword}
        onChangeText={setUserPassword}
        keyboardType="visible-password"
        secureTextEntry
      />

      <Button title="Ingresar" onPress={() => handleSignUp()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 8,
    marginBottom: 16,
    borderRadius: 6,
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rememberText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
