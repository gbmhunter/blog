import Aside from 'src/components/Aside.astro';
import ChildPages from 'src/components/ChildPages.astro';
import CircuitJs from 'src/components/CircuitJs.astro';
import Image from 'src/components/Image.astro';
import WarningIsNotes from 'src/components/WarningIsNotes.astro';

export function getGlobalMdxComponents() {
  return {
    Aside: Aside,
    ChildPages: ChildPages,
    CircuitJs: CircuitJs,
    Image: Image,
    WarningIsNotes: WarningIsNotes
  }
}