<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title></ion-card-title>
        <ion-card-subtitle>
        </ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        User ID: {{ post.userId}} <br></br>
        ID: {{ post.id }} <br></br>
        Title:{{ post.title }} <br></br>
        Body:{{ post.body }} <br></br>
      </ion-card-content>
      <ion-button fill="clear" color="success" @click="router.push('/tabs/edit/' + post.id)">Ubah </ion-button>
      <ion-button fill="clear" color="danger" @click="deletePost(post.id)">Hapus</ion-button>
    </ion-card>
  </template>
  
  <script setup lang="ts">
import {IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent} from '@ionic/vue';
  defineProps<{ post: { id: number; userId: number; title: string; body: string } }>();
  import {useRouter} from 'vue-router';
  const router = useRouter();

  // emit event delete ke parent component
  const emit = defineEmits<{
    (e: 'delete', id: number): void
  }>();

function deletePost(id: number) {
  emit('delete', id);
}

  </script>