'use strict';

module.exports = class UserDTO {
    id;

    constructor(model) {
        this.id = model._id.toString();
    }
};
