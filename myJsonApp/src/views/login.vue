<template>
  <form @submit.prevent="login">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const res = await axios.get(`http://localhost:3000/users?username=${this.username}&password=${this.password}`)
      if (res.data.length > 0) {
        alert("Login berhasil!")
        localStorage.setItem('user', JSON.stringify(res.data[0]))
        this.$router.push('/tab3page.vue') // arahkan ke halaman lain
      } else {
        alert("Username atau password salah")
      }
    }
  }
}
</script>