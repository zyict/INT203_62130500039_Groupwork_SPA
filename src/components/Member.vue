<template>
  <div class="max-w-full">
    <button
      class="bg-red-500 text-white absolute right-3 top-2 px-4 py-2 rounded-md float-right"
      @click="toggleAdmin"
      v-show="!adminMode"
    >
      Toggle Admin Mode
    </button>
    <button
      class="bg-red-500 text-white absolute right-3 top-2 px-4 py-2 rounded-md float-right"
      @click="toggleAdmin"
      v-show="adminMode"
    >
      Toggle User Mode
    </button>
    <p class="font-bold font-sans text-black text-3xl pt-3 -mb-6">
      MEMBER INFO
    </p>
    <ul class="member-container lg:grid-cols-3">
      <li class="member-item" v-for="member in memberLists" :key="member.id">
        <img
          :src="require(`../assets/members/${member.photo}`)"
          class="h-72 w-48 inline-block cursor-pointer hover-click"
          @click="showInfo(member.id)"
        />
        <p class="text-lg font-bold text-black">{{ member.name }}</p>
      </li>
    </ul>
    <div v-show="show" class="bg-black bg-opacity-50 info my-10 h-3/5">
      <button
        class="text-white text-5xl absolute right-6 top-4"
        @click="toggleShow"
      >
        X
      </button>
      <div
        class="flex flex-col justify-center items-center"
        v-for="member in memberInfo"
        :key="member.id"
      >
        <div class="pt-10">
          <img
            :src="require(`../assets/members/${member.photo}`)"
            class="h-96 w-64"
          />
        </div>
        <div class="pt-5">
          <p class="text-white text-xl p-2">
            <span class="font-bold">NAME: </span> {{ member.name }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">POSITION: </span> {{ member.position }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">BIRTH DATE: </span> {{ member.bd }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">BLOOD TYPE: </span> {{ member.bloodtype }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">NATIONALITY: </span>
            {{ member.nationality }}
          </p>
        </div>
      </div>
    </div>
    <div v-show="edit" class="bg-black info flex flex-row bg-opacity-50 my-10 h-3/5">
      <button
        class="text-white text-5xl absolute right-6 top-4"
        @click="toggleEdit"
      >
        X
      </button>
      <div
        class="flex flex-col w-1/2 justify-start items-center"
        v-for="member in memberInfo"
        :key="member.id"
      >
        <div class="pt-10">
          <img
            :src="require(`../assets/members/${member.photo}`)"
            class="h-96 w-64"
          />
        </div>
        <div class="pt-5">
          <p class="text-white text-xl p-2">
            <span class="font-bold">NAME: </span> {{ member.name }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">POSITION: </span> {{ member.position }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">BIRTH DATE: </span> {{ member.bd }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">BLOOD TYPE: </span> {{ member.bloodtype }}
          </p>
          <p class="text-white text-xl p-2">
            <span class="font-bold">NATIONALITY: </span>
            {{ member.nationality }}
          </p>
        </div>
      </div>
      <div class="w-1/2 pt-16 pr-28 flex flex-col">
          <form @submit.prevent="submitEdit(member)">
              <h1 class="font-bold text-2xl text-white">Edit Member Info</h1>
              <div class="py-4">
              <label class="text-white">Name: </label>
              <input v-model="memname" name="memname" type="text" class="input"/>
              </div>
              <div class="py-4">
              <label class="text-white">Position: </label>
              <input v-model="position" name="position" type="text" class="input"/>
              </div>
              <div class="py-4">
              <label class="text-white">Birth Date: </label>
              <input v-model="bd" name="bd" type="text" class="input"/>
              </div>
              <div class="py-4">
              <label class="text-white">Blood Type: </label>
              <input v-model="bloodtype" name="bloodtype" type="text" class="input"/>
              </div>
              <div class="py-4">
              <label class="text-white">Nationality: </label>
              <input v-model="nationality" name="nationality" type="text" class="input"/>
              </div>
              <button class="btn">Submit Change</button>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "http://localhost:5000/memberLists",
      memberLists: [],
      show: false,
      name: null,
      memberInfo: [],
      adminMode: false,
      edit: false,
      editId: null,
      memname: null,
      photo: null,
      position: null,
      bd: null,
      bloodtype: null,
      nationality: null,
      isEdit: false,
    };
  },
  methods: {
    async getMemberLists() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get memberList! ${error}`);
      }
    },
    toggleShow() {
      this.show = !this.show;
    },
    async showInfo(memberId) {
        try{
      this.memberInfo = [];
        const res = await fetch(`${this.url}/${memberId}`);
        const data = await res.json();
        this.memberInfo.push(data);
        if(this.adminMode && !this.isEdit){
            this.toggleEdit()
            this.isEdit = true
            this.editId = data.id
            this.photo= data.photo
            this.memname = data.name
            this.position = data.position
            this.bd = data.bd
            this.bloodtype = data.bloodtype
            this.nationality = data.nationality
        }else if(!this.adminMode){
            this.toggleShow()
        }
        return this.memberInfo;
        }
        catch(error){
            console.log(`Could not show member info! ${error}`)
        }
    },
    toggleAdmin() {
      this.adminMode = !this.adminMode;
    },
    toggleEdit() {
      this.edit = !this.edit;
      this.isEdit = false
    },
    submitEdit(){
        this.editInfo({
            id: this.editId,
            name: this.memname,
            photo: this.photo,
            position: this.position,
            bd: this.bd,
            bloodtype: this.bloodtype,
            nationality: this.nationality
        })
    },
    async editInfo(newMember){
        try{
            const res = await fetch(`${this.url}/${newMember.id}`,{
                method: 'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({
                    name: newMember.name,
                    position: newMember.position,
                    photo: newMember.photo,
                    bd: newMember.bd,
                    bloodtype: newMember.bloodtype,
                    nationality: newMember.nationality
                })
            })
            const data = await res.json()
            this.memberLists = this.memberLists.map(member => member.id === newMember.id ? {...member, name: data.name, photo: data.photo, position: data.position, bd: data.position, bloodtype: data.bloodtype, nationality: data.nationality}: member)
            this.memname = null
            this.position = null
            this.bd = null
            this.bloodtype = null
            this.nationality = null
            this.showInfo(newMember.id)
        }catch(error){
            console.log(`Could not edit member info! ${error}`)
        }
    }
  },
  async created() {
    this.memberLists = await this.getMemberLists();
  },
};
</script>

<style scoped>
.info {
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  max-width: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.hover-click:hover {
  transform: scale(1.03);
}
</style>
