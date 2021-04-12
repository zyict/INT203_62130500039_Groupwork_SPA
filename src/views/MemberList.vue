<template>
    <body-card>
        <template v-slot:text>
            <member/>
        </template>
        <template v-slot:vdo>
            <source src="../assets/vdo/hwaa.mp4" type="video/mp4"/>
        </template>
    </body-card>
</template>

<script>
import Member from '../components/Member.vue'

export default {
    name: 'MemberList',
    components:{
        Member
    }
}
</script>

