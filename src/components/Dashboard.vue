<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Todos</h4></li>
      <li v-for="todo in todos" 
      v-bind:key="todo.id" 
      class="collection-item">
      <div class="chip">{{todo.todo_category}}</div>
      <h5>{{todo.todo_title}}</h5>
      <p>
      <input type="checkbox" class="filled-in" v-bind:id="todo.todo_id" v-bind:checked="todo.todo_checked" @click="updateStatus(todo.id, !todo.todo_checked)"/>
      <label v-if="todo.todo_checked" v-bind:for="todo.todo_id">Erledigt!</label>
      <label v-else v-bind:for="todo.todo_id">Noch offen ...</label>
    </p>
      <p>ID: {{todo.todo_id}} <br>
         Time: {{todo.todo_time}}
      </p>
      </li>
    </ul>
  </div>
</template>

<script>
import db from './firebaseInit'
  export default {
    name: 'dashboard',
    data (){
      return {
        todos:[],
        id: null ,
        todo_checked: null,
       
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
      },

      updateStatus(ID, sta){
        console.log(ID)
        console.log(sta)        
        db.collection('todos').doc(ID).update({
        todo_checked: sta
        })
        .then(()=>{
          alert("Success!!")
          this.todos = []
          this.fetchData()
        })
      } 
    }
  }
</script>