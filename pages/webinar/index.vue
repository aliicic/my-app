<template>
    <div class="login-frame">
      <div class="form">
        <h5>نام خود را وارد کنید</h5>
        <!-- <input type="text" name="" id="" v-model="loginInfo" />
        <Transition>
          <input
            v-if="loginInfo == 'admin'"
            type="text"
            name=""
            id=""
            v-model="password"
          />
        </Transition>
        <button @click="login">ورود به وبینار</button> -->
        <!-- <ul>
        <li v-for="(item, index) in items" :key="index" class="fa-is">
          <nuxt-link :to="{ name: 'webinar-room', params: { room: item.name } }">
            {{ item.name }}
          </nuxt-link>
        </li>
      </ul> -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // middleware: ["auth"],
    // layout: "blank",
    methods:{
      async getRooms() {
        await this.socket.on("roomList", (data) => {
          console.log(data, "this is data");
          this.items = data;
        });
      },
    },
  mounted() {
     this.socket = this.$nuxtSocket({
     });
     this.getRooms()
  }
  };
  </script>
  <style lang="scss" scoped>

  </style>