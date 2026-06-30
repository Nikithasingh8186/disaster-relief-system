import { useState } from "react";
import { uploadText } from "../services/api";

function UploadForm({
  refresh
}) {
  const [text, setText] =
    useState("");

  const submit = async () => {
    if (!text.trim()) {
      return;
    }

    await uploadText(text);

    setText("");

    refresh();
  };

  return (
    <div>
      <textarea
        rows="6"
        cols="60"
        placeholder="Enter disaster report..."
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={submit}>
        Submit Report
      </button>
    </div>
  );
}

export default UploadForm;