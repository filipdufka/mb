function generateSin(phase, periodsToShow = 1, resolution = 100){
    dataSin = [];    
    for(let i = 0; i < resolution; i++){    
        let t = i/(resolution - 1);
        t *= 2 * PI;
        t *= periodsToShow;
        let angle = t - phase;
        dataSin[i] =  norm(sin(angle),1,-1);
    }
    return dataSin;
}