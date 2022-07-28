import { io } from "./http";

interface RoomUser {
    socket_id: string;
    username: string;
    room: string;
}

interface Message {
    room: string;
    text: string;
    createdAt: Date;
    username: string;
}

interface userSingle {
    userId: string;
    socketId: string;
}

const usersRoom: RoomUser[] = [];
const messages: Message[] = [];

let usersSingle: userSingle[] = [];

io.on("connection", socket => {
    // Select room and connect user to group, groups user
    socket.on("select_room", (data, callback) => {
        socket.join(data.room);

        const userInRoom = usersRoom.find(
            user => user.username === data.userName && user.room === data.room
        );

        if (userInRoom) {
            userInRoom.socket_id = socket.id;
        } else {
            usersRoom.push({
                room: data.room,
                username: data.userName,
                socket_id: socket.id
            });
        }

        const messagesRoom = getMessagesRoom(data.room);
        callback(messagesRoom);
        // console.log(users);
    });

    // Send message to groups
    socket.on("message", data => {
        // Salvar a mensagem, [Todo: substituir por um banco de dados]
        const message: Message = {
            room: data.room,
            username: data.userName,
            text: data.message,
            createdAt: new Date()
        }

        messages.push(message);

        // Enviar para os usuário da sala
        io.to(data.room).emit("message", message);
    });

    // user connect one to one
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        io.emit("getUsers", usersSingle);
    });

    // send message one to one
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text
        });
    });

    // User disconnect
    socket.on("disconnect", () => {
        console.log("Usuário desconectado!");
        removeUser(socket.id);
        io.emit("getUsers", usersSingle);
    });
});

const getMessagesRoom = (room: string) => {
    return messages.filter(item => item.room === room);
}

const addUser = (userId: string, socketId: string) => {
    !usersSingle.some(user => user.userId === userId) &&
        usersSingle.push({ userId, socketId });
}

const removeUser = (socketId: string) => {
    usersSingle = usersSingle.filter(user => user.socketId !== socketId);
}

const getUser = (userId: string) => {
    return usersSingle.find(user => user.userId === userId);
}