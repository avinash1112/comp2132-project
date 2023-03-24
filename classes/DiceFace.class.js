class DiceFace {

    constructor(path, color, faceNumber) {

        try {
            this.setPath(path);
        } catch(e) {
            console.error(`${e}: ${path}`);
        }

        
        try {
            this.setColor(color);
        } catch(e) {
            console.error(`${e}: ${color}`);
        }


        try {
            this.setFaceNumber(faceNumber);
        } catch(e) {
            console.error(`${e}: ${faceNumber}`);
        }

        
        this.setName();
        
    }


    // setter for path
    setPath(path) {
        if(!this.isValidString(path)) {
            throw new Error("invalid path");
        }
        this.path = path;
    }

        
    // getter for path
    getPath() {
        return this.path;
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
            
            
    // setter for name
    setName() {
        this.name = `dice-${this.color}-${this.faceNumber}.svg`;
    }
    

    // getter for name
    getName() {
        return this.name;
    }
    

    // get the full img path and name for face
    getFaceFullImgName() {
        return this.getPath() + this.getName();
    }


    // setter for faceNumber
    setFaceNumber(faceNumber) {
        if(faceNumber == null || isNaN(faceNumber)) {
            throw new Error("invalid face number");
        }
        this.faceNumber = faceNumber;
    }
    

    // getter for faceNumber
    getFaceNumber() {
        return this.faceNumber;
    }


    // validate string - not null, must be a string, and must match the REGEX_PATTERN (letters, hyphens and whitespace only)
    isValidString(str) {
        if((str != null && typeof str == 'string' || str instanceof String) && RegExp(DICE_FACE_OBJ_REGEX_PATTERN).test(str)) {
            return true;
        }
        return false;
    }
    

    // return a description of the object's instance.
    describeSelf() {
        return `{path : ${this.path}, color: ${this.color}, name : ${this.name}, face number : ${this.faceNumber}}`;
    }

}
