<template>
    <div class="max-w-full">
        <ul class="member-container lg:grid-cols-3" >
            <li class="member-item" v-for="member in memberLists" :key="member.id">
                <img :src="require(`../assets/members/${member.photo}`)" class="h-72 w-48 inline-block">
                <p class="text-lg font-bold text-black"> {{ member.name }} </p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            url: "http://localhost:5000/memberLists",
            memberLists: []
        }
    },
    methods:{
        async getMemberLists(){
            try{
                const res = await fetch(this.url)
                const data = await res.json()
                return data
            }catch(error){
                console.log(`Could not get memberList! ${error}`)
            }
        }
    },
    async created(){
        this.memberLists = await this.getMemberLists()
    }
}
</script>
