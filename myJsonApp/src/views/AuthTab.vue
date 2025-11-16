<template>
  <div>
    <h2>Autentikasi</h2>
    <ion-label>Email</ion-label>
    <ion-input v-model="email" placeholder="Email" />
    <ion-label>password</ion-label>
    <ion-input v-model="password" type="password" placeholder="Password" />
    <ion-button @click="authenticate">Login</ion-button>
    <p>{{ message }}</p>
  </div>
</template>



<script>
import axios from 'axios';
export default {
  data() {
    return { email: '', password: '', message: '' };
  },
  methods: {
  async authenticate() {
    try {
      const res = await axios.post('http://localhost:3000/users', {
        email: this.email,
        password: this.password,
      });
      if (res.data.success) {
        // setelah login sukses → ke tab1
        this.$router.push('/tabs/tab1'); // Ubah ke '/tabs/tab1'
      } else {
        this.message = res.data.message;
      }
    } catch (err) {
      this.message = 'Error saat autentikasi';
    }
  },
},
};
</script>