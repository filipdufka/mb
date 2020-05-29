import p5, { p5InstanceExtensions, AXES } from "p5";

export class P5w {
  private p5: p5;

  constructor(whatevs: any) {
    // construct p5 instance here
    // this.p5 = new p5(....)
  }

  // this will return actual p5 object
  public unwrap() {
    return this.p5;
  }

  public updateProps(props: Partial<p5InstanceExtensions>) {
    Object.entries(props).forEach(([key, value]) => (this.p5[key] = value));
    // maybe do something here after update?
  }
}

const controlledP5 = new P5w("dontcare");

// type checking works
controlledP5.updateProps({ AXES: "axes" });

const actualP5instance = controlledP5.unwrap();
