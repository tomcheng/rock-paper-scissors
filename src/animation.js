export const cubicOut = x => --x * x * x + 1;

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
    delay: delayIn,
    easing: customEasing,
    onUpdate,
    onComplete
  }) {
    const easing = customEasing || cubicInOut;
    const delay = delayIn || 0;
    const { animations } = this.props;
    const startTime = this.getCurrentTime();
    let timePassed;

    this.registerStart(name);

    const animationLoop = () => {
      if (animations[name]) {
        timePassed = this.getCurrentTime() - startTime;

        if (timePassed >= duration + delay) {
          this.stop(name);
          onUpdate(end);
          if (onComplete) {
            onComplete();
          }
          return;
        }

        onUpdate(
          timePassed < delay
            ? start
            : (end - start) * easing((timePassed - delay) / duration) + start
        );

        animations[name].raf = window.requestAnimationFrame(animationLoop);
      }
    };
    animationLoop();
  }
};

export default Animations;
