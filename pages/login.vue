<template>
  <v-card class="mx-auto" max-width="344" elevation="2">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          login-page
          <NuxtLogo :submitForm="loginUser" @ali="runFun" />
          <img class="first-logo" src="" alt="" />
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-form v-model="validfrom" ref="form">
      <v-col cols="12">
        <v-text-field
          label="email"
          outlined
          v-model="form.email"
          dense
          required
          :rules="req"
        ></v-text-field>
        <v-text-field
          outlined
          required
          dense
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          label="password"
          :prepend-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:prepend-inner="showPassword = !showPassword"
          :rules="req"
        ></v-text-field>
      </v-col>
    </v-form>

    <v-card-actions>
      <v-btn
        depressed
        color="primary"
        :loading="loading"
        :disabled="disabledBtn"
        @click="validate"
      >
        login
      </v-btn>
      <v-btn depressed color="primary" @click="logout">logout</v-btn>
    </v-card-actions>
    <v-alert
      v-if="errorText && errorText != 'success'"
      color="red"
      type="error"
    >
      <p v-html="errorText" />
    </v-alert>
    <v-alert v-if="errorText == 'success'" color="green" type="success">
      success
    </v-alert>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    errorText: "",
    form: {
      email: "q@q.com",
      password: "q",
    },
    validfrom: true,
    req: [(v) => !!v || "پر کردن این فیلد الزامی است "],

    loading: false,
  }),
  computed: {
    disabledBtn() {
      return this.loading || !this.validfrom;
    },
  },

  methods: {
    logout() {
      this.$auth.logout("cookie");
    },
    validate: async function () {
      const login = {
        email: this.form.email,
        password: this.form.password,
      };
      // const email = this.form.email;
      // const pass = this.form.password;

      if (this.$refs.form.validate()) {
        this.loading = true;

        // (async function getdata(){

        try {
          //console.log(user);
          // const { data } = await this.$axios.post("/api/users/login",
          //   {
          //     email: email,
          //     password: pass,
          //   },
          // );

          this.$auth
            .loginWith("cookie", { data: login })
            .then((res) => {
              this.$router.push("/");
              alert("we are ok");
            })
            .catch((err) => {
              console.log(err);
              alert("we have some errors");
            });

          this.loading = false;
          this.errorText = "success";
        } catch (error) {
          this.errorText = error.response.data.message;
          this.loading = false;
          alert("error");
        }

        // setTimeout(() => {
        //   this.loading = false;
        //   this.$router.push('/');
        // }, 1000);
      }
    },
    loginUser(userinfo) {
      alert(JSON.stringify(userinfo));
    },
    runFun(userinfo) {
      alert(JSON.stringify(userinfo));
    },
  },

  // setup(props) {

  // const showPassword = ref(false)

  // return{
  //   showPassword
  // }

  // }
};
</script>

<style>
.v-text-field__slot {
  direction: ltr !important;
}
.first-logo {
  width: 50%;
  margin: 0 auto;
}
</style>