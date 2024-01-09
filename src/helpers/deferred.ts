/**
 * Promise deferred helper.
 */
export class Deferred {
  /**
   * Promise being awaited.
   */
  _promise: Promise<unknown>;

  /**
   * Rejects the promise.
   */
  reject: () => void = () => { return; };

  /**
   * Resolves the promise.
   */
  resolve: (value?: void | PromiseLike<void>) => void = (value?: unknown) => { return; };

  /**
   * Instantiates a new deferred promise.
   */
  constructor() {
    this._promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  /**
   * Awaits the promise.
   */
  async isResolved(): Promise<void> {
    await this._promise;
  }

  /**
   * Retrieves the awaited promise.
   *
   * @returns {Promise<unknown>} Awaited promise.
   */
  getPromise(): Promise<unknown> {
    return this._promise;
  }
}
