<template>
    <div class="search">

      <div class="title has-text-centered">Add Your Tasks</div>

      <form @submit.prevent="addTask">
        <div class="field is-grouped mb-5">
          <p class="control is-expanded">
            <input v-model="newTaskContent" class="input" type="text" placeholder="Add tasks">
          </p>
          <p class="control">
            <button 
            :disabled="!newTaskContent"
            class="button is-info">Add</button>
          </p>
        </div>
      </form>

      <div v-for="task in tasks" class="card mb-5" :class="{'has-background-success-light': task.done}">
        <div class="card-content">
          <div class="content">
            <div class="columns is-mobile is-vcentered">
                <div 
                class="column" 
                :class="{'has-text-success line-through': task.done}">
                  {{ task.content }}
                </div>
                <div class="column is-5 has-text-right">
                  <button 
                  @click="toggleDone(task.id)"
                  class="button"
                  :class=" task.done? 'is-success':'is-light'">
                  &check;
                  </button>
                  <button 
                  @click="deleteTask(task.id)"
                  class="button is-danger ml-2">
                  &cross;
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import {
  collection, onSnapshot,
  addDoc, deleteDoc,
  doc, updateDoc,
  query, orderBy,
  limit
} from "firebase/firestore";
import { db } from '@/firebase'

const tasksCollectionRef = collection(db, "tasks")
const tasksCollectionQuery = query(tasksCollectionRef, orderBy("date", "desc"));

const tasks = ref([
  //   {
  //   id: '1',
  //   content: 'Hello this is me',
  //   done: false,
  // },
  //   {
  //   id: '2',
  //   content: 'Hello this is you',
  //   done: true,
  // },
  // {
  //   id: '3',
  //   content: 'Hello this is us',
  //   done: false,
  // },
])

onMounted(() => {
  onSnapshot(tasksCollectionQuery, (querySnapshot) => {
    const fbTasks = [];
    querySnapshot.forEach((doc) => {
      const task = {
            id: doc.id,
            content: doc.data().content,
            done: doc.data().done
          }
          fbTasks.push(task)
    });
    tasks.value = fbTasks
  });
})

const newTaskContent = ref("")

const addTask = () => {
  addDoc(tasksCollectionRef, {
    content: newTaskContent.value,
    done: false,
    date: Date.now()
  });
  newTaskContent.value = ''
}

const deleteTask = (id) => {
  deleteDoc(doc(tasksCollectionRef, id))
}

const toggleDone = id => {
  const index = tasks.value.findIndex(task => task.id === id);
  
  updateDoc(doc(tasksCollectionRef, id), {
    done: !tasks.value[index].done
  });
  }
</script>
  
<style>
  @import '/node_modules/bulma/css/bulma.min.css';

  .search{
    max-width: 400px;
    padding: 20px;
    margin: 0 auto;
  }

  .line-through{
    text-decoration: line-through;
  }
</style>