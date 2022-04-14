import { Injectable } from '@angular/core';
import * as RecordRTC from 'recordrtc';

const MAX_AUDIO_LIMIT = 600000;

@Injectable({providedIn: 'root'})

export class AudioRecordingV2Service {
  constructor() { }

  public status: 'recording' | 'ideal'
    = 'ideal';

  private mediaRecorder: RecordRTC;
  public audioBlob: Blob;
  /**
   * Checks permissions and devices
   */
  public async check(){
    try{
      const res = await navigator.mediaDevices.getUserMedia({ audio: true })
      return true;
    } catch(e){
      console.error('Audio Devices not found', e);
      return false;
    }
  }

  /**
   * Starts the audio recording
   *
   * @throws No Devices
   * @throws Permison denied
   * @throws unknown error
   */
  public start(){

    this.reset();

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {

      const options: RecordRTC.Options = {
        type: 'audio',
      };
      //Start Actuall Recording
      this.mediaRecorder = new RecordRTC(stream, options);
      this.mediaRecorder.startRecording();

      console.log('Recording Started');
      this.status = 'recording';

      // set max limit
      setTimeout(() => {
        this.stop();
      }, MAX_AUDIO_LIMIT);

    }).catch(e => {
      console.error('No audio devices found', e)
      throw e;
    });
  }

  public stop(callback = () => {}){
    this.mediaRecorder.stopRecording(() => {
      this.audioBlob = this.mediaRecorder.getBlob();
      console.log('recording ended', this.audioBlob);
      this.mediaRecorder = null;
      callback();
    })
  }

  private reset(){
    this.audioBlob = null;
    this.mediaRecorder = null;
    this.status = 'ideal';
  }

   async BlobToBase64() {
    const reader = new FileReader();
    reader.readAsDataURL(this.audioBlob);
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        console.log(reader.result);
        resolve(reader.result);
      };
      reader.onerror = () => {
        console.error(reader.error);
        reject(reader.error);
      }
    })


  }

}

