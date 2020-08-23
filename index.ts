import { Plugins } from '@capacitor/core';

/**
 * For Stackblitz testing, or other cases where '@capacitor/core' wouldn't be available
 */
class AlternativeStorage {
  private constructor() {}

  public static async get(options: {
    key: string;
  }): Promise<{ value: string | null }> {
    return { value: localStorage.getItem('_cap_' + options.key) };
  }
  public static async set(options: {
    key: string;
    value: string;
  }): Promise<void> {
    localStorage.setItem('_cap_' + options.key, options.value);
  }
  public static async clear(): Promise<void> {
    localStorage.clear();
  }
}

const S = typeof Plugins === 'undefined' ? AlternativeStorage : Plugins.Storage;

export class StorageUtils {
  private constructor() {}

  public static async set(key: string, value: unknown): Promise<void> {
    await S.set({
      key,
      value: value + '',
    });
  }
  public static async get(key: string): Promise<string | null> {
    try {
      const x = await S.get({ key });
      return x.value;
    } catch {
      return null;
    }
  }
  public static async setJSON(
    key: string,
    value: object | null
  ): Promise<void> {
    try {
      const s = JSON.stringify(value);
      await this.set(key, s);
    } catch {
      console.error('JSON.stringify failed');
    }
  }
  public static async getJSON(key: string): Promise<object | null> {
    try {
      const value = await this.get(key);
      return value === null || value === ''
        ? null
        : (JSON.parse(value) as object);
    } catch {
      console.error('JSON.parse failed');
      return null;
    }
  }
  public static async unset(key: string): Promise<void> {
    await this.set(key, '');
  }
  public static async clear(): Promise<void> {
    await S.clear();
  }
}
