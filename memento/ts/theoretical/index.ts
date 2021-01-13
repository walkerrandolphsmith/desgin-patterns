export class Origniator {
  public state: number;
  constructor(origianlValue: number) {
    this.state = origianlValue;
  }

  public save() : Momento{
    return new Momento(this.state);
  }

  public mutateState(newValue: number): void {
    this.state = newValue;
  }

  public restore(momento: Momento) : void {
    this.state = momento.getState();
  }
}

interface IMomento {
  getState() : any;
}

class Momento implements IMomento {
  state: number;
  timeStamp: Date;
  constructor(state: number) {
    this.state = state;
    this.timeStamp = new Date();
  }

   getState() : number {
     return this.state;
   }
}

export class Caretaker {
  private origniator : Origniator;
  private momentos: Momento[] = [];

  constructor(origniator: Origniator) {
    this.origniator = origniator;
  }

  backup() {
    this.momentos.push(this.origniator.save());
  }

  undo() : void {
    if (this.momentos.length <= 0) return;
    const momento = this.momentos.pop();
    this.origniator.restore(momento);
  }

  getHistory() {
    return this.momentos.map(momento => ({
      state: momento.getState(),
      timeStamp: momento.timeStamp,
    }));
  }
}