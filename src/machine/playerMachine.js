import { Machine, assign } from "xstate";

const notEmpty = (context) => {
  return context.list.length > 0;
};

const emptyList = (context) => {
  return context.list.length === 0;
};

export const playerMachine = Machine({
  id: "player",
  initial: "stop",
  context: {
    list: [
      // "https://www.youtube.com/watch?v=kl7RhCyDf-M",
      // "https://www.youtube.com/watch?v=rUWxSEwctFU",
    ],
  },
  states: {
    play: {
      always: [
        {
          cond: emptyList,
          target: "stop",
        },
      ],
      on: {
        STOP: "stop",
      },
    },
    stop: {
      always: [
        {
          cond: notEmpty,
          target: "play",
        },
      ],
      on: {
        PLAY: "play",
      },
    },
  },
  on: {
    ADD: {
      target: "play",
      actions: assign({
        list: (context, event) => {
          if (!context.list.includes(event.data)) {
            return context.list.concat([event.data]);
          }
          return context.list;
        },
      }),
    },
    REMOVE: {
      target: "play",
      cond: notEmpty,
      actions: assign({
        list: (context) => {
          return context.list.slice(1);
        },
      }),
    },
  },
});
