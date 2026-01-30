import { Link } from 'expo-router';
import React from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

interface Props extends PressableProps {
  children: string;
  color?: 'primary' | 'secondary' | 'tertiary';
  onpress?: () => void;
  onLongPress?: () => void;
  variant?: 'contained' | 'text-only';
  className?: string;
}
export default function CustomButton({
  children,
  color = 'primary',
  onPress,
  onLongPress,
  variant = 'contained',
  className = '',
  ...props
}: Props) {
  const btnColor = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    tertiary: 'bg-tertiary',
  }[color];

  const textColor = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
  }[color];

  if (variant === 'text-only') {
    return (
      <Pressable
        className={`${className} rounded-md p-3 active:opacity-90`}
        onPress={onPress}
        onLongPress={onLongPress}
        {...props}>
        <Text className={`${textColor} text-center font-work-medium`}>{children}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      className={`${btnColor} ${className} rounded-md p-3 active:opacity-90`}
      onPress={onPress}
      onLongPress={onLongPress}
      {...props}>
      <Text className="text-center text-white">{children}</Text>
    </Pressable>
  );
}
