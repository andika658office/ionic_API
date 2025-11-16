<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Users</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item v-for="user in users" :key="user.id">
          <ion-label>
            <h2>{{ user.name }}</h2>
            <p>{{ user.email }}</p>
          </ion-label>

          <!-- Tombol Edit -->
          <ion-button slot="end" color="primary" @click="openEditModal(user)">
            Edit
          </ion-button>

          <!-- Tombol Hapus -->
          <ion-button slot="end" color="danger" @click="deleteUser(user.id)">
            Hapus
          </ion-button>
        </ion-item>
      </ion-list>

      <!-- Modal Edit -->
      <ion-modal v-model:is-open="isEditOpen">
        <ion-header>
          <ion-toolbar>
            <ion-title>Edit User</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="isEditOpen = false">Close</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>
            <ion-item>
              <ion-label position="stacked">Name</ion-label>
              <ion-input v-model="selectedUser.name"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Email</ion-label>
              <ion-input v-model="selectedUser.email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="stacked">Password</ion-label>
              <ion-input type="password" v-model="selectedUser.password"></ion-input>
            </ion-item>
          </ion-list>
          <ion-button expand="block" @click="saveEdit">Simpan</ion-button>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonModal, IonInput, IonButtons
} from '@ionic/vue'
import axios from "axios"

export default {
  name: "Tab1Page",
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonButton, IonModal, IonInput, IonButtons
  },
  data() {
    return {
      users: [],
      isEditOpen: false,
      selectedUser: { id: null, name: "", email: "", password: "" }
    }
  },
  mounted() {
    this.loadUsers()
  },
  methods: {
    async loadUsers() {
      try {
        const res = await axios.get("http://localhost:3000/users")
        this.users = res.data
      } catch (err) {
        console.error("Gagal load users:", err)
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`)
        console.log("User dihapus")
        this.loadUsers()
      } catch (err) {
        console.error("Gagal hapus user:", err)
      }
    },
    openEditModal(user) {
      this.selectedUser = { ...user } // clone biar reactive
      this.isEditOpen = true
    },
    async saveEdit() {
      try {
        const { id, name, email, password } = this.selectedUser
        await axios.put(`http://localhost:3000/users/${id}`, { name, email, password })
        console.log("User diupdate")
        this.isEditOpen = false
        this.loadUsers()
      } catch (err) {
        console.error("Gagal update user:", err)
      }
    }
  }
}
</script>