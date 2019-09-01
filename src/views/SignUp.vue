<template>
    <div>
        <h3>SignUp Page</h3>
        <input v-model="email" type="text" placeholder="Enter your email"><br>
        <input v-model="password" type="password" placeholder="Enter your password"><br>
        <button @click="signUp">Sign Up</button>
    </div>
</template>

<script>
    import firebase from 'firebase';
    export default {
        name: 'signUp',
        data(){
            return{
                email:null,
                password:null
            }
        },
        methods: {
            signUp(){
                firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(()=>{
                    this.$router.replace('/login')
                }).catch((error)=>{
                    alert("error message" + error.message);
                })
            }
        }
    }
</script>
