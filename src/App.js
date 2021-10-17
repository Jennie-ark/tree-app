import React, { useEffect, useState } from "react";
import "./App.css";

const tree = {
  name: "Tree",
  child: [
    {
      name: "/",
      child: [
        {
          name: "Home",
          child: [],
        },
        {
          name: "Lib",
          child: [
            {
              name: "bin",
              child: [],
            },
          ],
        },
      ],
    },
    {
      name: "Host",
      child: [],
    },
  ],
};

export default function App() {
  return (
    <>
      <Tree />
      <button onClick={refreshTree}>Click to reload!</button>
    </>
  );
}

function refreshTree() {
  window.location.reload(false);
}

function saveTree(tree) {
  console.log(tree);
}

function Tree(props) {
  const isRoot = !props.node;

  const { onRemove, onInsert, isLastChild, onUpdate } = props;
  const [node, setNode] = useState(props.node || tree);

  useEffect(() => {
    if (isRoot) {
      saveTree(node);
    } else {
      onUpdate(node);
    }
  }, [node]);

  function addChild(name) {
    setNode({
      ...node,
      child: [...node.child, { name, child: [] }],
    });
  }

  function removeChildAtIdx(idx) {
    setNode({
      ...node,
      child: node.child.filter((_, i) => i !== idx),
    });
  }
  function updateChild(obj) {
    setNode({
      ...node,
      child: node.child.map((el) => {
        if (el.name === obj.name) {
          return obj;
        } else {
          return el;
        }
      }),
    });
  }

  return (
    <div className="wrapper">
      <ul>
        <li>
          {node.name}
          {!isRoot && (
            <span onClick={onRemove}>
              <button>Remove</button>
            </span>
          )}

          {isLastChild && (
            <input
              placeholder="press 'Enter' for add"
              maxLength="20"
              onKeyUp={(e) => {
                if (e.key === "Enter") onInsert(e.target.value);
              }}
            />
          )}
        </li>
        {node.child.length > 0 && (
          <li>
            {node.child.map((el, idx) => (
              <Tree
                key={el.name}
                node={el}
                onRemove={() => removeChildAtIdx(idx)}
                onInsert={(name) => addChild(name)}
                isLastChild={idx === node.child.length - 1}
                onUpdate={(node) => updateChild(node)}
              />
            ))}
          </li>
        )}
      </ul>
    </div>
  );
}
