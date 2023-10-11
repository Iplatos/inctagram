import {PropsWithChildren, ReactElement} from "react";
import {NextPage} from "next";
import {NavBar} from "@/components/NavBar/NavBar";
import styles from "@/styles/Home.module.css";

export const Layout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props

    return (
        <main className={styles.main}>
            <NavBar/>
            {children}
        </main>
    )
}

export const getLayout = (page: ReactElement) => {
    return <Layout>{page}</Layout>
}