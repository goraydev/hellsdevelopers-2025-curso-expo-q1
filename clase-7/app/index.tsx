import { Screen } from "@/components/share/Screen";
import { Link } from "@/components/share/Link";

export default function Index() {
  return (
    <>
      <Screen title="Ecommerce App" scroll={false}>
        <Link href="/camera">Camera</Link>
        <Link href="/users/login">Users/Login</Link>
        <Link href="/users/signup">Crear cuenta</Link>
        <Link href="/home">Home</Link>
        <Link href="/backoffice">Backoffice</Link>
        <Link href="/products">Productos</Link>
      </Screen>
    </>
  );
}
