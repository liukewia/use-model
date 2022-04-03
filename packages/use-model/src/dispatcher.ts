import {
  DispatcherCallbacks,
  ModelData,
} from './types';

export default class Dispatcher {
  public callbacks: DispatcherCallbacks = {};
  public data: ModelData = {};
  public update = (namespace: string) => {
    (this.callbacks[namespace] || []).forEach((callback: Function) => {
      try {
        const data = this.data[namespace];
        callback(data);
      } catch (error) {
        callback(undefined);
      }
    });
  };
}
