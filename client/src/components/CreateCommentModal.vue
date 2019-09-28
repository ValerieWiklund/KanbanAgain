<template>
  <div :id="'create-comment-modal'+task._id" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add comment</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addComment()">
            <div class="form-group">
              <label for="description">Description</label>
              <input
                type="text"
                class="form-control"
                id="description"
                placeholder="Enter description"
                v-model="newComment.description"
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
  name: "create-comment-modal",
  data() {
    return {
      newComment: {}
    };
  },
  props: ["task"],
  computed: {},
  methods: {
    addComment() {
      this.newComment.taskId = this.task._id;
      this.newComment.listId = this.task.listId;
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = {}; //empties the object in the modal
      $(".close").click()
    }
  },
  components: {}
};
</script>




<style scoped>
</style>