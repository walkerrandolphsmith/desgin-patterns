interface IStoreToDos {
  [name: string]: string;
}

export class ToDoList {
  private toDosById : IStoreToDos = {};

  public save() : Momento {
    return new Momento({ ...this.toDosById });
  }
  
  public restore(momento: Momento) : void {
    this.toDosById = momento.getState();
  }

  public getCurrent() {
    return { ...this.toDosById };
  }

  public update(id: string, newValue: string) : void {
    if(this.toDosById.hasOwnProperty(id)) {
      this.toDosById[id] = newValue;
    }
  }

  public add(newValue: string) : string {
    const newId = Math.floor(Math.random() * 100).toString();
    this.toDosById[newId] = newValue;
    return newId;
  }

  public delete(id: string) : void {
    delete this.toDosById[id];
  }
}

class Momento {
  private snapshot: IStoreToDos;
  constructor(snapshot: IStoreToDos) {
    this.snapshot = snapshot;
  }
  getState() : IStoreToDos {
    return this.snapshot;
  }
}

export class ToDoListHistory {
  originiator: ToDoList;
  history: Momento[] = [];
  constructor(originator: ToDoList) {
    this.originiator = originator;
  }
  public backup(): void {
    this.history.push(this.originiator.save());
  }

  public undo(): void {
    if (this.history.length <= 0) return;
    const momento = this.history.pop();
    this.originiator.restore(momento);
  }

  public getMomentos() : IStoreToDos[] {
    return this.history.map(momento => momento.getState());
  }
}