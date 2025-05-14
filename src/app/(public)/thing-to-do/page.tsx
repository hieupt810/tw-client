import React from 'react';

import HeroSection from '@/components/hero-section';

const HERO_TITLE = 'Explore the best things to do in Vietnam';
const HERO_DESCRIPTION =
  'Discover unforgettable experiences and activities for your next adventure, whether you are traveling for leisure or business.';

export default function ThingsToDoPage() {
  return (
    <React.Fragment>
      <HeroSection title={HERO_TITLE} description={HERO_DESCRIPTION} />
    </React.Fragment>
  );
}
