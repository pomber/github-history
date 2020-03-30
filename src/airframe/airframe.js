import easing from "./easing";
const MULTIPLY = "multiply";

/* eslint-disable */
function mergeResults(results, composite) {
  const firstResult = results[0];
  if (results.length < 2) {
    return firstResult;
  }
  if (Array.isArray(firstResult)) {
    return firstResult.map((_, i) => {
      return mergeResults(
        results.map(result => result[i]),
        composite
      );
    });
  } else {
    const merged = Object.assign({}, ...results);

    if (composite === MULTIPLY) {
      const opacities = results.map(x => x.opacity).filter(x => x != null);
      if (opacities.length !== 0) {
        merged.opacity = opacities.reduce((a, b) => a * b);
      }
    }
    return merged;
  }
}

const airframe = {
  parallel: ({ children: fns }) => {
    return (t, ...args) => {
      const styles = fns.map(fn => fn(t, ...args));
      const result = mergeResults(styles, MULTIPLY);
      return result;
    };
  },
  chain: ({ children: fns, durations }) => {
    return (t, ...args) => {
      let style = fns[0](0, ...args);
      let lowerDuration = 0;
      for (let i = 0; i < fns.length; i++) {
        const fn = fns[i];
        const thisDuration = durations[i];
        const upperDuration = lowerDuration + thisDuration;
        if (lowerDuration <= t && t <= upperDuration) {
          const innerT = (t - lowerDuration) / thisDuration;
          style = mergeResults([style, fn(innerT, ...args)]);
        } else if (upperDuration < t) {
          // merge the end of previous animation
          style = mergeResults([style, fn(1, ...args)]);
        } else if (t < lowerDuration) {
          // merge the start of future animation
          style = mergeResults([fn(0, ...args), style]);
        }
        lowerDuration = upperDuration;
      }
      return style;
    };
  },
  delay: () => () => ({}),
  tween: ({ from, to, ease = easing.linear }) => (t, targets) => {
    const style = {};
    Object.keys(from).forEach(key => {
      const value = from[key] + (to[key] - from[key]) * ease(t);
      if (key === "x") {
        style["transform"] = `translateX(${value}px)`;
      } else {
        style[key] = value;
      }
    });
    return style;
  }
};

/* @jsx createAnimation */
export const Stagger = props => (t, targets) => {
  const filter = target => !props.filter || props.filter(target);
  const interval =
    targets.filter(filter).length < 2
      ? 0
      : props.interval / (targets.filter(filter).length - 1);
  let i = 0;
  return targets.map(target => {
    // console.log(target, props.filter(target));
    if (!filter(target)) {
      return {};
    }
    const animation = (
      <parallel>
        <chain durations={[i * interval, 1 - props.interval]}>
          <delay />
          {props.children[0]}
        </chain>
      </parallel>
    );
    i++;
    const result = animation(t, target);
    // console.log("Stagger Result", t, result);
    return result;
  });
};

export function createAnimation(type, props, ...children) {
  const allProps = Object.assign({ children }, props);
  if (typeof type === "string") {
    if (window.LOG === "verbose") {
      return (t, ...args) => {
        console.groupCollapsed(type, t);
        const result = airframe[type](allProps)(t, ...args);
        console.log(result);
        console.groupEnd();
        return result;
      };
    } else {
      return airframe[type](allProps);
    }
  } else {
    if (window.LOG === "verbose") {
      return (t, ...args) => {
        console.groupCollapsed(type.name, t);
        const result = type(allProps)(t, ...args);
        console.log(result);
        console.groupEnd();
        return result;
      };
    } else {
      return type(allProps);
    }
  }
}
