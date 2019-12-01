function generateSin(phase, periodsToShow = 1, resolution = 100){
    let dataSin = [];    
    for(let i = 0; i < resolution; i++){    
        let t = i/(resolution - 1);
        t *= 2 * PI;
        t *= periodsToShow;
        let angle = t - phase;
        dataSin[i] = sin(angle);
    }
    return dataSin;
}

function generateNoise(phase, horizontalScale, resolution = 100){
    let dataSin = [];    
    for(let i = 0; i < resolution; i++){    
        let t = i/(resolution - 1);
        t *= 2 * PI;
        t *= horizontalScale;
        let angle = t - phase;
        dataSin[i] = (noise(angle) - 0.5) * 2;
    }
    return dataSin;    
}