// Schematic of the selected Sallen-Key filter, shown next to the inputs so the
// user can see what R1/R2/C1/C2/R3/R4 refer to. Uses pre-rendered webp images
// chosen by filter type (low-pass / high-pass) and gain mode (variable gain
// with R3/R4, or unity gain with V- tied straight to the output).
import lowPassImg from './low-pass-schematic.webp?url';
import lowPassUnityImg from './low-pass-schematic-unity-gain.webp?url';
import highPassImg from './high-pass-schematic.webp?url';
import highPassUnityImg from './high-pass-schematic-unity-gain.webp?url';

export default function Schematic({ type, unity }) {
  const lp = type === 'lp';
  const name = lp ? 'Low-pass' : 'High-pass';
  const src = lp
    ? (unity ? lowPassUnityImg : lowPassImg)
    : (unity ? highPassUnityImg : highPassImg);

  return (
    <figure class="sk-schem">
      <img
        src={src}
        alt={`${name} ${unity ? 'unity-gain' : 'variable-gain'} Sallen-Key filter schematic`}
        width="640"
        height="320"
      />
      <figcaption class="sk-schem__cap">
        {name} Sallen-Key{unity ? ', unity gain' : ', variable gain'}.
      </figcaption>
    </figure>
  );
}
