import React, { useState } from "react";

export const AddInput = ({ send, socket }) => {
  const [urlLink, setUrlLink] = useState("");

  const sendDataAndClearInput = (data) => {
    socket.emit("add-to-list", {
      data,
    });
    setUrlLink("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendDataAndClearInput(event.target.value);
    }
  };

  return (
    <div className="flex items-center justify-center flex-wrap bg-gray-200 p-6">
      <input
        name="addUrl"
        type="text"
        value={urlLink}
        className="shadow border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent border-gray-400 p-2 mr-5 w-2/3 rounded-md"
        onChange={(e) => setUrlLink(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded-md"
        onClick={() => sendDataAndClearInput(urlLink)}
      >
        Add
      </button>
    </div>
  );
};
