import type { MetadataRoute } from 'next';

import { robots } from '@/constants/metadata';

export default (): MetadataRoute.Robots => robots;
