<template>
  <div id="new-todo">
    <h3>Neue Aufgabe</h3>
    <div class="row">
      <form @submit.prevent="saveTodo" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="todo_id" required>
            <label>Aufgabe ID#</label>
         </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="todo_title" required>
            <label>Titel</label>
         </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="todo_category" required>
            <label>Kategorie</label>
         </div>
        </div>
        
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit'
export default {
  name: 'new-todo',
  data () {
    return {
      todo_id: null,
      todo_title: null,
      todo_category: null,
      todo_checked: false,
      todo_time: new Date()
    }
  },
  methods: {
    saveTodo(){
      db.collection('todos').add({
        todo_id: this.todo_id,
        todo_title: this.todo_title,
        todo_category: this.todo_category,
        todo_checked: this.todo_checked,
        todo_time: this.todo_time
      })
      .then(docRef => this.$router.push('/'))
      .catch(error => console.log(err))
    }
  }
}
</script>