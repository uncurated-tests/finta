import { StyleFunctionProps, theme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';

// export const Card = {
//   baseStyle: (props: StyleFunctionProps) => ({
//     bg: mode('white', 'gray.dark.3')(props),
//     rounded: 'md',
//     p: {
//       base: 4,
//       md: 8
//     }
//   })
// }

const baseTheme = theme.components.Card;

export const Card = {
  ...baseTheme,
  baseStyle: (props: StyleFunctionProps) => ({
    ...baseTheme.baseStyle,
    container: {
      ...baseTheme.baseStyle?.container,
      backgroundColor: mode('white', 'gray.dark.4')(props)
    }
  })
}

// {
//   baseStyle: (props: StyleFunctionProps) => ({
//     ...theme.components.Card.baseStyle
//   }),
//   variants: {
//     elevated: (props: StyleFunctionProps) => {
//       const baseElevatedTheme = theme.components.Card.variants?.elevated;
//       return {
//         ...baseElevatedTheme,
//         container: baseElevatedTheme?.container
//       }
//     }
//   }
// }