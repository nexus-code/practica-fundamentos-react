export default class Ad {
    _id;
    name;
    description;
    price;
    type;
    photo;
    createdAt;
    updatedAt;
    tags;

    constructor(value) {
        this._id = value._id;
        this.name = value.name;
        this.description = value.description;
        this.price = value.price;
        this.type = value.type;
        this.photo = `http://localhost:3001/images/anuncios/${value.photo}`;
        this.createdAt = value.createdAt;
        this.updatedAt = value.updatedAt;
        this.tags = value.tags;
        this.title = value.title;
    }

    // isImportant() {
    //     return this.vote_count > 25;
    // }
}