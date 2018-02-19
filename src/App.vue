<template>
  <div id="app">
    <Navbar />
    <Sidebar />
    <div class="container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    Footer
  }
}
</script>
