# KOSHA: React Native Component Plan & Developer Handoff
## Technical Implementation, Theme Configurations, and Component Architectures

This plan outlines how to implement the KOSHA visual design system and screen planning in a React Native environment using TypeScript, Tailwind CSS (via NativeWind), and React Navigation.

---

## 1. Directory Structure

```
kosha-app/
├── assets/
│   ├── fonts/
│   │   ├── CormorantGaramond-SemiBold.ttf
│   │   └── PlusJakartaSans-Regular.ttf
│   └── images/
│       └── logo.svg
├── tailwind.config.js
├── tsconfig.json
└── src/
    ├── theme/
    │   ├── colors.ts
    │   ├── typography.ts
    │   └── spacing.ts
    ├── context/
    │   └── ThemeContext.tsx (Light/Dark mode state)
    ├── navigation/
    │   ├── RootNavigator.tsx
    │   ├── TabNavigator.tsx
    │   └── Stacks/
    │       ├── HomeStack.tsx
    │       ├── KhotbahStack.tsx
    │       └── ZahbahStack.tsx
    ├── components/
    │   ├── common/
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   └── GlassView.tsx
    │   ├── matchmaking/
    │   │   ├── MatchCard.tsx
    │   │   └── CompatibilityChart.tsx
    │   ├── booking/
    │   │   ├── ServiceCard.tsx
    │   │   └── IntakeFormBuilder.tsx
    │   └── shared/
    │       ├── CartRow.tsx
    │       └── OrderTimeline.tsx
    └── screens/
        ├── onboarding/
        │   └── OnboardingScreen.tsx
        ├── home/
        │   └── HomeScreen.tsx
        ├── matchmaking/
        │   ├── DirectoryScreen.tsx
        │   └── ProfileDetailScreen.tsx
        └── consulting/
            └── LiveSessionScreen.tsx
```

---

## 2. Tailwind Configuration (`tailwind.config.js`)

To utilize NativeWind, the design tokens must be mapped into the Tailwind theme configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          burgundy: {
            DEFAULT: '#4A0D15',
            light: '#6B1D28',
            dark: '#2E050A',
          },
          blue: {
            DEFAULT: '#1A365D',
            light: '#2B4C7E',
            dark: '#0F203A',
          },
          lavender: {
            DEFAULT: '#9F86C0',
            light: '#BEA8D8',
            dark: '#7B5E9D',
          },
          cream: {
            DEFAULT: '#FAF7F2',
            surface: '#FDFBF8',
            border: '#E8E2D9',
          },
          dark: {
            bg: '#140F0F',
            surface: '#1F191A',
            border: '#362B2C',
          }
        },
        feedback: {
          success: '#3E7B5C',
          warning: '#C98E3A',
          danger: '#B84A39',
        }
      },
      fontFamily: {
        serif: ["CormorantGaramond-SemiBold", "serif"],
        sans: ["PlusJakartaSans-Regular", "sans-serif"],
      },
      spacing: {
        '4xs': '4px',
        '2xs': '8px',
        'xs': '12px',
        'sm': '16px',
        'md': '20px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '64px',
        '5xl': '80px',
        '6xl': '96px',
      },
      borderRadius: {
        'input': '12px',
        'button': '14px',
        'card-sm': '16px',
        'card-md': '24px',
        'card-lg': '32px',
        'sheet': '40px',
        'dialog': '28px',
      }
    },
  },
  plugins: [],
}
```

---

## 3. Core Native Components

### Theme Context (`src/context/ThemeContext.tsx`)

Manages bidirectional theme shifting across the app:

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark';

interface ThemeContextProps {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>(systemScheme || 'light');

  useEffect(() => {
    if (systemScheme) setTheme(systemScheme);
  }, [systemScheme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useAppTheme must be used within a ThemeProvider');
  return context;
};
```

### Premium Interaction Button (`src/components/common/Button.tsx`)

Supports haptic clicks and press scaling animations:

```typescript
import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', loading }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 10, stiffness: 350 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 350 });
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const isPrimary = variant === 'primary';

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={loading}
      style={[animatedStyle]}
      className={`h-[54px] w-full items-center justify-center rounded-button px-6
        ${isPrimary ? 'bg-brand-burgundy dark:bg-brand-cream' : 'border-[1.5px] border-brand-burgundy dark:border-brand-cream bg-transparent'}
      `}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#FAF7F2' : '#4A0D15'} />
      ) : (
        <Text className={`font-sans text-button leading-button font-bold tracking-wide
          ${isPrimary ? 'text-brand-cream dark:text-brand-burgundy' : 'text-brand-burgundy dark:text-brand-cream'}
        `}>
          {title}
        </Text>
      )}
    </AnimatedPressable>
  );
};
```

---

## 4. Figma-Ready Auto Layout Instructions

For UI designers transferring this design system into Figma:

### Global Spacing Rules (Figma variables)
* Set **Auto Layout** vertical and horizontal spacing to match our tokens (`8px`, `12px`, `16px`, `24px`).
* **Frame Padding**: Ensure all layout screen frames use `16px` (lg) or `20px` (xl) horizontal padding.

### Curved Component Structures
* **Avatar Frame**: Create a frame of size `80x80` or `120x120` with border-radius `9999px`.
* **Standard Action Card**: Create an Auto Layout vertical container with `16px` padding, set background color to `brand-cream-surface` (light) or `brand-dark-surface` (dark), border thickness `1px` (`brand-cream-border` / `brand-dark-border`), and set corner radius to `24px` (card-md).
* **Bottom Sheet Container**: Design sheets as full-width components with corner radius top-left and top-right set to `40px` (sheet). Add a top layout handle block (`36x4px`, corner radius `9999px`) centered at `8px` top margin.
