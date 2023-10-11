import Link from "next/link";
import styles from "./NavBar/NavBar.module.css"

export const NavBar = () => {
    return (
        <div className={styles.links}>
            <Link href={"/"}>Main</Link>
            <Link href={"/signIn"}>Sign In</Link>
            <Link href={"/signUp"}>Sign Up</Link>
            <Link href={"/forgotPassword"}>Forgot Password</Link>
            <Link href={"/termsOfService"}>Terms Of Service</Link>
            <Link href={"/privacyPolicy"}>Privacy Policy</Link>
        </div>
    );
};