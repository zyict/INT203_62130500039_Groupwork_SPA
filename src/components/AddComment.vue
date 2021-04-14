 <template>
  <div id="c-section">
    <div class="flex flex-col m-container bg-white bg-opacity-50">
      <!-- show comments -->
      <div class="half pt-24">
        <ul v-for="c in commentLists" :key="c.id" class="flex flex-col justify-center items-center">
          <div class="bg-white bg-opacity-30 border border-opacity-50 border-white rounded-lg shadow p-2 my-1 max-w-lg">
          <li>
            <div class="font-semibold">
            {{ c.name }}
            </div>
            <div>
              {{ c.comment }}
            </div>
          </li>
        </div>
        </ul>
      </div>

      <!-- submit comment -->
      <div class="flex flex-col items-center half pt-8">
        <div class="container">
          <form
            @submit.prevent="submitForm"
            class="w-3/6 py-2 px-24 bg-white bg-opacity-20 rounded-lg"
          >
            <h1 class="text-2xl text-white font-bold bg-green-500 bg-opacity-90">Leave a Comment</h1>
            <ul>
              <li class="flex">
                <label class="label">Name:</label>
                <span v-if="emptyName" class="errormsg">Name required!</span>
              </li>
              <div>
                <input v-model="name" type="text" class="input w-full" />
              </div>
              <div class="flex">
                <label class="label">Email: </label>
                <span v-if="emptyEmail" class="errormsg">Email required!</span>
                <span v-if="invalidEmail" class="errormsg">
                  Invalid Email!
                </span>
              </div>
              <div>
                <input v-model="email" type="email" class="input w-full" />
              </div>

              <div class="flex">
                <label class="label">Comments: </label>
                <span v-if="emptyComment" class="errormsg">
                  You haven't type anything!
                </span>
              </div>
              <div>
                <textarea
                  v-model="comment"
                  rows="4"
                  cols="30"
                  class="input w-full"
                />
              </div>
            </ul>
            <button class="btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      email: null,
      comment: null,
      emptyName: false,
      emptyEmail: false,
      invalidEmail: false,
      emptyComment: false,
      commentLists: [],
      url: "http://localhost:5001/commentLists",
    };
  },
  methods: {
    submitForm() {
      this.emptyName = this.name === null ? true : false;
      this.emptyEmail = this.email === null ? true : false;
      this.emptyComment = this.comment === null ? true : false;
      if (!this.emptyEmail && !this.validateEmail(this.email)) {
        this.invalidEmail = true;
      } else if (!this.emptyEmail && this.validateEmail(this.email)) {
        this.invalidEmail = false;
      }
      console.log(`Name: ${this.name}`);
      console.log(`Email: ${this.email}`);
      console.log(`Comment: ${this.comment}`);
    },
    validateEmail(email) {
      var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return re.test(email);
    },
    async getComments() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get reserved rooms! ${error}`);
      }
    },
  },
  async created(){
    this.commentLists = await this.getComments()
  }
};
</script>

<style scoped>
#c-section {
  background-image: url("../assets/idle_bg.png");
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: 100%;
  max-width: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}

.half {
  flex: 0 0 100%;
  max-height: 50%;
  min-height: 50%;
  min-width: 100%;
  width: auto;
  max-width: none;
}

.m-container {
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: 100%;
  position: absolute;
}

</style>