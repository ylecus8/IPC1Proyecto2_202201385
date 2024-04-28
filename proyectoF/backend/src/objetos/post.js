class Post {

    static counter = 1;

    constructor(carnet, category, text, image, dateTime, likes, comments,anonimo){
        this.id = Post.counter++;
        this.carnet = carnet;
        this.category = category;
        this.text = text;
        this.image = image;
        this.dateTime = dateTime;
        this.likes = likes;
        this.comments = comments || [];
        this.anonimo=anonimo;
    }

    
}


module.exports = Post; 