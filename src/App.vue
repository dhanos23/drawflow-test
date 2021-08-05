<template>
  <div id="app">
    <div id="drawflow"></div>
  </div>
</template>

<script>
import * as Vue from 'vue'
/*eslint-disable */

import Drawflow from 'drawflow'
import styleDrawflow from 'drawflow/dist/drawflow.min.css' // eslint-disable-line no-use-before-define
import NodeClickVue from './components/NodeClick.vue'
import UbicacionUsuario from './components/UbicacionUsuario.vue'
/*eslint-enable */


export default {
  name: 'App',
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    const id = document.getElementById("drawflow");
    this.editor = new Drawflow(id, Vue);
    this.editor.start();
    const props = {};
    const options = {};
    this.editor.registerNode('NodeClick', NodeClickVue, props, options);
    this.editor.registerNode('UbicacionUsuario', UbicacionUsuario, props, options);
    const data = {};
    this.editor.addNode('Name', 0, 1, 150, 300, 'welcome', data, 'NodeClick', 'vue');
    this.editor.addNode('Name2', 0, 1, 150, 300, 'ubicacion', data, 'UbicacionUsuario', 'vue');
    

  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}
html {
  box-sizing: border-box;
  font-size: 62.5%;
}
#app {
  text-align: initial;
}
#drawflow {
  text-align:initial;
  position: relative;
  width: 100%;
  height: 800px;
  border: 1px solid red;
}
</style>