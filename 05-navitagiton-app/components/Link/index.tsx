import { Link as LinkRouter } from 'expo-router';
import { Text } from 'react-native';

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function Link({ href, children, className }: Props) {
  return (
    <LinkRouter href={href} className={`${className} rounded-full bg-emerald-500 p-2`}>
      <Text className="text-center text-xl font-bold text-white">{children}</Text>
    </LinkRouter>
  );
}
