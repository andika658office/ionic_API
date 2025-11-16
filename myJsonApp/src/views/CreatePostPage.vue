<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tambah Data Post</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tambah Data Post</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
  <ion-item>
    <ion-input label="Post ID" v-model="postid"></ion-input>
  </ion-item>
  <ion-item>
    <ion-input label="Judul" v-model="judul"></ion-input>
  </ion-item>
  <ion-item>
    <ion-input label="Deskripsi" v-model="deskripsi"></ion-input>
  </ion-item>
  <ion-item>
    <ion-input label="User ID" v-model="userId"></ion-input>
  </ion-item>
  <Ion-button @click="submitform">Simpan Data</Ion-button>
</ion-list>
      <!-- <ion-button @click="router.push('/tabs/create')">Tambah data</ion-button> -->
      <!-- <PostCard v-for="post in posts" :key="post.id" :post="post" /> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonInput, IonButton} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PostCard from '../components/PostCard.vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const userId = ref('');
const judul = ref('');
const deskripsi = ref('');
const postid = ref('');

const submitform = () => {
  const postData = {
    userId: userId.value,
    title: judul.value,
    body: deskripsi.value,
    id: postid.value
  };

  axios.post('https://jsonplaceholder.typicode.com/posts', postData)
    .then(response => {
      console.log('Data berhasil disimpan:', response.data);
      // Reset field dari form
      userId.value = '';
      judul.value = '';
      deskripsi.value = '';
      postid.value = '';
    })
    .catch(error => {
      console.error('Terjadi kesalahan saat menyimpan data:', error);
    });
};



</script>