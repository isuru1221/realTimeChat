<template>
    <div class="box shadow-lg p-3 mb-5 bg-white rounded">
            <img src="../assets/chatter.png"  width="50%"  class="imgLogo">
            <div>
                <div class="container justify-content-center">
                    <img src="../assets/user.png" alt="sunil" class="imgUser">
                    <input v-model="email" type="text" placeholder="Enter your email" class="login-box"><br>
                    <img src="../assets/lock.png" alt="sunil" class="imgUser">
                    <input v-model="password" type="password" placeholder="Enter your password" class="login-box"><br>
                </div>
                <div class="row">
                    <img src="../assets/login.png" alt="sunil" class="imgLogin">
                    <button class="button  shadow-lg   rounded" @click="login">Login</button>
                </div>
            </div><br>
            <div class="row">
                <img src="../assets/gmail.png" alt="sunil" class="imgGoogle">
                <button class="button shadow-lg  rounded"  @click="gmailLogin">Login with Google</button>
            </div>
        <div class="row">
            <img src="../assets/add.png" alt="sunil" class="imgGoogle">
            <button class="button shadow-lg  rounded"><router-link to="/signUp">Sign Up</router-link></button>
        </div>



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
    .imgLogo{
        display:block; margin-left: auto; margin-right: auto; margin-top: 50px;
    }
    .login-box{
        border:none;
        border-bottom: 1px solid #3759ff;
        background: transparent;
        outline: none;
        height: 40px;
        margin-left: auto;

    }
    .imgUser{
        width: 20%;
    }
    .button {
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background-color: #f8f9fa;
        border: none;
        color: rgba(11, 144, 170, 0.74);
        padding: 5px 20px 5px 30px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 14px 2px;
        cursor: pointer;
    }
    .imgLogin{
        width: 15%;
        z-index: 1;
        margin-right: -30px;
    }
    .imgGoogle{
        width: 12%;
        height: 12%;
        z-index: 1;
        margin-right: -30px;
        margin-top: 10px;
    }
</style>
