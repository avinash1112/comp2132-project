class Word {

    constructor(name, category, hint1, hint2) {

        try {
            this.setName(name);
        } catch(e) {
            console.error(`${e}: ${name}`);
        }
        
        try {
            this.setCategory(category);
        } catch(e) {
            console.error(`${e}: ${category}`);
        }

        try {
            this.setHintOne(hint1);
        } catch(e) {
            console.error(`${e}: ${hint1}`);
        }

        try {
            this.setHintTwo(hint2);
        } catch(e) {
            console.error(`${e}: ${hint2}`);
        }

    }


    // setter for name
    setName(name) {
        if(!this.isValidString(name)) {
            throw new Error("invalid name");
        }
        this.name = name;
    }


    // getter for name
    getName() {
        return this.name;
    }


    // setter for category
    setCategory(category) {
        if(!this.isValidString(category)) {
            throw new Error("invalid category");
        }
        this.category = category;
    }


    // getter for category
    getCategory() {
        return this.category;
    }


    // setter for hint1
    setHintOne(hint1) {
        if(!this.isValidString(hint1)) {
            throw new Error("invalid hint one");
        }
        this.hint1 = hint1;
    }


    // getter for hint1
    getHintOne() {
        return this.hint1;
    }


    // setter for hint2
    setHintTwo(hint2) {
        if(!this.isValidString(hint2)) {
            throw new Error("invalid hint 2");
        }
        this.hint2 = hint2;
    }


    // getter for hint2
    getHintTwo() {
        return this.hint2;
    }


    // validate string - not null, must be a string, and must match the REGEX_PATTERN (letters, hyphens and whitespace only)
     isValidString(str) {
        if((str != null && typeof str == 'string' || str instanceof String) && RegExp(WORD_OBJ_REGEX_PATTERN).test(str)) {
            return true;
        }
        return false;
    }


    // uppercase first char of string and lower case the rest of the string
    stringToTitleCase(str) {
        if(typeof str == 'string' || str instanceof String) {
            str = str.toLowerCase();
            str = str.split(' ');
            for (let i = ARRAY_STARTING_POINT; i < str.length; i++){
                str[i] = str[i].charAt(ARRAY_STARTING_POINT).toUpperCase() + str[i].substring(ARRAY_STARTING_POINT + INCREMENT_VALUE).toLowerCase();
            }
            return str.join(' ');
        }
    }


    // return a description of the object's instance.
    describeSelf() {
        return `{"name" : "${this.name}", "category" : "${this.category}", "hint1" : "${this.hint1}", "hint2" : "${this.hint2}"}`;
    }

}
