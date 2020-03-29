/* eslint-disable */
import { createAnimation, Stagger } from "./airframe/airframe";
import easing from "./airframe/easing";

const dx = 250;
const offOpacity = 0.6;

/* @jsx createAnimation */

// window.LOG = "verbose";

const SlideToLeft = () => (
  <tween
    from={{ x: 0, opacity: 1 }}
    to={{ x: -dx, opacity: 0 }}
    ease={easing.easeInQuad}
  />
);

function ShrinkHeight() {
  return (
    <tween
      from={{ height: 15 }}
      to={{ height: 0 }}
      ease={easing.easeInOutQuad}
    />
  );
}

const SlideFromRight = () => (
  <tween
    from={{ x: dx, opacity: 0 }}
    to={{ x: 0, opacity: 1 }}
    ease={easing.easeOutQuad}
  />
);
function GrowHeight() {
  return (
    <tween
      from={{ height: 0 }}
      to={{ height: 15 }}
      ease={easing.easeInOutQuad}
    />
  );
}

function SwitchLines({ filterExit, filterEnter, filterFadeOut }) {
  return (
    <parallel>
      <Stagger interval={0.2} filter={filterExit}>
        <ShrinkHeight />
      </Stagger>
      <Stagger interval={0.2} filter={filterEnter}>
        <GrowHeight />
      </Stagger>
      <Stagger interval={0} filter={filterEnter}>
        <tween from={{ opacity: offOpacity }} to={{ opacity: 1 }} />
      </Stagger>
      <Stagger interval={0} filter={filterFadeOut}>
        <tween
          from={{ opacity: 1 }}
          to={{ opacity: offOpacity }}
          ease={easing.easeOutCubic}
        />
      </Stagger>
      <Stagger interval={0} filter={l => !filterEnter(l) && !filterFadeOut(l)}>
        <tween from={{ opacity: offOpacity }} to={{ opacity: offOpacity }} />
      </Stagger>
    </parallel>
  );
}

export default (
  <chain durations={[0.5, 0.5]}>
    <SwitchLines
      filterExit={line => line.left && !line.middle}
      filterEnter={line => !line.left && line.middle}
      filterFadeOut={line => false}
    />
    <SwitchLines
      filterExit={line => line.middle && !line.right}
      filterEnter={line => !line.middle && line.right}
      filterFadeOut={line => !line.left && line.middle}
    />
  </chain>
);
