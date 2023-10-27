import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import {HeadMeta} from "@/components/HeadMeta/HeadMeta";
import {getLayout} from "@/components/Layout/Layout";


function Home() {
    return (
        <>
            <HeadMeta title={"main"}/>
MAIN


        </>
    )
}

Home.getLayout = getLayout
export default Home