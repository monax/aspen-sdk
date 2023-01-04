import type { CollectionContract } from './CollectionContract';

export abstract class BaseFeature {
  readonly base: CollectionContract;

  constructor(base: CollectionContract) {
    this.base = base;
  }

  abstract get supported(): boolean;
}
