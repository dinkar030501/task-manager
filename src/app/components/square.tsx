import styles from "../page.module.css";

interface SquareProps {
  value: string;
  squareIsClicked: () => void;
}

function Square({ value, squareIsClicked }: SquareProps) {
  return (
    <button className={styles.square} onClick={squareIsClicked}>
      {value}
    </button>
  );
}

export default Square;
