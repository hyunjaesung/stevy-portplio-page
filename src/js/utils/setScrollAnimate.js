export default function (dom, animate, sectionScrollRatio) {
  animate.forEach(({ query, info = [], start = 0, finish = 1 }) => {
    const target = dom.querySelector(query);
    info.forEach(({ trigger, property, value }) => {
      const [startV, endV] = value;
      const [startR, endR] = trigger;

      if (sectionScrollRatio >= startR && sectionScrollRatio <= endR) {
        const result =
          ((sectionScrollRatio - startR) / (endR - startR)) * (endV - startV) +
          startV;
        if (property === "transform") {
          target.style[property] = `translate3d(0, ${parseInt(
            result * 100
          )}%, 0)`;
        } else if (property === "top") {
          target.style[property] = `${result.toFixed(1)}px`;
        } else {
          target.style[property] = result.toFixed(1);
        }
      }
    });
    if (sectionScrollRatio >= start && sectionScrollRatio <= finish) {
      if (target.style.display === "none") {
        target.style.display = "block";
      }
    } else {
      if (target.style.display !== "none") {
        target.style.display = "none";
      }
    }
  });
}
