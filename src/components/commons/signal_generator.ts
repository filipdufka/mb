export function generateSin(phase, periodsToShow = 1, resolution = 100){
    let dataSin = [];    
    for(let i = 0; i < resolution; i++){    
        let t = i/(resolution - 1);
        t *= 2 * Math.PI;
        t *= periodsToShow;
        let angle = t - phase;
        dataSin[i] = Math.sin(angle);
    }
    return dataSin;
}

export function generateNoise(p, phase, horizontalScale, resolution = 100, volume = 1){
    let dataSin = [];    
    for(let i = 0; i < resolution; i++){    
        let t = i/(resolution - 1);
        t *= 2 * Math.PI;
        t *= horizontalScale;
        let angle = t - phase;
        dataSin[i] = (p.noise(angle) - 0.5) * 2 * volume;
    }
    
    return dataSin;    
}