<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ubah Data Post</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Ubah Data Post</ion-title>
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
<ion-button color="danger" @click="deletePost">Hapus Data</ion-button>
</ion-list>
      <!-- <ion-button @click="router.push('/tabs/create')">Tambah data</ion-button> -->
      <!-- <PostCard v-for="post in posts" :key="post.id" :post="post" /> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const userId = ref('');
const judul = ref('');
const deskripsi = ref('');
const postid = ref('');

// get data post saat halaman dibuka
onMounted(() => {
  const id = router.currentRoute.value.params.id;
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => {
      const post = response.data;
      userId.value = post.userId;
      judul.value = post.title;
      deskripsi.value = post.body;
      postid.value = post.id;
    })
    .catch(error => {
      console.error('Terjadi kesalahan saat mengambil data:', error);
    });
});

// put data post saat form disubmit
const submitform = () => {
  const id = router.currentRoute.value.params.id;
  const postData = {
    userId: userId.value,
    title: judul.value,
    body: deskripsi.value,
    id: postid.value
  };

  axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, postData)
    .then(response => {
      console.log('Data berhasil diupdate:', response.data);
      //opsional jika ingin reset form setelah update data
      // Reset form fields jika perlu
      // userId.value = '';
      // judul.value = '';
      // deskripsi.value = '';
      // postid.value = '';
    })
    .catch(error => {
      console.error('Terjadi kesalahan saat mengupdate data:', error);
    });
};
const deletePost = () => {
      const id = router.currentRoute.value.params.id;
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
          console.log('Data berhasil dihapus:', response.data);
          // Arahkan ke tab1 saat di tekan
          router.push('/tabs/tab1'); 
        })
        .catch(error => {
          console.error('Terjadi kesalahan saat menghapus data:', error);
        });
      };

</script>