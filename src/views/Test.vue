<template>
<!--    <div class="chat">-->
<!--        <div class="container">-->
<!--            &lt;!&ndash;            <button @click="SignOut">SignO out</button>&ndash;&gt;-->
<!--            <div class="messaging">-->
<!--                <div class="inbox_msg">-->
<!--                    <div class="inbox_people">-->
<!--                        <div class="headind_srch">-->
<!--                            &lt;!&ndash;                            <div class="recent_heading">&ndash;&gt;-->
<!--                            <h4>Online Users</h4>-->
<!--                            &lt;!&ndash;                            </div>&ndash;&gt;-->
<!--                            &lt;!&ndash;                            <div class="srch_bar">&ndash;&gt;-->
<!--                            &lt;!&ndash;                                <div class="stylish-input-group">&ndash;&gt;-->
<!--                            &lt;!&ndash;                                    <input type="text" class="search-bar"  placeholder="Search" >&ndash;&gt;-->
<!--                            &lt;!&ndash;                                    <span class="input-group-addon">&ndash;&gt;-->
<!--                            &lt;!&ndash;                                        <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>&ndash;&gt;-->
<!--                            &lt;!&ndash;                                    </span>&ndash;&gt;-->
<!--                            &lt;!&ndash;                                </div>&ndash;&gt;-->
<!--                            &lt;!&ndash;                            </div>&ndash;&gt;-->
<!--                        </div>-->

<!--                    </div>-->

<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->

    <div class="container  mt-sm-5 mx-auto ">
        <div class="row">
            <div class="col-md-4 ">
                    <div v-for="user in users" class="chat_people  border   shadow p-3 mb-2 bg-white rounded">
                            <div class="chat_img" style=""> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                            <div class="chat_ib">
                                <h5>{{user}}</h5>
                                <!--                                        <span class="chat_date">Dec 25</span>-->
                            </div>
                    </div>
            </div>
            <div class="col-md-8 border  shadow p-3 mb-5 bg-white rounded">
                <div class="chat">
                    <div class="msg_history">
                        <div v-for="msg in messages" class="">
                            <div v-if="msg.author !== authUser.displayName" class="received_msg">
                                <div id="container" style="white-space:nowrap" class="p-3 mb-2">
                                        <div id="image" style= "  display:inline;">
                                            <img :class="[msg.message && msg.message.length < 100? 'img1':'img2']"  src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
                                        </div>
                                        <div id="texts" v-if="msg.message && msg.message.length < 100" style="margin-left: 15px; white-space:nowrap; white-space: initial; word-wrap: break-word; display: table;" class="border  shadow p-3 mb-2 bg-white rounded">
                                           <span class="time_date" v-if="msg.author">{{msg.author}} </span>
                                            <div style="margin-left: 40px; ">
                                                {{ msg.message }}
                                                <time-ago  tooltip="center" style="padding-left: 10px; margin-right: auto;" :datetime="new Date(msg.createdAt.seconds*1000)"></time-ago>
                                            </div>
                                        </div>
                                        <div id="texts" v-if="msg.message && msg.message.length > 100" style=" margin-left: 15px; white-space:nowrap; white-space: initial; word-wrap: break-word; display: block;" class="border  shadow p-3 mb-2 bg-white rounded">
                                            <div style="margin-left: 40px;">{{ msg.message }}</div>
                                        </div>

                                </div>
                            </div>
                            <div v-if="msg.author === authUser.displayName" class="sent_msg">
                                    <div id="texts" style="white-space:nowrap;  text-align: right;white-space: initial; word-wrap: break-word; display: block; margin-right: 10px; margin-top: 10px;" class="border  shadow p-3 mb-2  rounded">
                                        {{msg.message}}
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="type_msg">
                        <div class="input_msg_write">
                            <input @keyup.enter="sendMessage" v-model="message" type="text" class="write_msg" placeholder="Type a message" />
                            <button class="msg_send_btn" type="button"><i class="fa-paper-plane" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/Message.vue'
    import TimeAgo from 'vue2-timeago';
    import firebase from 'firebase';
    export default {
        name:'chat',
        components: {
            TimeAgo,
        },
        data(){
            return{
                message:null,
                messages :null,
                users:null,
                authUser:{}
            }
        },
        created(){
            firebase.auth().onAuthStateChanged( user=>{
                if(user){
                    this.authUser = user;
                    this.updateOnConnect(this.authUser);
                }else {
                    this.authUser = null
                }
            });
            this.getMessages();
            this.getUsers();
        },
        beforeRouteEnter(to,from,next){
            next( vm=>{
                firebase.auth().onAuthStateChanged(user =>{
                    if(user){
                        next();
                    }else{
                        vm.$router.push('/login');
                    }
                })
            })
        },
        methods:{
            sendMessage(){
                window.db.collection("chat").add({
                    author: this.authUser.displayName,
                    message: this.message,
                    createdAt: new Date()
                }).then(function() {
                    this.autoScroll();
                }).catch(function(error) {
                    console.error("Error writing document: ", error);
                });
                this.message = null;
            },
            getMessages(){
                window.db.collection("chat").orderBy('createdAt').onSnapshot((querySnapshot)=>{
                    let Messages = [];
                    querySnapshot.forEach((doc) => {
                        Messages.push(doc.data());
                    });
                    this.messages = Messages;
                    setTimeout(()=>{
                        this.autoScroll()
                    },500);
                });
            },getUsers(){
                const userRef = window.database.ref('users/');
                userRef.on('value', snapshot => {
                    let Users = [];
                    snapshot.forEach( value => {
                        Users.push(value.key);
                        console.log("key" + value.key);
                    });
                    this.users = Users;
                });
            },SignOut() {
                firebase.auth().signOut().then(()=>{
                }).catch((error)=> console.log(error));
            },autoScroll(){
                const scroll = document.querySelector('.msg_history');
                scroll.scrollTop = scroll.scrollHeight;
            },updateOnConnect(){
                const Online = window.database.ref('.info/connected');
                const userRef = window.database.ref('users/'+this.authUser.uid);
                Online.on('value', snapshot => {
                    if (snapshot.val()) {
                        userRef.onDisconnect().remove();
                        userRef.set(true);
                    }
                });
            }
        }
    }
</script>

<style scoped="">
    .container{max-width:1170px; margin:auto;}
    img{ max-width:100%;}
    .inbox_people {
        background: #f8f8f8 none repeat scroll 0 0;
        float: left;
        overflow: hidden;
        width: 40%; border-right:1px solid #c4c4c4;
    }
    .inbox_msg {
        border: 1px solid #c4c4c4;
        clear: both;
        overflow: hidden;
    }
    .top_spac{ margin: 20px 0 0;}


    .recent_heading {align-items: center; width:40%;}
    .srch_bar {
        display: inline-block;
        text-align: right;
        width: 60%; padding:
    }
    .headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

    .recent_heading h4 {
        color: #05728f;
        font-size: 21px;
        margin: auto;
    }
    .srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
    .srch_bar .input-group-addon button {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        padding: 0;
        color: #707070;
        font-size: 18px;
    }
    .srch_bar .input-group-addon { margin: 0 0 0 -27px;}

    .chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
    .chat_ib h5 span{ font-size:13px; float:right;}
    .chat_ib p{ font-size:14px; color:#989898; margin:auto}
    .chat_img {
        float: left;
        width: 11%;
    }
    .chat_ib {
        float: left;
        padding: 0 0 0 15px;
        width: 88%;
    }

    .chat_people{
        overflow:hidden;
        clear:both;
    }
    .chat_list {
        border-bottom: 1px solid #c4c4c4;
        margin: 0;
        padding: 18px 16px 10px;
    }
    .inbox_chat { height: 550px; overflow-y: scroll;}

    .active_chat{ background:#ebebeb;}

    .incoming_msg_img {
        display: inline-block;
        width: 10%;
        margin-bottom: -36px;
    }
    .received_msg {
        display: inline-block;
        padding: 0 0 0 10px;
        vertical-align: top;
        width: 92%;
    }
    .received_withd_msg p {
        background: #ebebeb none repeat scroll 0 0;
        border-radius: 3px;
        color: #646464;
        font-size: 14px;
        margin: 0;
        padding: 5px 10px 5px 12px;
        width: 100%;
    }
    .time_date {
        margin-top: -15px;
        color: #117a8b;
        display: block;
        font-size: 10px;
        margin-left: 35px;
    }
    .received_withd_msg { width: 57%;}
    .mesgs {
        float: left;
        padding: 30px 15px 0 25px;
        width: 60%;
    }

    .sent_msg p {
        background: #05728f none repeat scroll 0 0;
        border-radius: 3px;
        font-size: 14px;
        margin: 0; color:#fff;
        padding: 5px 10px 5px 12px;
        width:100%;
    }
    .sent_msg {
        float: right;
        width: 60%;
        overflow:hidden;
        margin-right: 0;
        /*margin:26px 0 26px;*!*/
    }
    .input_msg_write input {
        background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
        border: medium none;
        color: #4c4c4c;
        font-size: 15px;
        min-height: 48px;
        width: 100%;
    }

    .type_msg {border-top: 1px solid #c4c4c4;position: relative;}
    .msg_send_btn {
        background: #05728f none repeat scroll 0 0;
        border: medium none;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
        font-size: 17px;
        height: 33px;
        position: absolute;
        right: 0;
        top: 11px;
        width: 33px;
    }
    .messaging { padding: 0 0 50px 0;}
    .msg_history {
        height: 546px;
        overflow-y: auto;

    }
    .img1 {
             display: inline-block;
             width: 10%;
             margin-bottom: -76px;
    }
    .img2{
                       display: inline-block;
                       width: 10%;
                       margin-bottom: -36px;
    }
</style>
