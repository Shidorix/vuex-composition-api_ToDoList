<template>

<div class="todo-wrapper">

    <div class="title has-text-centered">
      Мой ToDo лист
    </div>


<form
@submit.prevent="addToDo">

<div class="field has-addons is-grouped mb-5">

  <div class="control is-expanded">
    <input v-model="newtodoContent" class="input" type="text" placeholder="Добавить ToDo">
  </div>

  <div class="control">
    <button :disabled="!newtodoContent" class="button is-info">
      Добавить
    </button>
  </div>

</div>
</form>


<div v-for="todo in todos" :key="todo.id" class="card mb-5" :class="{ 'has-background-success' : todo.done }">

  <div class="card-content">

    <div class="content">

      <div class="columns is-mobile is-vcentered">

        <div class="column"
        :class="{'has-text-primary-light line-through' : todo.done}" >
          {{ todo.content }}
        </div>

        <div class="column is-5 has-text-right">
          <button class="button"
          @click="toggleDone(todo.id)"
          :class="todo.done ? 'is-primary' : 'is-light'"
          > &check; </button>
          <button @click="deleteToDo(todo.id)"
           class="button is-danger ml-2"> &cross; </button>
        </div>

      </div>
      
      
    </div>
    
    </div>
    
  </div>

</div>
  
</template>


<script setup>

import { reactive, ref, onMounted } from "vue";
import { db } from '@/firebase'
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

// firebase refs

const todosCollectionRef = collection(db, "todos");


// todos

const todos = ref([
  
]);


// получаем todo
onMounted(() => {
  onSnapshot(todosCollectionRef, (querySnapshot) => {
  const fbTodos = [];
  querySnapshot.forEach((doc) => {
    const todo = {
      id: doc.id,
      content: doc.data().content,
      done: doc.data().done,
  };
    fbTodos.push(todo);
  });
  todos.value = fbTodos;
});
});


// add todo

const newtodoContent = ref('');

const addToDo = () => {
  addDoc(todosCollectionRef, {
  content: newtodoContent.value,
  done: false,
});
  newtodoContent.value = '';
}

const deleteToDo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
}

const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done
});
}


</script>



<style>
@import 'bulma\css\bulma.min.css';

* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #e0b6eb;
  height: 100vh;
}

.todo-wrapper {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
  
.control button {
  background: linear-gradient(90deg, #ff85e4 0%, #229efd 179.25%);
  border: none;
  transition: all 0.3s ease;
}
.control button:hover {
  box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
             0.1em 0.1em 1em rgba(0,0,0,0.3);
}

.line-through {
  text-decoration: line-through;
}

</style>