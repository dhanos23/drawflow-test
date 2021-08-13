const size = 500;

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
  
  }