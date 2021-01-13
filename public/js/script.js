const msgBox = document.getElementById('msgBox');
const Msgform = document.getElementById('Msgform');
const memberName = document.querySelector('.memberName');
const userList = document.getElementById('userList');
const uname = document.getElementById('uname');

const {username, rooms} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

uname.innerHTML = `Hi, ${username}`;

const socket = io();

socket.emit('joinRoom', {username, rooms});

socket.on('default', (msg) => {
    dynamicDiv(msg);
    msgBox.scrollTop = msgBox.scrollHeight;
});

socket.on('chatMessage', (msg) => {
    dynamicDiv(msg);

    msgBox.scrollTop = msgBox.scrollHeight;
});

socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputRoomUsers(users);
});

Msgform.addEventListener('submit', (e) => {
    e.preventDefault();
    let userMsg = e.target.msg.value;
    socket.emit('message', userMsg);

    e.target.msg.value = '';
    e.target.msg.focus();
});


const dynamicDiv = (msg) => {
    let div = document.createElement('div');
    div.classList.add('border', 'rounded', 'p-2', 'mb-2');
    div.innerHTML = `<h5><span class="badge badge-success">${msg.username} at ${msg.time}</span></h5>
                    <p>${msg.text}</p>`;

    msgBox.append(div);
}

const outputRoomName = (room) => {
    memberName.innerHTML = room;
}

const outputRoomUsers = (users) => {
    userList.innerHTML = `
        ${users.map(user => `<p class="mt-2 text-center memberName">${user.username}</p>`).join('')}
    `;
}


