<template>
<div>
  <ul id="slide-out" class="side-nav fixed">
    <div id="logo" class="center-align">
      <img src="@/assets/logo.png" alt="LOGO">
    </div>
    <li><router-link to="/">Ralfs ToDo-List</router-link></li>
    <li><router-link to="/einkauf">Einkaufsliste</router-link></li>
    </ul>
  <br>
  <a href="#" data-activates="slide-out" class="button-collapse"><i class="material-icons grey-text text-darken-2">menu</i></a>
</div>
</template>