<template>
  <div id="dashboard" class="">
    <ul class="collection with-header col s12 m8 l8">
      <li class="collection-header"><h4 class="flow-text">Zu erledigen: <span class="right flow-text"><small>{{selected}}</small></span></h4></li>
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
   <div id="sidebar" class="col s12 m3 offset-m1 l3 offset-l1">
     <br>
    <select distinct class="browser-default" v-model="selected">
      <option value="Alle Kategorien">Alle Kategorien</option>
      <option v-for="category in categories" 
      v-bind:key="category.id">{{category.todo_category}}</option>
    </select>
    </div>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
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
        selected:'Alle Kategorien',
        categoriesRaw: [],
        categories: []
      }
    },

    created(){
      this.fetchAllData()
      this.fetchAllCategories()
    },

    watch: {
      selected: function() {
        this.fetchSelectedData(this.selected)
      }
    },

    methods:{
      fetchAllData(){
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

      fetchAllCategories(){
        db.collection('todos').get().then(querySnapshot =>{
          querySnapshot.forEach(doc =>{
            const data = {
              'todo_category': doc.data().todo_category
            }
            this.categoriesRaw.push(data)
            this.categories = this.uniqueArray(this.categoriesRaw, 'todo_category')
            console.log(this.categories)
          })
        })
      },
      // Delete all double entrys in array
      uniqueArray (arrayOfObj, key) { 
        return arrayOfObj.filter((item, index, array) => 
        { return array.map((mapItem) => mapItem[key]).indexOf(item[key]) === index }) 
      }, 

      fetchSelectedData(sel){
        alert(sel)
        if (sel=='Alle Kategorien') {
          this.todos = []
          this.fetchAllData()
        } else {
          this.todos = []
          db.collection('todos').where('todo_category', '==', sel).get().then(querySnapshot =>{
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
          this.fetchAllData()
        
        })
      } 
    }
  }
</script>