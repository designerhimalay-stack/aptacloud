// Construction lines, a decorative layout layer:
// two fixed 1px vertical rules on the 1320px rail grid, each with two 11px crosses
// at 22vh from the top and bottom of the viewport. Hidden below 1200px.

import styles from "./ConstructionLines.module.css";

function Rule() {
  return (
    <div className={styles.rule}>
      <div className={styles.space} />
      <div className={styles.cross} />
      <div className={styles.fill} />
      <div className={styles.cross} />
      <div className={styles.space} />
    </div>
  );
}

export function ConstructionLines() {
  return (
    <div className={styles.layer} aria-hidden="true">
      <div className={styles.rails}>
        <Rule />
        <Rule />
      </div>
    </div>
  );
}
