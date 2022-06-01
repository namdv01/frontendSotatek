import React, { useEffect } from "react";

const BulkAction = (props) => {
  useEffect(() => {}, [props.listRemove]);

  const removeMultiTask = () => {
    console.log(props.listRemove);
    props.removeMultiTask(props.listRemove);
    props.setListRemove([]);
    props.setChecked(false);
  };

  return (
    <div className="bulkAction isNone">
      <div className="bulkActionLeft">Bulk Action:</div>
      <div className="bulkActionRight">
        <button className="bulkActionDone">Done</button>
        <button className="bulkActionRemove" onClick={removeMultiTask}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default BulkAction;
