import React from "react";
import styles from "./Select.module.css";
function Select({ value, setValue, options }) {
  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      >
        {!options?.length
          ? Object.keys(options).map((key) => (
              <option key={key} value={options[key]}>
                {key}
              </option>
            ))
          : options.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
      </select>
    </div>
  );
}

export default Select;
