import React, { useRef } from "react";

import styles from "./FileInput.module.css";

const FileInput = (props: any) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleFile(event);
  };

  return (
    <>
      <button
        className={`${styles.button} ${styles.bgSpecial}`}
        onClick={handleClick}
      >
        Upload a file
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
};
export default FileInput;
