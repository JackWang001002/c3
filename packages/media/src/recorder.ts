import { log } from "./utils";
import { waitFor } from "@c3/utils";

export class Recorder {
  #chunks: Blob[] = [];
  public recorder: MediaRecorder | undefined = undefined;

  constructor(constraints: MediaStreamConstraints) {
    if (!navigator.mediaDevices.getUserMedia) {
      throw new Error("getUserMedia not supported");
    }
    const create = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.recorder = new MediaRecorder(stream);
      } catch (err) {
        console.log("The following error occured: " + err);
      }
    };
    create();
  }

  async start() {
    await waitFor(() => !!this.recorder);
    this.recorder!.start();
    console.log("recorder started");
    this.recorder!.ondataavailable = (e: BlobEvent) => {
      this.#chunks.push(e.data);
      log("ondataavailable", e.data.size, this.#chunks.length);
    };
  }
  stop() {
    if (!this.recorder) {
      throw new Error("Recorder not initialized");
    }
    this.recorder.stop();
  }
  async getData() {
    if (!this.recorder) {
      throw new Error("Recorder not initialized");
    }
    return new Promise((resolve, reject) => {
      this.recorder!.onstop = () => {
        const blob = new Blob(this.#chunks, { type: this.recorder!.mimeType });
        const url = window.URL.createObjectURL(blob);
        this.#chunks = [];
        resolve({ blob, url });
      };
      this.recorder!.onerror = e => {
        reject(e);
      };
    });
  }

  on<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    this.recorder?.addEventListener(type, listener, options);
  }
  off<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ) {
    this.recorder?.removeEventListener(type, listener, options);
  }
}
