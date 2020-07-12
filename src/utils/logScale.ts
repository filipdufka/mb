
  export interface LogScaleOptions{
    srcMin : number, 
    srcMax : number, 
    destMin : number, 
    destMax : number, 
    inValue : number, 
    outValue : number
  }

  export const defaultFreqScaleOptions : LogScaleOptions = {
    srcMin: 0,
    srcMax: 1,
    destMin: 20,
    destMax: 20000,
    inValue: 0.5,
    outValue: 1000
}

export interface LogScaleSettings{
    scaleFactor? : number,
    scaleFactorInv? : number
    inValue? : number,
    expo? : number, 
    expoInv? : number,
    srcScale? :number,
    srcScaleInv? : number
}

const getLogScaleSettings = (options : LogScaleOptions) : LogScaleSettings => {
    let s : LogScaleSettings = {};
    s.scaleFactor = (options.destMax - options.destMin);
    s.scaleFactorInv = 1.0 / s.scaleFactor;

    s.inValue = (options.inValue - options.srcMin) / (options.srcMax - options.srcMin);

    s.expo = Math.log10((options.outValue - options.destMin) / s.scaleFactor) / Math.log10(options.inValue);
    s.expoInv = 1./ s.expo;

    s.srcScale = (options.srcMax - options.srcMin);
    s.srcScaleInv = 1. / s.srcScale;
    return s;
}

export const getLogScale = (options : LogScaleOptions, input : number) : number => {
    const settings = getLogScaleSettings(options);

    return Math.pow((input - options.srcMin) * settings.srcScaleInv, settings.expo) * settings.scaleFactor + options.destMin;

}

export const getInvLogScale = (options : LogScaleOptions, input : number) : number => {
    const settings = getLogScaleSettings(options);

    return Math.pow((input - options.destMin) * settings.scaleFactorInv, settings.expoInv) * settings.srcScale + options.srcMin;

}