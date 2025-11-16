<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input v-model="email" placeholder="Email"></ion-input>
      <ion-input v-model="password" type="password" placeholder="Password"></ion-input>
      <ion-button expand="block" @click="login">Login</ion-button>

      <p>{{ message }}</p>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/vue'
import axios from "axios"

export default {
  name: "Tab2Page",
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton },
  data() {
    return {
      email: "",
      password: "",
      message: ""
    }
  },
  methods: {
    login() {
      axios.post("http://localhost:3000/login", {
        email: this.email,
        password: this.password
      })
      .then(res => {
        this.message = res.data.message
      })
      .catch(err => console.error(err))
    }
  }
}

</script>