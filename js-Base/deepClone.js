function clone(target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {};

    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);

    const keys = isArray ? undefined : Object.keys(target);
    forEach(key || target, (value, key) => {
      if (keys) {
        key = value;
      }
      cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
  } else {
    return target;
  }
}
