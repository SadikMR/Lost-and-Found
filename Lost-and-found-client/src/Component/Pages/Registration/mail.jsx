// src/Component/Pages/Mail/Mail.js

import React from "react";
import { useParams } from "react-router-dom";

const Mail = () => {
  const { pointer } = useParams(); // Get the pointer parameter (e.g., inbox or sent)

  return (
    <div>
      <h1>{pointer.charAt(0).toUpperCase() + pointer.slice(1)} Mail Page</h1>
      <p>
        This is the {pointer} mail page. You can now see that this route is
        accessible.
      </p>
    </div>
  );
};

export default Mail;
