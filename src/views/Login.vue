<template>
    <div>
        <h3>Login Page</h3>

    </div>
</template>

<script>
   import firebase from 'firebase';
   export default {
        name: 'login',
        methods: {
            login(){
                const provider = new firebase.auth.GoogleAuthProvider();
                provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
                firebase.auth().signInWithPopup(provider).then( (result)=>{
                    let token = result.credential.accessToken;
                    let user = result.user;
                    this.$router.push('/');
                }).catch((error)=>{
                    console.log("error message" + error.message);
                })
            }
        }
    }
</script>
