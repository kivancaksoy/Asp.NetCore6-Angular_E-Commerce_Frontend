import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr/dist/esm/HubConnection';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  constructor() {}

  private _conenction: HubConnection;
  get connection(): HubConnection {
    return this._conenction;
  }

  start(hubUrl: string) {
    if (
      !this.connection ||
      this._conenction?.state == HubConnectionState.Disconnected
    ) {
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

      this._conenction = hubConnection;
    }

    this._conenction.onreconnected((connectionId) =>
      console.log('Reconnected')
    );
    this._conenction.onreconnecting((error) => console.log('Reconnecting'));
    this._conenction.onclose((error) => console.log('Close Reconnection'));
  }

  invoke(
    procedureName: string,
    message: any,
    successCallBack?: (value) => void,
    errorCallBack?: (error) => void
  ) {
    this.connection
      .invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(procedureName: string, callBack: (...message: any) => void) {
    this.connection.on(procedureName, callBack);
  }
}
