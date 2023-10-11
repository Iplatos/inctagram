import Link from "next/link";
import styles from "./NavBar/NavBar.module.css"

export const NavBar = () => {
    return (
        <div className={styles.links}>
            <Link href={"/"}>Main</Link>
            <Link href={"/login"}>login</Link>
        </div>
    );
};