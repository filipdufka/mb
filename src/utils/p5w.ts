import p5 from 'p5';

export class P5w<T> extends p5 {
  updateProps = (props : T) => {}
  resize = (width: number, height: number) => {}
}
