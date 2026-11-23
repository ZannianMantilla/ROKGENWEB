import { projects } from '../../data/content';
import { useT } from '../../hooks/useT';
import { Hero } from '../sections/Hero';
import { Ticker } from '../sections/Ticker';
import { About } from '../sections/About';
import { Areas } from '../sections/Areas';
import { Projects } from '../sections/Projects';
import { Community } from '../sections/Community';
import { OtherSkills } from '../sections/OtherSkills';
import { Journey } from '../sections/Journey';
import { Contact } from '../sections/Contact';

/** Inicio: presentación y mis tres áreas (software, community manager y otros conocimientos). */
export function HomePage() {
  const { t } = useT();
  return (
    <>
      <Hero />
      <Ticker />
      <About more />
      <Areas />
      <Projects more kicker={t(projects.areaKicker)} />
      <Community />
      <OtherSkills />
      <Journey more />
      <Contact more />
    </>
  );
}
