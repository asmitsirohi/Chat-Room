let users = [];

class Users {
    joinUser = (id, username, room) => {
        let user = {id, username, room};
    
        users.push(user);
    
        return user;
    }

    getUserById = (id) => {
        return users.find(user => user.id == id);
    }

    getRoomUsers = (room) => {
        return users.filter(user => user.room === room);

    }

    userLeave = (id) => {
        const index = users.findIndex(user => user.id == id);

        if(index != -1) {
            return users.splice(index, 1)[0];
        }
    }
}

module.exports = Users;