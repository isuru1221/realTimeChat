<template>
    <div class="box shadow-lg p-3 mb-5 bg-white rounded">

            <img src="../assets/chatter.png"  width="50%"  class="img1">
            <div>
                <input v-model="email" type="text" placeholder="Enter your email" class="login-box"><br>
                <input v-model="password" type="password" placeholder="Enter your password" class="login-box"><br>
                <button @click="login">Login</button>
            </div>
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


<style>
    .box{
        width: 500px;
        height: 600px;
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%,-50%);
        border-radius: 20px;
    }
    .img1{
        display:block; margin-left: auto; margin-right: auto; margin-top: 50px;
    }
    .login-box{
        border:none;
        border-bottom: 1px solid #3759ff;
        background: transparent;
        outline: none;
        height: 40px;
    }
</style>
