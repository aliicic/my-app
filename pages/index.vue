<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <p v-if="$auth.loggedIn">{{ $auth.user.name }}</p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  data: () => ({
    message: "",
  }),

  mounted() {
      // this.socket = this.$nuxtSocket({
      //   name: 'home', // Use socket "home"
      // channel: '/webinars', // connect to '/index'
      // });
  }

};
</script>