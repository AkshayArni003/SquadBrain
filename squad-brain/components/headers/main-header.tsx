"use client"

import { logout } from "@/actions/auth";
import styles from "./main-header.module.css";


export default function MainHeader() {

    return (
        <header className={styles.header}>
            <button onClick={() => logout()}>Logout</button>
        </header >
    )
}