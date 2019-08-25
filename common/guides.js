class Guides{
    constructor(){
        this.horizontals = [];
        this.verticals = [];
    }

    addHorizontal(y){
        this.horizontals.push(y);
    }
    
    addVertical(x){
        this.verticals.push(x);
    }

    show(){
        for(let g = 0; g < this.horizontals.length; g++){
            line(0, this.horizontals[g], width, this.horizontals[g]);
        }
        for(let guide in this.verticals){
            line(guide, 0, guide, height);
        }
    }
}