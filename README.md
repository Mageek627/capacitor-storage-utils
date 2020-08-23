# @mageek/capacitor-storage-utils

![License](https://img.shields.io/badge/license-MIT-red)
![Capacitor](https://img.shields.io/badge/capacitor-blue)

Simplified API for Capacitor Storage.

## Installation

```bash
$ npm i @mageek/capacitor-storage-utils
```

## Usage

```js
import { StorageUtils } from '@mageek/capacitor-storage-utils';

await StorageUtils.setJSON('test1', { foo: 'bar' });
const test1 = await StorageUtils.getJSON('test1');

await StorageUtils.set('test2', 123);
const test2 = await StorageUtils.get('test2');

await StorageUtils.unset('test1');
await StorageUtils.clear();
```
