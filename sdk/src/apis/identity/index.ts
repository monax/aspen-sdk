import { OpenAPI } from './generated';

export * from './auth';
export * from './generated';
export * from './scopes';

// Sensible default
OpenAPI.BASE = 'https://identity.aspenft.io';
