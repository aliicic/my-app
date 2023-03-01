<template>
  <v-card class="mx-auto" max-width="344" elevation="2">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          login-page
          <img class="first-logo" src="" alt="" />
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-form v-model="validfrom" ref="form">
      <v-col cols="12">
        <v-text-field
          label="username"
          outlined
          v-model="form.username"
          dense
          required
          :rules="req"
        ></v-text-field>
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
      >
        login
      </v-btn>
      <v-btn depressed color="primary" @click="validate">register</v-btn>
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
      username: "",
      password: "",
      email: "",
    },
    validfrom: true,
    req: [(v) => !!v || "you must fill this field"],

    loading: false,
  }),
  computed: {
    disabledBtn() {
      return this.loading || !this.validfrom;
    },
  },

  methods: {
    validate: async function () {
      const userInfo = {
        name: this.form.username,
        email: this.form.email,
        password: this.form.password,
      };

      if (this.$refs.form.validate()) {
        this.loading = true;

        try {
          await this.$axios.post("/api/users/register", userInfo);
          this.$auth
            .loginWith("cookie", { data: userInfo })
            .then((res) => {
              this.$router.push("/");
              // alert("we are ok");
            })
            .catch((err) => {
              console.log(err);
              // alert("we have some errors");
            });
          this.loading = false;
          this.errorText = "success";
        } catch (error) {
          this.errorText = error.response.data.message;
          this.loading = false;
        }
      }
    },
  },
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