<template>
<div class="navbar-fixed">
  <nav>
    <div class="nav-wrapper teal">
      <div class="container">
        <img src="/static/images/logo.png" alt="Application-Logo">
        <router-link to="/" class="brand-logo"><h3 class="flow-text">Ralfs Listenplaner</h3></router-link>
        <ul class="right">
          <li><router-link to="/">Dashboard</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</div>
</template>
