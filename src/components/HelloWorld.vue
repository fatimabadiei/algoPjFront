<template>
  <div class="cont">
    <v-app-bar dark app fixed clipped-right color="#D1C4E9">

    </v-app-bar>

    <v-navigation-drawer
      class="d"
      clipped
      right
      v-model="drower"
      app
      fixed
      color="#B2EBF2"
    >
      <v-btn color="#006064" @click="onClickInt" class="b" block dark>
        sort int</v-btn
      >

      <v-btn color="#006064" @click="onClickFloat" class="b" block dark>
        sort float</v-btn
      >

      <v-btn color="#006064" @click="onClickString" class="b" block dark>
        sort string</v-btn
      >
    </v-navigation-drawer>

    <v-card
      v-if="sCard"
      color="#B2EBF2"
      width="260"
      class="card"
      height="100vh"
    >
      <v-btn
        :disabled="
          algo == 'radixSort' &&
            (fileDataType == 'float' || fileDataType == 'string')
        "
        color="#006064"
        class="b"
        block
        dark
        v-for="(algo, i) in algoList"
        @click="onSubmit(algo)"
        :key="i"
      >
        <div>
          {{ algo }}
        </div>
      </v-btn>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card height="300" width="400" style="display: flex; justify-content: center;align-items: center">
        <div>
          <div v-for="(v,k,i) in timeD" :key="i" style="display: flex;margin-bottom: 12px;font-size: 20px">
            <div style="margin-right: 36px">{{k}}</div>
            <div>{{v}}</div>
          </div>
        </div>
      </v-card>

    </v-dialog>
  </div>
</template>

<script>
// import {genRandomInt} from '../io/io'
import axios from "axios";

export default {
  name: "HelloWorld",

  data: () => ({
    drower: true,
    sCard: false,
    fileDataType: "",
    algoList: [
      "insertionSort",
      "heapSort",
      "bubbleSort",
      "mergeSort",
      "quickSort",
      "selectionSort",
      'jsSort',
      "radixSort"
    ],
    dialog:false,
    timeD:{}
  }),
  methods: {
    onClickInt() {
      this.fileDataType = "int";
      this.sCard = true;
    },
    onClickFloat() {
      this.fileDataType = "float";
      this.sCard = true;
    },
    onClickString() {
      this.fileDataType = "string";
      this.sCard = true;
    },
    onSubmit(algoName){
      console.log("req send");
      axios.get(`/sort/sort-${this.fileDataType}/${algoName}`).then(resp=>{
        this.timeD=resp.data
        this.dialog=true
        const that=this
        setTimeout(()=>{
          that.dialog=false
        },8000)
      })
    }
  },

};
</script>

<style scoped>
.cont {
  display: flex;
  justify-content: right;
}
.d {
  padding: 100px 16px;
}
.card {
  padding: 100px 16px;
}

.b {
  margin-bottom: 50px;
}
</style>
