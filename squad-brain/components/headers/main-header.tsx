import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/SquadBrain.jpeg";
import styles from "./main-header.module.css";
import LoginNav from "../login-nav/login-nav";


export default function MainHeader() {

    return (
        <header className={styles.header}>
            <button>Logout</button>
        </header >
    )
}