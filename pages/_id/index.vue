<template>
  <div class="container" style="background-color:transparent;">
    
    <div
      class="player"
      :width="videoWidth" 
      :height="videoHeight" 
      v-if="$route.query.isMe === 'True' && playerId === questioner"
    >
      <div v-if="theme !== ''" >
        <v-card>{{theme}}</v-card>
        <v-btn color="primary" @click="newTheme">次のお題へ</v-btn>
      </div>
      <v-btn v-else @click="initialize">出題者になる</v-btn>
    </div>
  </div>
</template>


<script>

import firebase from "~/plugins/firebase.js"
import func from '../../vue-temp/vue-editor-bridge';
const db = firebase.firestore();

export default {
  data: function () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      appData: [],
      users: [],
      theme: '',
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
    fireRoom: function(){
      return db.collection('rooms').doc(this.$route.query.roomId)
    },
    playerId() {
      return this.$route.params.id
    },
    questioner() {
      return this.appState.find(element => element.questioner)
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
      this.fireRoom.collection('appState').doc('gesture').set({
        questioner: this.playerId,
        time: 60
      })
      this.newTheme()
      function timeKeeper() {
        const state = this.fireRoom.collection('appState').doc('gesture').get()
        const time = state.data().time
        if(time === 0) {
          this.finish()
          return
        }
        this.fireRoom.collection('appState').doc('gesture').set({time: time-1})
        setTimeout(timeKeeper, 1000)
      }
      setTimeout(timeKeeper, 1000)
    },
    finish() {}
  },
  async mounted() {
    console.log('hoge')

    const data = await firebase.auth().signInAnonymously()
    console.log(data)
    console.log(data.user.uid)

    this.uid = data.user.uid

    await this.fireRoom.collection('appClients').doc(this.uid).set({});

    this.$bind('room', this.fireRoom)
    this.$bind('appData', this.fireRoom.collection('appData'))
    this.$bind('appState', this.fireRoom.collection('appState'))
    this.$bind('users', this.fireRoom.collection('users'))
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
