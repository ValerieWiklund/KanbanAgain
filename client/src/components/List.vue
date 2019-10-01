<template>
  <div class="col-3 pt-3">
    <div class="card shadow">
      <div class="card-header">
        <h2>
          {{listProp.title}}
          <span class="btn btn-sm" @click="deleteList(listProp)">
            <i class="far fa-times-circle fa-2x"></i>
          </span>
        </h2>
      </div>
      <div class="card-body list">
        <CreateTaskModal :list="listProp" />
        <draggable v-model="tasks" class="list-group" group="tasks" @add="onAdd">
          <task
            class="list-group-task task"
            v-for="task in tasks"
            :taskProp="task"
            :key="task._id"
          />
        </draggable>
        <button
          class="btn btn-primary btn-sm mt-3"
          data-toggle="modal"
          :data-target="'#create-task-modal'+listProp._id"
        >Add Task</button>
      </div>
    </div>
  </div>
</template>


<script>
import Task from "../components/Task";
import CreateTaskModal from "../components/CreateTaskModal";
import draggable from "vuedraggable";
export default {
  name: "List",
  props: ["listProp"],
  data() {
    return {
      newListId: ""
    };
  },
  mounted() {
    this.$store.dispatch("getTasks", this.listProp._id);
  },

  computed: {
    tasksOLD() {
      return this.$store.state.tasks[this.listProp._id]; //this is getting the task at the specific list ID
    },
    tasks: {
      get() {
        return this.$store.state.tasks[this.listProp._id];
      },
      set(value) {
        let data = { listId: this.listProp._id, tasks: value };
        this.$store.commit("setTasks", data);
      }
    }
  },
  components: { Task, CreateTaskModal, draggable },
  methods: {
    deleteList(list) {
      this.$store.dispatch("deleteList", list);
    },

    onAdd(evt) {
      debugger;
      let currentListId = this.listProp._id; //targetlist
      let newIndex = evt.newDraggableIndex;

      let task = this.$store.state.tasks[currentListId][newIndex];
      task.listId = currentListId;

      debugger;
      this.$store.dispatch("moveTask", task);
    }

    // moveTask() {
    //   debugger;
    //   let payload = {
    //     currentListId: this.taskProp.listId,
    //     listId: this.newListId,
    //     taskId: this.taskProp._id
    //   };
    //   this.$store.dispatch("moveTask", payload);
    // }
  }
};
</script>

<style scoped>
.card-body {
  background-color: rgba(199, 199, 199, 0.08);
}
</style>
