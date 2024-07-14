// mdx-components.ts
// As per https://github.com/mdx-js/mdx-analyzer
import Image from './src/components/Image'
import WarningIsNotes from './src/components/WarningIsNotes'

const components = {
  Image,
  WarningIsNotes,
}

declare global {
  type MDXProvidedComponents = typeof components
}

export function useMDXComponents(): MDXProvidedComponents {
  return components
}