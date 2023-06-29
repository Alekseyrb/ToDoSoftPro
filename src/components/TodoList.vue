<template>
  <div class="container">
    <h1>ToDoList</h1>

    <TaskInput />

    <div class="textCount">
      Кількість виконаних завдань {{ completedTasksCount }} / {{ tasks.tasks.length }}
      <button @click="close = true" class="btn">Переглянути весь список завдань</button>
    </div>

    <TaskList :tasks="tasks.tasks"/>

    <AllTodoList
        v-if="close"
        title="Виконані та не виконані завдання"
        @close="close = false"
    />
  </div>
</template>

<script>
import {ref, computed} from 'vue';
import TaskInput from './TaskInput.vue';
import TaskList from './TaskList.vue';
import AllTodoList from "./AllTodoList.vue";
import {useStore} from "vuex";

export default {
  components: {
    TaskInput,
    TaskList,
    AllTodoList
  },
  setup() {
    const store = useStore();
    const tasks = store.state.tasks;
    const close = ref(false);

    const completedTasksCount = computed(() => {
      return tasks.tasks.filter((task) => task.completed).length;
    });

    return {
      tasks,
      completedTasksCount,
      close,
    };
  },
};
</script>
