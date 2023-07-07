import { Subject } from 'rxjs';

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

export  abstract class Driver<InputType, OutputType> {
  id: number;
  name: string;

  inputStream$: Subject<InputType>;
  outputStream$: Subject<OutputType>;

}

export  abstract class DriverService<InputType, OutputType> {

  inputStream$ = new Subject<InputType>();
  outputStream$ = new Subject<OutputType>();

  ioLog: {
    input: any[],
    output: any[],
  } = {
    input: [],
    output: [],
  }

  constructor() {
    
    this.inputStream$.subscribe(res => {
      this.ioLog.input.push({t: new Date().getTime(), data: JSON.stringify(res), direction: 0})
    })

    this.outputStream$.subscribe(res => {
      this.ioLog.output.push({t: new Date().getTime(), data: JSON.stringify(res), direction: 1})
    })

  }

  getInputStream() {
    return this.inputStream$;
  }

  getOutputStream() {
    return this.outputStream$;
  }


}