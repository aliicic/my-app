const {
    ConversationModel
} = require("../models/conversation");
const fs = require("fs");
const path = require("path");

const totalUsers = [];
module.exports = class NamespaceSocketHandler {
    #io;
    constructor(io) {
        this.#io = io
    }
    initConnection() {
        this.#io.on("connection", async socket => {
            // const namespaces = await ConversationModel.find({}, {
            //     title: 1,
            //     endpoint: 1,
            //     rooms: 1
            // }).sort({
            //     _id: -1
            // })
         //   console.log('fuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuucking work atlasted')
            socket.emit("namespacesList", namespaces)
        })
      //  console.log('yes it works fine')
    }
    async createNamespacesConnection() {
        //console.log('hello')
        let namespace = {
          name: "webinars",
          endpoint: "webinars",
        };
            this.#io.of(`webinars`).on("connection", async (socket) => {
            //   console.log('yes its work')
              // const conversation = await ConversationModel.findOne(
              //   { endpoint: namespace.endpoint },
              //   { endpoint: 1, rooms: 1 }
              // ).sort({ _id: -1 });
              // const conversation = { rooms : [{name:'room1',descreiption:'this is'}] , endpoint: 'webinars'}
              socket.emit("roomList", ['room1']);
              socket.on("joinRoom", async (data) => {
                 
                const roomName = data.roomName;
                const userName = data.userName;
        
                totalUsers.push({ name: userName, id: socket.id, roomName: roomName });

                const lastRoom = Array.from(socket.rooms)[1];
                if (lastRoom) {
                  socket.leave(lastRoom);
                  await this.getCountOfOnlineUsers(
                    namespace.endpoint,
                    roomName,
                    userName
                  );
                }
                  socket.join(roomName);
                await this.getCountOfOnlineUsers(namespace.endpoint, roomName);
                // const roomInfo = conversation.rooms.find(
                //   (item) => item.name == roomName
                // );
                const roomInfo = {name: 'room1'}
                 
                socket.emit("roomInfo", roomInfo);
                this.getNewMessage(socket);
                socket.on("disconnect", async () => {
                  totalUsers.map((item, index) => {
                    if (item.id === socket.id) totalUsers.splice(index, 1);
                  });
                  await this.getCountOfOnlineUsers(
                    namespace.endpoint,
                    
                  );
                });
              });
            });
        //}
    }
    async getCountOfOnlineUsers(endpoint="webinars", roomName = "room1", userName) {
      const onlineUsers = await this.#io
        .of(`/${endpoint}`)
        .in(roomName)
        .allSockets();
      const total = totalUsers.filter((item) => item.roomName == roomName);
      this.#io.of(`/${endpoint}`).in(roomName).emit("countOfOnlineUsers", total);
    }
    getNewMessage(socket){
        socket.on("newMessage", async data => {
          //console.log(data);
          const { message, roomName, endpoint , sender } = data
                // console.log(message);
                // console.log(roomName);
                // console.log(endpoint);
         // console.log(sender);
          let today = new Date();
          // let date =today.getFullYear() +"-" +(today.getMonth() + 1) + "-" +today.getDate();
          let time = today.getHours() + ":" + today.getMinutes();
            // await ConversationModel.updateOne(
            //   { endpoint, "rooms.name": roomName },
            //   {
            //     $push: {
            //       "rooms.$.messages": {
            //         name: sender,
            //         message,
            //         dateTime: time,
            //       },
            //     },
            //   }
            // );
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmMessage", data)
        })
    }

}