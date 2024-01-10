declare module '*.svg?url' {
  import { StaticImageData } from 'next/image';

  const content: StaticImageData;
  export default content;
}

declare module '*.svg' {
  import * as React from 'react';

  const component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default component;
}