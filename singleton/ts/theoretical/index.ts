export class Singleton {
  private static _instance : Singleton;
  private message: string;

  private constructor() {
    this.message = "private";
    this.log = this.log.bind(this);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  log() : string {
    return this.message;
  }
}