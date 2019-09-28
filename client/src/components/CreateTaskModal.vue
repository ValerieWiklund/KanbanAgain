<template>
  <div :id="'create-task-modal'+list._id" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Task</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addTask()">
            <div class="form-group">
              <label for="description">Description</label>
              <input
                type="text"
                class="form-control"
                id="description"
                placeholder="Enter description"
                v-model="newTask.description"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "create-task-modal",
  data() {
    return {
      newTask: {}
    };
  },
  props: ["list"],
  computed: {},
  methods: {
    addTask() {
      this.newTask.listId = this.list._id;
      this.newTask.boardId = this.list.boardId;
      this.$store.dispatch("addTask", this.newTask);
      this.newTask = {}; //empties the object in the modal
      $(".close").click()
    }
  },
  components: {}
};
</script>




<style scoped>
</style>