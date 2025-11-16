<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tambah User</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input v-model="name" placeholder="Nama"></ion-input>
      <ion-input v-model="email" placeholder="Email"></ion-input>
      <ion-input v-model="password" type="password" placeholder="Password"></ion-input>
      <ion-button expand="block" @click="addUser">Tambah</ion-button>

      <p>{{ message }}</p>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/vue'
import axios from "axios"

export default {
  name: "Tab3Page",
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      message: ""
    }
  },
  methods: {
    addUser() {
      axios.post("http://localhost:3000/users", {
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then(res => {
        this.message = res.data.message
        this.name = ""
        this.email = ""
        this.password = ""
      })
      .catch(err => {
        console.error(err)
        this.message = "Gagal menambahkan user"
      })
    }
  }
}
</script>