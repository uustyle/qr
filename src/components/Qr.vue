<template>
  <div>
    <p class="error">{{ error }}</p>

    <p class="decode-result">Last result: <b>{{ result }}</b></p>

<input type="radio" id="auto" value="auto" v-model="camera">
<label for="auto">auto</label>
<br>
<input type="radio" id="rear" value="rear" v-model="camera">
<label for="rear">rear</label>
<br>
<input type="radio" id="front" value="front" v-model="camera">
<label for="front">front</label>
<br>
<input type="radio" id="off" value="off" v-model="camera">
<label for="off">off</label>
<br>



<span>camera: {{ camera }}</span>

    <qrcode-stream :camera="camera" @detect="onDetect" @decode="onDecode" @init="onInit" />
  </div>
</template>

<script>

import { QrcodeStream } from 'vue-qrcode-reader'

export default {
  components: { QrcodeStream },
  data () {
    return {
      camera: 'off',
      result: '',
      error: ''
    }
  },

  methods: {
    onDecode (result) {

console.log("onDecode")
console.log("result", result)

      this.result = result
    },


  async onDetect (promise) {
    try {
      const {
        imageData,    // raw image data of image/frame
        content,      // decoded String
        location      // QR code coordinates
      } = await promise

console.log("onDetect")
console.log("imageData", imageData)
console.log("content", content)


      // ...
    } catch (error) {
      // ...
    }
  },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>