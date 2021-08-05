<template>
  <div class="ubicacion" >
     <div class="ubicacion__header">
        <p> Ubicacion del usuario/a </p>
     </div>
    <div class="ubicacion__body" >
      <div class="contenido">
        <select>
          <option>Base de datos o webservice</option>
        </select>
      </div>
      <div class="contenido">
        <div class="contenido__add">
          <p>Agregar contenido</p>
          <p>+</p>
        </div>
      </div>
     </div>
  </div>
</template>

<script>
export default {
  methods: {
    Clicked() {
      alert("hello-drawflow");
    }
  }
}
</script>
<style>
.ubicacion__header{
  text-align: center;
  color: #173261;
  font-size: 1.8rem;
  padding: .5rem 1rem;
  background-color: #edf1f5;
}
.drawflow-node.ubicacion {
    width: 318px;
}
.drawflow .drawflow-node {
  background-color: white;
  border:1px solid #839bb2;
  padding-top: 0;
  padding-bottom: 0;
  padding: 0;
}
.ubicacion{
  background-color: white;
}
.ubicacion__body{
  padding: 1rem;
}
.contenido{
  background-color: #edf1f5;
  padding: 1rem;
  border:1px dashed #839bb2;
  border-radius: 2px;
}
.contenido:not(:last-child){
  margin-bottom: 1rem;
}
.contenido__textArea{
  width: 100%;
}
.contenido__add{
  display: flex;
  flex: 1;
  justify-content: space-between;
}
select{
  width: 100%;
  padding: .5rem;
}

</style>