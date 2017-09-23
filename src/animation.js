export const cubicInOut = x => {
  // eslint-disable-next-line no-cond-assign
  if ((x *= 2) < 1) {
    return 1 / 2 * x * x * x;
  }
  return 1 / 2 * ((x -= 2) * x * x + 2);
};

const Animations = {
  props: { animations: {} },

  registerStart(name) {
    const { animations } = this.props;

    if (animations[name]) {
      this.stop(name);
    }

    if (!animations[name]) {
      animations[name] = {};
    }
  },

  getCurrentTime() {
    return new Date().getTime();
  },

  stop(name) {
    const { animations } = this.props;

    if (animations[name]) {
      if (animations[name].raf) {
        window.cancelAnimationFrame(animations[name].raf);
      }
      delete animations[name];
    }
  },

  animate({
    name,
    start,
    end,
    duration,
    easing: customEasing,
    onUpdate,
    onComplete
  }) {
    const easing = customEasing || cubicInOut;
    const { animations } = this.props;
    const startTime = this.getCurrentTime();
    let timePassed;

    this.registerStart(name);

    const animationLoop = () => {
      if (animations[name]) {
        timePassed = this.getCurrentTime() - startTime;

        if (timePassed >= duration) {
          this.stop(name);
          onUpdate(end);
          if (onComplete) {
            onComplete();
          }
          return;
        }

        onUpdate((end - start) * easing(timePassed / duration) + start);

        animations[name].raf = window.requestAnimationFrame(animationLoop);
      }
    };
    animationLoop();
  }
};

export default Animations;
