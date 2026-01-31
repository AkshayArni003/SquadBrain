import styles from "./loader.module.css";

export default function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.wrapper}>
                <div className={styles.circle}></div>
                <div className={styles["line-1"]}></div>
                <div className={styles["line-2"]}></div>
                <div className={styles["line-3"]}></div>
                <div className={styles["line-4"]}></div>
            </div>
        </div>
    )
}