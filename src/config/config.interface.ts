import type { config as base } from './configs/default';
import type { config as production } from './configs/production';

export type Objectype = Record<string, unknown>;
export type Default = typeof base;
export type Production = typeof production;
export type Config = Default & Production;
