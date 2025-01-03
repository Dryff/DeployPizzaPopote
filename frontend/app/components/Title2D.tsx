'use client'

import React from 'react';
import { useEffect, useState} from 'react';
import { Text } from '@react-three/drei';
import { colors } from '@/app/styles/styles';

export const Title2D: React.FC = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  if (isMobile) {
    return (
      <group position={[0, 9, -20]}>
        <Text
          position={[0, 7, 0]}
          scale={[5, 5, 5]}
          color={colors.TITLE}
          anchorX="center"
          anchorY="middle"
          fontSize={1}
          font="/fonts/New Pizza.otf"
          letterSpacing={0.01}
        >
          Pizza
        </Text>
        <Text
          position={[0, 2, 0]}
          scale={[5, 5, 5]}
          color={colors.TITLE}
          anchorX="center"
          anchorY="middle"
          fontSize={1}
          font="/fonts/New Pizza.otf"
          letterSpacing={0.01}
        >
          Po&apos;pote
        </Text>
      </group>
    );
  }

  // Desktop version
  return (
    <Text
      position={[0, 10, -20]}
      scale={[8, 8, 8]}
      color={colors.TITLE}
      anchorX="center"
      anchorY="middle"
      fontSize={1}
      font="/fonts/New Pizza.otf"
      letterSpacing={0.01}
    >
      Pizza Po&apos;pote
    </Text>
  );
};