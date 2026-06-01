// Schematic of the selected Sallen-Key filter, shown next to the inputs so the
// user can see what R1/R2/C1/C2/R3/R4 refer to. Uses pre-rendered webp images
// (variable-gain low-pass / high-pass); the unity-gain case is noted in the
// caption rather than with a separate image.
import lowPassImg from './low-pass-schematic.webp?url';
import highPassImg from './high-pass-schematic.webp?url';

export default function Schematic({ type, unity }) {
  const lp = type === 'lp';
  const src = lp ? lowPassImg : highPassImg;
  const name = lp ? 'Low-pass' : 'High-pass';

  return (
    <figure class="sk-schem">
      <img src={src} alt={`${name} Sallen-Key filter schematic`} width="640" height="320" />
      <figcaption class="sk-schem__cap">
        {unity
          ? <>{name} Sallen-Key — for unity gain, omit R<sub>3</sub>/R<sub>4</sub> and tie V<sub>−</sub> directly to V<sub>out</sub>.</>
          : <>{name} Sallen-Key (variable gain).</>}
      </figcaption>
    </figure>
  );
}
