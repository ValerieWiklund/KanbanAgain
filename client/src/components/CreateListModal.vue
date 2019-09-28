<template>
  <div id="create-list-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add a List</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addList()">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Enter title"
                v-model="newList.title"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "create-list-modal",
  data() {
    return {
      newList: {}
    };
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    }
  },
  methods: {
    addList() {
      this.newList.boardId = this.board._id;
      this.$store.dispatch("addList", this.newList);
      this.newList = {};
      $(".close").click()
    }
  },
  components: {}
};
</script>




<style scoped>
</style>