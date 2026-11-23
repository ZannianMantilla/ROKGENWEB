import { Hero } from '../sections/Hero';
import { Ticker } from '../sections/Ticker';
import { About } from '../sections/About';
import { Services } from '../sections/Services';
import { Stack } from '../sections/Stack';
import { Projects } from '../sections/Projects';
import { Journey } from '../sections/Journey';
import { Contact } from '../sections/Contact';

/** Inicio: todas las secciones en resumen, cada una con "Ver más" hacia su página. */
export function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <About more />
      <Services more />
      <Stack more />
      <Projects more />
      <Journey more />
      <Contact more />
    </>
  );
}
