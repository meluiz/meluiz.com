import type { MetadataRoute } from 'next';

import { manifest } from '@/constants/metadata';

export default (): MetadataRoute.Manifest => manifest;
