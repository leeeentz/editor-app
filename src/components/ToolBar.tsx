import React from "react";
import '../styles/ToolBar.css';

interface ToolBarProps {
  onContextChange: (ctx: string) => void;
  currentContext?: string;
}

function ToolBar({onContextChange, currentContext}: ToolBarProps) {

  const setContext = (ctx:string) => {
    onContextChange(ctx);
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