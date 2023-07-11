import { Subject, Subscription } from 'rxjs';

export enum DriverConnectionState {
  Unknown,
  Disconnected,
  Pending,
  Connected
}

export const DriverConnectionStateNames:Record<number, String > = {
  [DriverConnectionState.Unknown]: 'Unknown',
  [DriverConnectionState.Disconnected]: 'Disconnected',
  [DriverConnectionState.Pending]: 'Pending',
  [DriverConnectionState.Connected]: 'Connected',
}

export enum DriverValueDirection {
  Input = 1,
  Output,
}

export  abstract class Driver<InputType, OutputType> {
  id: number;
  name: string;
  connectionState: DriverConnectionState;

  inputStream$: Subject<InputType>;
  outputStream$: Subject<OutputType>;

  connect() {}
  disconnect() {}

}

export  abstract class DriverService<InputType, OutputType> {

  inputStream$ = new Subject<InputType>();
  outputStream$ = new Subject<OutputType>();

  connectionState: DriverConnectionState = DriverConnectionState.Disconnected;
  subs: Subscription[] = [];

  ioLog: {
    input: any[],
    output: any[],
  } = {
    input: [],
    output: [],
  }

  constructor() { }

  connect() {
    this.startLogging();
    this.connectionState = DriverConnectionState.Connected;
  }

  disconnect() {
    this.subs.forEach(sub => sub.unsubscribe());
    this.connectionState = DriverConnectionState.Disconnected;
  }

  getInputStream() {
    return this.inputStream$;
  }

  getOutputStream() {
    return this.outputStream$;
  }

  input(value: InputType) {
    this.inputStream$.next(value);
  }

  output():Subject<OutputType> {
    return this.outputStream$;
  }

  startLogging() {
    this.subs.push(this.inputStream$.subscribe(res => {
      this.ioLog.input.push({t: new Date().getTime(), data: JSON.stringify(res), direction: DriverValueDirection.Input})
    }))
    this.subs.push(this.outputStream$.subscribe(res => {
      this.ioLog.output.push({t: new Date().getTime(), data: JSON.stringify(res), direction: DriverValueDirection.Output})
    }))
  }

}