class User {
    constructor(userId, googleId, email, name, pictureURL) {
        this.userId = userId;
        this.googleId = googleId;
        this.email = email;
        this.name = name;
        this.pictureURL = pictureURL;
    }
}

module.exports = User;