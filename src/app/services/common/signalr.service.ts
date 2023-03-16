import { Inject, Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr/dist/esm/HubConnection';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor(@Inject('baseSignalRUrl') private baseSignalRUrl: string) {}

  start(hubUrl: string) {
    hubUrl = this.baseSignalRUrl + hubUrl;

    const builder: HubConnectionBuilder = new HubConnectionBuilder();
    const hubConnection: HubConnection = builder
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    hubConnection
      .start()
      .then(() => {
        console.log('Connected');
      })
      .catch((error) => setTimeout(() => this.start(hubUrl), 2000));

    hubConnection.onreconnected((connectionId) => console.log('Reconnected'));
    hubConnection.onreconnecting((error) => console.log('Reconnecting'));
    hubConnection.onclose((error) => console.log('Close Reconnection'));
    return hubConnection;
  }

  invoke(
    hubUrl: string,
    procedureName: string,
    message: any,
    successCallBack?: (value) => void,
    errorCallBack?: (error) => void
  ) {
    this.start(hubUrl)
      .invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(hubUrl: string, procedureName: string, callBack: (...message: any) => void) {
    this.start(hubUrl).on(procedureName, callBack);
  }
}
