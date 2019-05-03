let position, parent;

let Info = {
    get position(){
        return position
    },
    set position(newV){
        position = newV
    },
    get parent(){
        return parent;
    },
    set parent(newV){
        parent = newV;
    }
}

let entry;
let Config = {
    get entry(){
        return entry;
    },
    set entry(newV){
        entry = newV;
    }
}

export {
    Info,
    Config
}