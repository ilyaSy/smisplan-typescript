export const createObserver = () => {
  const subscribers: Map<Function, VoidFunction> = new Map();

  const notify = (payload: any) => subscribers.forEach((_, cb) => cb(payload));

  const unsubscribe = (cb: Function) => subscribers.delete(cb);

  const unsubscribeAll = () => subscribers.clear();

  const subscribe = (cb: Function) => {
    if (subscribers.has(cb)) {
      return subscribers.get(cb);
    }

    const clearSubscription = () => unsubscribe(cb);

    subscribers.set(cb, clearSubscription);

    return clearSubscription;
  };

  return { subscribe, unsubscribe, unsubscribeAll, notify };
};
