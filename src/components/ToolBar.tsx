import React from "react";
import '../styles/ToolBar.css';

function ToolBar(params:any) {
  const setContext = (ctx:string) => {
    console.log("Setting context to: " + ctx);
  };
  
  return (
    <div className="toolbar">
      <button name="selection" onClick={() => setContext("selection")}>
        Seleção
      </button>
      <button name="creation" onClick={() => setContext("creation")}>
        Criação
      </button>
      <button name="panning" onClick={() => setContext("panning")}>
        Panning
      </button>
    </div>
  );
}

export default ToolBar;