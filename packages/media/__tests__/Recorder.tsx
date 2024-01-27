import React, { useEffect, useRef, useState } from "react";
import { Recorder } from "..";

const App = () => {
  const recorderRef = useRef<Recorder>();
  const [url, setUrl] = useState();
  const onStart = () => {
    recorderRef.current = new Recorder();
    recorderRef.current.start();
    //@ts-ignore
    window.__recorder = recorderRef.current;
  };
  return (
    <div>
      <button onClick={onStart}>start</button>;
      <button
        onClick={async () => {
          recorderRef.current.stop();
          const { url, blob } = await recorderRef.current?.getData();
          console.log("blob", blob);
          setUrl(url);
        }}
      >
        stop
      </button>
      ;
      <audio controls src={url} id="audio" />
      <a id="download" href={url} download="audio.webm">
        download
      </a>
    </div>
  );
};

export default App;
