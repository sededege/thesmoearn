import React from "react";
import { Button } from "@web3uikit/core";

export default function SecretBtn() {
  return (
    <div>
    <Button
      text="Secret Button"
      theme="primary"
      onClick={() => {
        alert("✨You have access to the secret button✨");
      }}
    ></Button>
     </div>
  );
}
