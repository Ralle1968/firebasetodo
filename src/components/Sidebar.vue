<template>
<div id="sidebar" class="col s3 offset-s2">
  <label>Browser Select</label>
    <select class="browser-default" v-model="selected">
      <option value="" disabled selected>Kategorie wählen</option>
      <option v-for="todo in todos" 
      v-bind:key="todo.id">{{todo.todo_category}}</option>
    </select>
  <p>Gewählt: {{selected}}</p>
</div>
</template>

<script>
import db from './firebaseInit'
  export default {
    name: 'sidebar',
    data (){
      return {
        todos:[],
        selected:''
       }
    },
    created(){
      this.fetchData()
    },
    methods:{
      fetchData(){
        db.collection('todos').orderBy('todo_time').get().then(querySnapshot =>{
          querySnapshot.forEach(doc =>{
            const data = {
              'id': doc.id,
              'todo_id': doc.data().todo_id,
              'todo_category': doc.data().todo_category,
              'todo_checked': doc.data().todo_checked,
              'todo_title': doc.data().todo_title,
              'todo_time': doc.data().todo_time.toLocaleString('de-DE')
            }
            this.todos.push(data)
          })
        })
      }
    }  
  }
</script>