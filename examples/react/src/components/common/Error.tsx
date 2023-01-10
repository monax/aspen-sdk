import styles from "../../styles/Home.module.css";

const Error: React.FC<{
  error: string | null;
}> = ({ error }) => {
  if (!error) return null;
  return <div className={styles.error}>{error}</div>;
};

export default Error;
