import React, { useEffect, useState } from "react";
import { playerMachine } from "./machine/playerMachine";
import { useMachine } from "@xstate/react";
import { LeftPanel } from "./components/leftPanel";
import ReactPlayer from "react-player";
import "./App.css";

import io from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [state, send] = useMachine(playerMachine);
  const [playing, setPlaying] = useState(false);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    socket.on("sync-list", ({ data }) => {
      send({ type: "ADD", data });
    });
  }, []);

  useEffect(() => {
    console.log("out", state.context.list);
    setUrl(state.context.list[0]);
  }, [state.context.list]);

  return (
    <div className="flex m-5">
      <LeftPanel send={send} state={state} socket={socket} />
      {state.matches("play") && (
        <div>
          <ReactPlayer
            url={url}
            controls
            playing={playing}
            onReady={() => {
              setPlaying(true);
            }}
            onEnded={() => {
              send({ type: "REMOVE" });
            }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
