<template>
  <div>
    <section>
      <div class="container">
        <div class="columns">
          <div class="column">
            <b-message
              :active.sync="isReadQr"
              title="読み取り内容">
              {{ json }}
            </b-message>
            {{ isReadQr }}
          </div>
        </div>
      </div>
    </section>
    <section class="hero is-medium has-text-centered">
      <div class="hero-body hero-body-hp-main">
        <div class="container">
          <div class="columns">
            <div class="column">
              <button
                class="button"
                @click="cameraStart">カメラスタート</button>
            </div>
            <div class="column">
              <button
                class="button"
                @click="readImage">読み取りスタート</button>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <video
                :width="width"
                :height="height"
                autoplay/>
            </div>
            <div class="column">
              <div :style="{ width: width + 'px', height: height+ 'px' }">
                <!-- canvasなしでも仮想DOMを作成して描画 -->
                <!-- <canvas
                  :width="width"
                  :height="height"
                /> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import jsQR from "jsQR";

export default {
  name: "Qr",
  data() {
    return {
      srcObject: "",
      width: 500,
      height: 500,
      json: null
    };
  },
  computed: {
    isReadQr: () => {
      return Boolean(this.json);
    }
  },
  methods: {
    cameraStart() {
      const p = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: this.width,
          height: this.height,
          frameRate: { ideal: 5, max: 15 }
        }
      });
      p.then(function(mediaStream) {
        document.querySelector("video").srcObject = mediaStream;
      });
    },
    readImage() {

console.log("----------------readImage----------------")


      const video = document.querySelector("video");
      const canv = document.createElement("canvas");
      canv.height = this.height;
      canv.width = this.width;

      const context = canv.getContext("2d");

      setInterval(() => {
        console.log("search .....");
        context.drawImage(video, 0, 0, this.width, this.height);
        const imageData = context.getImageData(0, 0, this.width, this.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          console.log("Found QR code", code, code.data);
          this.json = code.data;
        }
      }, 500);
    }
  }
};
</script>
