class Guides{
    constructor(){
        this.hs = [];
        this.vs = [];
    }

    addHorizontal(y){
        this.hs.push(y);
    }
    
    addVertical(x){
        this.vs.push(x);
    }

    show(){
        for(let g = 0; g < this.hs.length; g++){
            line(0, this.hs[g], width, this.hs[g]);
        }
        for(let g = 0; g < this.vs.length; g++){
            line( this.vs[g],0, this.vs[g],height);
        }
    }
}