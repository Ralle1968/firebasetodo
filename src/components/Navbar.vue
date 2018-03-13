<template>
<div class="navbar-fixed">
  <nav>
    <div class="nav-wrapper teal">
      <div class="container">
        <img src="/static/images/logo.png" alt="Application-Logo">
        <router-link to="/" class="brand-logo"><h3 class="flow-text">Ralfs Listenplaner</h3></router-link>
        <ul class="right">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
          <li><button v-on:click="logout" class="btn black">Logout</button></li>
        </ul>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
  import firebase from 'firebase'
  export default {
    name: 'navbar',
    data() {
      return {
        isLoggedIn: false,
        currentUser: false
      }
    },
    methods: {
      logout: function() {
        firebase
          .auth()
          .signOut()
          .then(() =>{
            this.$router.push('/login');
          });
      }
    }
  }
</script>
