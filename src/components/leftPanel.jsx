import React from "react";
import { AddInput } from "./addInput";

export function LeftPanel({ send, state, socket }) {
  return (
    <div className="text-sm w-1/2">
      <AddInput send={send} socket={socket} />
      <div data-testid="list">
        {state.context.list.map((item, index) => {
          return (
            <div
              key={index}
              data-testid={`list-item-${index}`}
              className="flex justify-start text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2"
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
