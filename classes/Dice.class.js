class Dice {

    constructor(color, face1, face2, face3, face4, face5, face6) {
        try {
            this.setColor(color);
        } catch(e) {
            console.error(`${e}: ${color}`);
        }

        this.face1 = face1;
        this.face2 = face2;
        this.face3 = face3;
        this.face4 = face4;
        this.face5 = face5;
        this.face6 = face6;
    }


    // setter for color
    setColor(color){
        if(!((typeof color == 'string' || color instanceof String) && (color == 'blue' || color == 'red'))) {
            throw new Error("invalid color");
        }
        this.color = color;
    }


    // getter for color
    getColor() {
        return this.color;
    }
    

    // getter for face
    getFace(faceNumber){
        switch(faceNumber) {
            case 1:
                return this.face1;
            case 2:
                return this.face2;
            case 3:
                return this.face3;
            case 4:
                return this.face4;
            case 5:
                return this.face5;
            case 6:
                return this.face6;
            default:
                return null;
        }
    }


    // return a description of the object's instance.
    describeSelf() {
        return `{dice color: ${this.color}, face one : ${this.face1}, "face two : ${this.face2}, "face three : ${this.face3}, "face four : ${this.face4}, "face five : ${this.face5}, "face six : ${this.face6}}`;
    }

}
