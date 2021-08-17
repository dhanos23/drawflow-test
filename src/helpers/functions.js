const size = 500;

export const orderNode = (connection, editor) => {

// {output_id: "1", input_id: "2", output_class: "output_1", input_class: "input_1"}

  let outputId = connection.output_id;
  let inputId = connection.input_id;
  let outputColumn = editor.drawflow.drawflow.Home.data[outputId].pos_x / size;
  let inputNode =  editor.drawflow.drawflow.Home.data[inputId];
  let inputColumn = inputNode.pos_x / size;

  if (outputColumn > inputColumn ) {
    editor.removeSingleConnection(outputId, inputId, connection.output_class, connection.input_class); 
    alert('Forbidden connection deleted');
    return;
  }

  if (outputColumn != inputColumn )
    return;

  let inputNodeWithoutConnections   = true;
  let inputOutputs = Object.values(inputNode.outputs);

  // Find if input node has connections in its outputs
  inputOutputs.forEach(output => {
    let connections = Object.values(output.connections);
    if (connections.length > 0){
      inputNodeWithoutConnections   = false;
    }
  })

  if(inputNodeWithoutConnections ) {
    console.log('Mover nodo');
    let x = (inputColumn+1) * size;
    editor.drawflow.drawflow.Home.data[inputId].pos_x = x;
    let width = document.getElementById(`node-${inputId}`).offsetWidth;
    document.getElementById(`node-${inputId}`).style.left = `${x + ((size - width) / 2)}px`; 

    sortPosition(inputId, editor);
  }
}

export const sortPosition = (id, editor) => {

    let x = editor.drawflow.drawflow.Home.data[id].pos_x % size;
    x = x > size / 2 ? size - x : -x;
    editor.drawflow.drawflow.Home.data[id].pos_x += x;
    const pos_x = editor.drawflow.drawflow.Home.data[id].pos_x;
    const width = document.getElementById(`node-${id}`).offsetWidth;
    console.log()
    document.getElementById(`node-${id}`).style.left = `${pos_x + ((size - width) / 2)}px`;
  
    const data = editor.drawflow.drawflow.Home.data;
  
    const column = editor.drawflow.drawflow.Home.data[id].pos_x / size;
  
    const components = [];
  
    for(let idx of Object.keys(data)){
  
      if(idx == id)
        continue;
  
      const currentColumn = editor.drawflow.drawflow.Home.data[idx].pos_x / size;
      if(column !== currentColumn)
        continue;
  
      const position = editor.drawflow.drawflow.Home.data[idx].pos_y;
      const height = document.getElementById(`node-${idx}`).offsetHeight;
  
      components.push({position, height});
    }
  
    components.sort(function(a,b){
      return (a.position - b.position); 
    });
  
    let y = editor.drawflow.drawflow.Home.data[id].pos_y;
    const height = document.getElementById(`node-${id}`).offsetHeight;
  
    for(let current of components){
      
      if((y-15 <= current.position && current.position <= y + height + 15) ||
      (y-15 <= current.position + current.height && current.position + current.height <= y + height + 15) ||
      (current.position  <= y-15 && y + height + 15 <= current.position + current.height)){
        y = current.position + current.height + 16;
      }
    }
  
    editor.drawflow.drawflow.Home.data[id].pos_y = y;
    document.getElementById(`node-${id}`).style.top = `${y}px`;   
  
    editor.updateConnectionNodes(`node-${id}`);
  }