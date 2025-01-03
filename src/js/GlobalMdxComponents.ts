import Aside from 'src/components/Aside.astro';
import ChildPages from 'src/components/ChildPages.astro';
import CircuitJs from 'src/components/CircuitJs.astro';
import Image from 'src/components/Image.astro';
import IRef from 'src/components/IRef.astro';
import Table from 'src/components/Table.astro';
import WarningIsNotes from 'src/components/WarningIsNotes.astro';
import WrappableRow from 'src/components/WrappableRow.astro';

export function getGlobalMdxComponents() {
  return {
    Aside: Aside,
    ChildPages: ChildPages,
    CircuitJs: CircuitJs,
    Image: Image,
    IRef: IRef,
    Table: Table,
    WarningIsNotes: WarningIsNotes,
    WrappableRow: WrappableRow,
  }
}