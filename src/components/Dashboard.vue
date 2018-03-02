<template>
  <div id="dashboard" class="row">
    <br>
    <div class="col s12">
      <span class="right flow-text">
      <small>
          <select class="browser-default" v-model="selected">
            <option value="Alle Kategorien">Alle Kategorien</option>
            <option v-for="category in categories" 
            v-bind:key="category.id">{{category.todo_category}}</option>
          </select>
        </small>  
      </span>
      <br>
      <br>
      <div class="row">
      <div class="card darken-4" v-for="todo in todos" 
      v-bind:key="todo.id">
        <div class="card-content">
          <div>
            <div class="chip">{{todo.todo_category}}</div>
            <label v-if="todo.todo_checked" v-bind:for="todo.todo_id">
              <i class="small material-icons right">cancel</i>
            </label>
          </div>
          <br>
          <br>
          <span class="card-title">{{todo.todo_title}}</span>
          <p>
            <input type="checkbox" class="filled-in" v-bind:id="todo.id" v-bind:checked="todo.todo_checked" @click="updateStatus(todo.id, !todo.todo_checked)"/>
            <label v-if="todo.todo_checked" v-bind:for="todo.id">Erledigt!</label>
            <label v-else v-bind:for="todo.id">Noch offen ...</label>
          </p>
          <br>
          <hr>
          <span class="card-title activator grey-text text-darken-4"><small>Infos</small> <i class="material-icons right">more_vert</i><br></span>
      
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">{{todo.todo_title}}<i class="material-icons right">close</i></span>
          <p> Kategorie: {{todo.todo_category}}
            <br>
            <br>  
              ID: {{todo.id}} <br>
              Erstellt am: {{todo.todo_time}}
              <br>
              <br>
              Beschreibung: {{todo.todo_info}} 
          </p>
        </div>
        </div>
      </div>
</div>
  

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large teal">
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
        db.collection('todos').orderBy('todo_id').get().then(querySnapshot =>{
          querySnapshot.forEach(doc =>{
            const data = {
              'id': doc.id,
              'todo_id': doc.data().todo_id,
              'todo_category': doc.data().todo_category,
              'todo_checked': doc.data().todo_checked,
              'todo_title': doc.data().todo_title,
              'todo_info': doc.data().todo_info,
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
                'todo_info': doc.data().todo_info,
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