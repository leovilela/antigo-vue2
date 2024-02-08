/* eslint no-mixed-operators: 0 */
/* eslint-disable-next-line import/prefer-default-export */
export const HandlerUtil = () => {
  let i = 1;

  const listeners = {};

  return {
    addListener(element, event, handler, capture) {
      element.addEventListener(event, handler, capture);
      listeners[i] = {
        element,
        event,
        handler,
        capture,
      };
      return i++;
    },
    removeListener(id) {
      if (id in listeners) {
        const h = listeners[id];
        h.element.removeEventListener(h.event, h.handler, h.capture);
        delete listeners[id];
      }
    },
  };
};
