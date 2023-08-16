import type {
  Config,
  Default,
  Objectype,
  Production,
} from './config.interface';

const util = {
  isObject<T>(value: T): value is T & Objectype {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },
  merge(target, source) {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (!sourceValue) {
        source[key] = targetValue;
      }
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }
    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  const { config } = <{ config: Default }>(
    await import(`${__dirname}/configs/default`)
  );
  const { config: environment } = <{ config: Production }>(
    await import(
      `${__dirname}/configs/${process.env.NODE_ENV || 'development'}`
    )
  );

  // object deep merge
  return util.merge(config, environment);
};
