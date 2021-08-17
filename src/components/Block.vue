<template>
  <div class="block">
    <one></one>
    <button v-on:click="hola">Click</button>
  </div>
</template>

<script>
import One from "./NodeClick.vue";
export default {
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  components: {
    One,
  },
  methods: {
    hola() {
      // this.editor.removeNodeId("node-1");
      let id = "1";
      console.log(id);
      this.editor.addNodeInput(id);
      this.editor.addNodeOutput(id);
      // 10017px
      // transform: translate(-9999px,-10017px)
    },
  },
};
</script>

<style>
</style>