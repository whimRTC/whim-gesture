<template>
  <div class="container" style="background-color:transparent;">
    <v-btn v-if="loading">
      Now Loading
    </v-btn>
    <div
      class="player"
      :width="videoWidth" 
      :height="videoHeight" 
      v-else-if="isMe && userId === room.appState.questioner && room.appState.time!==0"
    >
      <div>
        <v-card>
          <v-card-title>
            {{theme}}
          </v-card-title>
          <v-card-subtitle>
            正解数: {{room.appState.nAnswer}}
            あと{{room.appState.time}}秒！
          </v-card-subtitle>
          <v-btn color="danger" @click="newTheme">パス</v-btn>
          <v-btn color="success" @click="correct">OK</v-btn>
        </v-card>
      </div>
    </div>
    <v-btn v-else-if="$route.query.isMe === 'True' && !room.appState.questioner" @click="start">出題者になる</v-btn>
    <v-card v-else-if="isMe && room.appState.time===0" @click="initialize">
      <v-card-text>結果: {{room.appState.nAnswer}}ポイント</v-card-text>
      <v-btn @click="initialize">もう一度やる！</v-btn>
    </v-card>
    <div v-else-if="userId === room.appState.questioner && room.appState.time!==0">
      <v-btn class="mb-12">ジェスチャー中</v-btn>
      <span/>
    </div>
  </div>
</template>


<script>

import firebase from "~/plugins/firebase.js"
// import func from '../../vue-temp/vue-editor-bridge';
const db = firebase.firestore();

export default {
  name: 'rooms-id',
  data: function () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      appUserState: [],
      users: [],
      theme: '',
      loading: true,
      room: {
        appState: {}
      },
      appState: {},
      indices: [],
      vocabulary: ['ウサギ', 'キツネ', '野球', 'サッカー', 'バスケットボール', '料理', '先生', 'ふりかけ', '恐竜', 'テニス', 'ラグビー', '柔道', '剣道', '空手', '水泳', 'スケート', '棒高跳び', '砲丸投げ', '編み物', '茶道', '乳搾り', 'パソコン', 'テレビゲーム', '掃除', '漫才', '宇宙飛行士', '運転', '飛行機', 'オートバイ']
    }
  },
  computed: {
    videoWidth: function(){
      return Math.floor(this.width/2)
    },
    videoHeight: function(){
      return Math.floor(this.height/2)
    },
    userId() {
      return this.$route.query.userId
    },
    displayUserId() {
      return this.$route.query.displayUserId
    },
    isMe() {
      return this.userId === this.displayUserId
    },
  },
  methods: {
    newTheme() {
      if(this.indices.length === 0) {
        this.indices = Array.from({length: this.vocabulary.length}, (v, k) => k)
      }
      const arrayIdx = Math.floor(Math.random() * this.indices.length)
      this.theme = this.vocabulary[this.indices[arrayIdx]]
      this.indices.splice(arrayIdx, 1) // 既出単語を削除
    },
    initialize() {
      const appState = this.room.appState || {}
      appState['questioner'] = this.userId
      appState['nAnswer'] = 0
      appState['time'] = 60
      window.parent.postMessage({appState}, process.env.whimUrl)
    },
    start() {
      const appState = this.room.appState || {}
      appState['questioner'] = this.userId
      appState['nAnswer'] = 0
      appState['time'] = 60
      window.parent.postMessage({appState}, process.env.whimUrl)
      this.newTheme()
      // return /***** この上の設定がthis.appStateに反映されない */
      const timeKeeper = () => {
        // const state = await this.fireRoom.get()
        // const time = state.data().appState.time
        console.log(time)
        if(time === 0) {
          this.finish()
          return
        }
        let appState = this.room.appState
        appState['time']--
        window.parent.postMessage({appState}, process.env.whimUrl)
        setTimeout(timeKeeper, 1000)
      }
      setTimeout(timeKeeper, 1000)
    },
    correct() {
      const appState = this.room.appState
      if(!appState) return
      appState['nAnswer']++
      window.parent.postMessage({appState}, process.env.whimUrl)
      this.newTheme()
    },
    finish() {}
  },
  async mountedd() {
    console.log('roomId:' + this.roomId)

    const data = await firebase.auth().signInAnonymously()

    this.uid = data.user.uid

    await this.fireRoom.collection('appClients').doc(this.uid).set({});
    await this.fireRoom.update({appState: {
      questioner: null,
      nAnswer: 0,
      time: 60
    }})
    this.$bind('room', this.fireRoom)
    this.$bind('appUserState', this.fireRoom.collection('appUserState'))
    this.$bind('users', this.fireRoom.collection('users'))
    this.loading = false
  },
  async mounted() {
    console.log('game successfully started')

    // wh.im本体との通信を開始
    window.parent.postMessage("connect", process.env.whimUrl);

    // wh.imから room / users情報が送られてきたら登録
    window.addEventListener('message', (event) => {
      console.log("get event: " + event)
      if(event.data.room){
        console.log("room: " + event.data.room)
        this.room = event.data.room
      } else if(event.data.users){
        console.log("user: " + event.data.users)
        this.users = event.data.users
      }
    }, false);
    const appState = this.room.appState || {}
    appState['questioner'] = this.userId
    appState['nAnswer'] = 0
    appState['time'] = 0
    window.parent.postMessage({appState}, process.env.whimUrl)
    this.loading = false
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.player {
  position: absolute;
  z-index:0;
  border: 1px black;
}
</style>
