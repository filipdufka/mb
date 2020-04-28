class Guides{
    constructor(p){
        this.hs = [];
        this.vs = [];
        this.p = p;
    }

    addHorizontal(y){
        this.hs.push(y);
    }
    
    addVertical(x){
        this.vs.push(x);
    }

    show(){
        for(let g = 0; g < this.hs.length; g++){
            this.p.line(0, this.hs[g], this.p.width, this.hs[g]);
        }
        for(let g = 0; g < this.vs.length; g++){
            this.p.line( this.vs[g],0, this.vs[g],this.p.height);
        }
    }
}