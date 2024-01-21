import React, { useEffect, useRef } from "react";
import { AudioRecorder } from "../";

const App = () => {
  const recorderRef = useRef<AudioRecorder>(new AudioRecorder());
  const onStart = () => {
    recorderRef.current.start();
  };
  //@ts-ignore
  window.__recorder = recorderRef.current;
  return <button onClick={onStart}>start</button>;
};

export default App;
