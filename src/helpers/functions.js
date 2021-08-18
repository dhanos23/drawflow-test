const size = 500;

export const orderNode = (connection, editor) => {
  // {output_id: "1", input_id: "2", output_class: "output_1", input_class: "input_1"}

  var { output_id, input_id, output_class, input_class } = connection;
  let outputColumn = getNodeColumn(output_id, editor);
  let inputColumn = getNodeColumn(input_id, editor);

  if (
    outputColumn > inputColumn ||
    editor.getNodeFromId(input_id).inputs[input_class].connections.length > 1
  ) {
    editor.removeSingleConnection(
      output_id,
      input_id,
      output_class,
      input_class
    );
    alert("Forbidden connection deleted");
    return;
  }

  // coloreamos
  let color = randomColor();

  let collection = document.getElementById(`node-${output_id}`).children;
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].className == "outputs") {
      for (let j = 0; j < collection[i].children.length; j++) {
        if (!collection[i].children[j].className.includes(output_class))
          continue;

        color =
          collection[i].children[j].style.backgroundColor != ""
            ? collection[i].children[j].style.backgroundColor
            : color;

        collection[i].children[j].style.backgroundColor = color;
      }
    }
  }

  collection = document.getElementById(`node-${input_id}`).children;
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].className == "inputs") {
      for (let j = 0; j < collection[i].children.length; j++) {
        if (!collection[i].children[j].className.includes(input_class))
          continue;
        console.log(collection[i].children);

        collection[i].children[j].style.backgroundColor = color;
      }
    }
  }
  // termina el coloreo

  if (outputColumn != inputColumn) return;

  let inputNodeWithoutConnections = true;
  let inputOutputs = Object.values(
    editor.drawflow.drawflow.Home.data[input_id].outputs
  );

  // Find if input node has connections in its outputs
  inputOutputs.forEach((output) => {
    let connections = Object.values(output.connections);
    if (connections.length > 0) {
      inputNodeWithoutConnections = false;
    }
  });

  if (inputNodeWithoutConnections) {
    console.log("Node moved");
    let x = (inputColumn + 1) * size;
    moveNode(input_id, editor, x);
    sortPosition(input_id, editor);
  }
};

export const getNodeColumn = (id, editor) => {
  return parseInt(editor.drawflow.drawflow.Home.data[id].pos_x / size);
};

export const moveNode = (id, editor, x = null, y = null) => {
  if (x) {
    editor.drawflow.drawflow.Home.data[id].pos_x = x;
    document.getElementById(`node-${id}`).style.left = `${x}px`;
  }
  if (y) {
    editor.drawflow.drawflow.Home.data[id].pos_y = y;
    document.getElementById(`node-${id}`).style.top = `${y}px`;
  }
  editor.updateConnectionNodes(`node-${id}`);
};

export const returnNodeToLastPosition = (id, editor) => {
  let { last_position } = editor.drawflow.drawflow.Home.data[id].data;
  moveNode(id, editor, last_position.pos_x, last_position.pos_y);
};

export const validateNodeNewPosition = (id, editor) => {
  let inputs = editor.getNodeFromId(id).inputs;
  for (let key of Object.keys(inputs)) {
    for (let connection of inputs[key].connections) {
      if (getNodeColumn(connection.node, editor) >= getNodeColumn(id, editor)) {
        alert("Forbidden order");
        return false;
      }
    }
  }
  return true;
};

export const sortPosition = (id, editor) => {
  if (!validateNodeNewPosition(id, editor)) {
    returnNodeToLastPosition(id, editor);
  }

  const elementSelected = document.getElementById(`node-${id}`);
  const nodeSelected = editor.drawflow.drawflow.Home.data[id];

  const last_posY = nodeSelected.pos_y;
  const last_posX = nodeSelected.pos_x;

  let pos_x = last_posX;
  let x = pos_x % size;
  x = x > size / 2 ? size - x : -x;
  pos_x += x;

  const width = elementSelected.offsetWidth;

  const data = editor.drawflow.drawflow.Home.data;

  const column = pos_x / size;

  const components = [];

  for (let idx of Object.keys(data)) {
    if (idx == id) continue;

    const currentColumn = editor.drawflow.drawflow.Home.data[idx].pos_x / size;
    if (column !== currentColumn) continue;

    const position = editor.drawflow.drawflow.Home.data[idx].pos_y;
    const height = document.getElementById(`node-${idx}`).offsetHeight;

    components.push({ position, height });
  }

  components.sort(function(a, b) {
    return a.position - b.position;
  });

  let y = nodeSelected.pos_y;
  const height = elementSelected.offsetHeight;

  for (let current of components) {
    if (
      (y - 15 <= current.position && current.position <= y + height + 15) ||
      (y - 15 <= current.position + current.height &&
        current.position + current.height <= y + height + 15) ||
      (current.position <= y - 15 &&
        y + height + 15 <= current.position + current.height)
    ) {
      y = current.position + current.height + 16;
    }
  }

  nodeSelected.pos_x = pos_x;
  nodeSelected.pos_y = y;

  const distY = y - last_posY;
  const distX = pos_x + (size - width) / 2 - last_posX;
 
  animateMove({distX, distY, element: elementSelected })

  nodeSelected.data.last_position = { 
    pos_x: last_posX,
    pos_y: last_posY
  };

  editor.updateConnectionNodes(`node-${id}`);
};

export const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const colorConnectionRemoved = (connection, editor) => {
  var { output_id, input_id, output_class, input_class } = connection;

  let collection = document.getElementById(`node-${output_id}`).children;
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].className == "outputs") {
      for (let j = 0; j < collection[i].children.length; j++) {
        if (!collection[i].children[j].className.includes(output_class))
          continue;
        if (
          editor.getNodeFromId(output_id).outputs[output_class].connections
            .length == 0
        )
          collection[i].children[j].style.backgroundColor = "";
      }
    }
  }

  collection = document.getElementById(`node-${input_id}`).children;
  for (let i = 0; i < collection.length; i++) {
    if (collection[i].className == "inputs") {
      for (let j = 0; j < collection[i].children.length; j++) {
        if (!collection[i].children[j].className.includes(input_class))
          continue;
        if (
          editor.getNodeFromId(output_id).outputs[output_class].connections
            .length == 0
        )
          collection[i].children[j].style.backgroundColor = "";
      }
    }
  }
};

const animateMove = ({distX = 0, distY = 0, element}) => {
  const animacion = element.animate(
    [
      { transform: `translate(0)` },
      { transform: `translate(${distX}px, ${distY}px)` },
    ],
    200
  );
  animacion.addEventListener("finish", function() {
    element.style.transform = `translate(${distX}px, ${distY}px)`;
  });
}