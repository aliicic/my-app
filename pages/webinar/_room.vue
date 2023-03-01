<template>
    <div>
      <div class="container-fluid" style="direction: rtl">
        <div class="row webinar-live">
          <div class="col-lg-7 webinar-live__main">
            <div class="webinar-live__header" :class="{ hidden: chatStatus }">
              <div class="webinar-live__back">
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 25.451 25.451"
                  xml:space="preserve"
                  fill="#000"
                  class="arrow"
                  style="width: 10px"
                >
                  <g>
                    <g id="c185_triangle">
                      <path
                        d="M20.982,0.521v2.006L8.57,12.315c-0.121,0.101-0.195,0.251-0.195,0.41s0.074,0.311,0.195,0.41l12.412,9.79v2.005
              c0,0.199-0.115,0.383-0.297,0.469c-0.178,0.086-0.395,0.064-0.549-0.061L4.664,13.136c-0.122-0.1-0.194-0.251-0.194-0.41
              s0.072-0.31,0.194-0.41L20.136,0.113c0.154-0.126,0.371-0.148,0.549-0.061C20.866,0.139,20.982,0.322,20.982,0.521z"
                      ></path>
                    </g>
                    <g id="Capa_1_58_"></g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
              </div>
              <h4 class="webinar-live__title">{{ userName }}</h4>
              <span class="webinar-live__badge ml-2 webinar-live__badge_purple">
                {{ $nuxt._route.params.room }}
              </span>
              <span
                class="webinar-live__badge ml-2 webinar-live__badge_green"
                style="cursor: pointer"
                @click="connect()"
              >
                شروع وبینار
              </span>
            </div>
  
            <div class="webinar-live__info" :class="{ hidden: chatStatus }">
              <div class="webinar-live__invited">
                <svg
                  style="height: 20px; width: 20px; color: rgb(162, 169, 177)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                    fill="#a2a9b1"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                    fill="#a2a9b1"
                  ></path>
                  <path
                    d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                    fill="#a2a9b1"
                  ></path>
                </svg>
                <span>تعداد افراد دعوت شده :</span>
                <span class="webinar-live__badge webinar-live__badge_green f-is"
                  >6</span
                >
              </div>
              <div class="webinar-live__absent">
                <svg
                  style="height: 20px; width: 20px; color: rgb(162, 169, 177)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-x-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                    fill="#a2a9b1"
                  ></path>
                </svg>
                <span>افراد آنلاین : </span>
                <span class="webinar-live__badge webinar-live__badge_red f-is">{{
                  onlineCount
                }}</span>
              </div>
              <div class="webinar-live__add-user">
                <span class="badge">
                  <svg
                    style="height: 20px; width: 20px; color: rgb(255, 255, 255)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                      fill="#ffffff"
                    ></path>
                  </svg>
                </span>
                <span>اضافه کردن کاربران به وبینار</span>
              </div>
            </div>
  
            <!-- <div
              id="video-container"
              @mousemove="overLayController(3000)"
              class="webinar-live-player"
            > -->
            <div id="video-container" class="webinar-live-player">
              <div id="remote_videos">
                <div class="videos-inner">
                  <div
                    v-for="(item, index) in videos"
                    :key="index"
                    :id="`user_${item.id}`"
                    class="videoWrap"
                  >
                  <div class="close-remote-video" @click="closeRemotevideo" v-if="userName =='admin' && item.id != 'admin'">
                  <i class="fa fa-times" aria-hidden="true"></i>
                  </div>
                    <div class="display_name">{{ item.id }}</div>
                    <video
                      :srcObject.prop="item.src"
                      autoplay
                      :muted="item.id == userName"
                      :id="`remote_${item.id}`"
                      class="video"
                    ></video>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 live-chat" style="flex: auto; overflow-y: auto">
            <LiveChat
              @submit="send"
              :confirmedMessage="confirmedMessage"
              :oldMessages="messages"
              :onlineUsers="onlineUsers"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  let peer = null;

  export default {
    // middleware: ["auth"],
    // layout: "blank",
    // components : {
    //   name: 'liveChat'
    // }
    data: () => ({
      localStream: null,
      fullScreenFlag: false,
      idleTimer: null,
      idleState: false,
      isMute: false,
      chatStatus: false,
      onlineCount: 0,
      onlineUsers: [],
      socket: null,
      endpoint: "webinars",
      roomName: "room1",
      confirmedMessage: null,
      userName: "",
      messages: [],
      cameraOff: false,
      VolumeCounter: 3,
      //
      configuration: {
        iceServers: [
          { urls: "stun:stun.stunprotocol.org:3478" },
          { urls: "stun:stun.l.google.com:19302" },
          {
            urls: ["turn:13.250.13.83:3478?transport=udp"],
            username: "YzYNCouZM1mhqhmseWk6",
            credential: "YzYNCouZM1mhqhmseWk6",
          },
        ],
      },
      localUUID: null,
      localStream: null,
      connection: null,
      consumers: new Map(),
      clients: new Map(),
      remoteContainer: null,
      videos: [],
      secondPlayerIs : false,
      choosedUserIdToCall : "",
      peerObject : '',
    }),
    watch:{
     videos(){
      if(this.videos.length>1){
        this.secondPlayerIs = true
      }
     }
    },
    methods: {

      async send(message) {
        await this.socket.emit("newMessage", {
          sender: this.userName,
          message,
          roomName: this.roomName,
          endpoint: this.endpoint,
        });
        // await this.socket.on('confirmMessage',  data => {
        //  this.confirmedMessage=data
        //   console.log(this.confirmedMessage, 'confirmed message')
        // })
      },
 
      async roomInfo() {
        await this.socket.on("roomInfo", (roomInfo) => {
          this.roomName = roomInfo.name;
        });
        await this.socket.on("countOfOnlineUsers", (count) => {
           console.log(count);
          this.onlineCount = count.length;
          this.onlineUsers = count;

        });
        //? when it was at submit function / client couldn't recive first message befor sending message
        await this.socket.on("confirmMessage", (data) => {
          this.confirmedMessage = data;
          console.log(this.confirmedMessage, "confirmed message");
        });
      },

      async init() {
        console.log("window loaded");
        this.socket.on("connect", (e) => {
          console.log("socket connected");
          console.log(socket.id, "socket");
          connectBtn.disabled = false;
        });
      },
    },
    beforeMount() {
      this.socket = this.$nuxtSocket({});
      this.socket.on("connect", () => {
        this.socket.emit("joinRoom", {
          roomName: 'room1',
          userName: this.userName,
        });
      });
    },
    mounted() {
  this.userName =  this.$auth.user.name
      this.roomInfo();

      this.socket.on("message", (e) => {
        console.log("socket message");
        this.handleMessage(e);
      });
      this.socket.on("disconnect", (e) => {
        console.log("socket desconnected");
        this.handleClose;
      });}

  };
  </script>
  
  <style scoped>

  </style>