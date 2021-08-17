<template>
  <div id="app">
    <div id="drawflow"></div>
  </div>
</template>

<script>
import * as Vue from "vue";
/*eslint-disable */

import Drawflow from "drawflow";
import styleDrawflow from "drawflow/dist/drawflow.min.css"; // eslint-disable-line no-use-before-define
import NodeClickVue from "./components/NodeClick.vue";
import UbicacionUsuario from "./components/UbicacionUsuario.vue";
import { sortPosition, orderNode } from "./helpers/functions";
/*eslint-enable */

export default {
  name: "App",
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    const id = document.getElementById("drawflow");
    this.editor = new Drawflow(id, Vue);
    this.editor.reroute = true;
    this.editor.reroute_fix_curvature = true;

    this.editor.start();
    this.editor.zoom_out();

    const props = {
      editor: this.editor,
    };
    const options = {};

    this.editor.on("nodeMoved", (id) => {
      sortPosition(id, this.editor);
    });

    this.editor.on("nodeCreated", (id) => {
      sortPosition(id, this.editor);
    });

    this.editor.on("connectionCreated", (connection) => {
      orderNode(connection, this.editor);
    });

    this.editor.registerNode("NodeClick", NodeClickVue, props, options);
    this.editor.registerNode("NodeClick2", NodeClickVue, props, options);
    this.editor.registerNode(
      "UbicacionUsuario",
      UbicacionUsuario,
      props,
      options
    );

    const data = {};

    this.editor.addNode(
      "Name",
      0,
      1,
      150,
      300,
      "welcome",
      data,
      "NodeClick",
      "vue"
    );
    this.editor.addNode(
      "Name2",
      3,
      2,
      0,
      400,
      "ubicacion",
      data,
      "UbicacionUsuario",
      "vue"
    );
    this.editor.addNode(
      "Name2",
      3,
      0,
      750,
      300,
      "ubicacion",
      data,
      "UbicacionUsuario",
      "vue"
    );
  },
};
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
  text-align: initial;
  position: relative;
  width: 100%;
  height: 800px;
  border: 1px solid red;
  background: var(--background-color);
  background-size: 500px 25px;
  background-image: linear-gradient(to right, #f1f1f1 1px, transparent 1px),
    linear-gradient(to bottom, #f1f1f1 1px, transparent 1px);
}
.input {
  background: white !important;
}
/* .drawflow-node {
  padding-left: 30px !important;
  padding-right: 30px !important;
  z-index: -999;
} */
</style>