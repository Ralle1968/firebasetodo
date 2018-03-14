<template>
<div class="navbar-fixed">
  <nav>
    <div class="nav-wrapper teal">
      <div class="container">
        <img src="/static/images/logo.png" alt="Application-Logo">
        <h4 v-if="!isLoggedIn" class="flow-text brand-logo">Ralfs Listenplaner</h4>
        <ul class="right">
          <li v-if="isLoggedIn">User: {{ currentUser }}</li>
          <!-- <li v-if="isLoggedIn"><router-link to="/">Home</router-link></li> -->
          <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Register</router-link></li>
          <li v-if="isLoggedIn"><i v-on:click="logout" class="material-icons prefix">email</i></li>
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
    created() {
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
      }
    },
    methods: {
      logout: function() {
        firebase
          .auth()
          .signOut()
          .then(() =>{
            this.$router.go({path: this.$router.path});
          });
      }
    }
  }
</script>
