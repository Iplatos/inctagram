import * as PopoverPrimitive from '@radix-ui/react-dialog';

export * from './popover-root';

import { PopoverContent, PopoverRoot, PopoverTrigger } from './popover-root';

export const Popover = Object.assign(PopoverRoot, {
  Content: PopoverContent,
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
});
