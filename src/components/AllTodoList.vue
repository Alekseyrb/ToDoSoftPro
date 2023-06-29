<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <h3 v-if="title">{{ title }}</h3>

    <div v-for="task in compTask" v-if="compTask.length !== 0">
      {{task.title}}
    </div>
    <div v-else>
      Поки що немає виконаних завдань
    </div>
    <hr/>
    <div v-for="task in incompleteTask" v-if="incompleteTask.length !== 0">
      {{task.title}}
    </div>
    <div v-else>
      Поки що немає не виконаних завдань
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";

export default {
  name: "AppModal",
  emits: ['close'],
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    const compTask = store.getters["tasks/completedTasks"];
    const incompleteTask = store.getters["tasks/incompleteTasks"];

    return {
      compTask,
      incompleteTask,
    }
  }
}
</script>