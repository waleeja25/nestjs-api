import { SetMetadata } from '@nestjs/common';

export const RESOURCE_NAME = 'resource_name';

export const ResourceName = (name: string) => SetMetadata(RESOURCE_NAME, name);
