<template>
    <div>
        <h3>Login Page</h3>
        <input v-model="email" type="text" placeholder="Enter your email"><br>
        <input v-model="password" type="password" placeholder="Enter your password"><br>
        <button @click="login">Login</button>
        <button @click="gmailLogin">Login with Google</button>
        <router-link to="/signUp">Sign Up</router-link>
    </div>
</template>

<script>
   import firebase from 'firebase';
   export default {
        name: 'login',
       data(){
            return{
                email:null,
                password:null
            }
       },
        methods: {
            gmailLogin(){
                const provider = new firebase.auth.GoogleAuthProvider();
                // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
                firebase.auth().signInWithPopup(provider).then( (result)=>{
                    let token = result.credential.accessToken;
                    let user = result.user;
                    this.$router.replace('/');
                }).catch((error)=>{
                    alert("error message" + error.message);
                });
            },
            login(){
                firebase.auth().signInWithEmailAndPassword(this.email,this.password).then((result)=>{
                    this.$router.replace('/')
                }).catch((error)=>{
                    alert("error message" + error.message);
                })
            }
        }
    }
</script>
