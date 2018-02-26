<template>
  <div id="app">
    <Navbar />
    <div id="main" class="container">
      <div class="row">
      <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
