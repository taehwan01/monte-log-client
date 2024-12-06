'use client';

import Image from 'next/image';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
import styles from './Header.module.css';

export default function Header() {
    const handleClickHeaderLogo = () => {
        window.location.href = '/';
    };

    return (
        <header id={styles.header}>
            <div id={styles.headerLogoContainer}>
                <div id={styles.headerLogo} onClick={handleClickHeaderLogo}>
                    <span id={styles.logoText}>m o n t e</span>
                    <div id={styles.logoSquare}></div>
                </div>
                <Image
                    id={styles.headerLogoGif}
                    src='https://media.giphy.com/media/icIr8rk03xQI6NS67S/giphy.gif?cid=ecf05e47bwu0t64ojczk567l2bq1k2v0upz9h2i06z6rosoi&ep=v1_gifs_related&rid=giphy.gif&ct=g'
                    alt='logo'
                    width={50}
                    height={50}
                    unoptimized
                />
                {/* <Image
                    id={styles.headerLogoGif}
                    src='https://media.giphy.com/media/l3q2KmU5GRIFhROLe/giphy.gif?cid=ecf05e47md6v6mi4842p6si3xhytz99rnhdcq9shjg55514p&ep=v1_gifs_related&rid=giphy.gif&ct=g'
                    alt='logo'
                    width={50}
                    height={50}
                    unoptimized
                /> 
                <Image
                    id={styles.headerLogoGif}
                    src='https://media.giphy.com/media/eycB31HbJ0C0DfdlAB/giphy.gif?cid=ecf05e47cdxhty0htp5yhnisa36lpvc49usqie1bzp7cbqec&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                    alt='logo'
                    width={50}
                    height={50}
                    unoptimized
                />
                <Image
                    id={styles.headerLogoGif}
                    src='https://media.giphy.com/media/26BRPOl0GYIOl9Ruw/giphy.gif?cid=ecf05e47o2p84hknmgytauwwtti3i09uo9gnc8gry9a35p1k&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                    alt='logo'
                    width={50}
                    height={50}
                    unoptimized
                />
                <Image
                    id={styles.headerLogoGif}
                    src='https://media.giphy.com/media/l1BgT72qhvqbQNGVO/giphy.gif?cid=ecf05e47rd8lm8lnae5hamzehspe2yp4jyb09hc8skmttsb4&ep=v1_gifs_related&rid=giphy.gif&ct=g'
                    alt='logo'
                    width={50}
                    height={50}
                    unoptimized
                />
                <Image
                    id={styles.headerLogoGif}
                    src='https://media.giphy.com/media/hBSgGOTLG5yJW/giphy.gif?cid=ecf05e476zrnp0df93tctt76o6sgszurfphxy68ht416fy80&ep=v1_gifs_related&rid=giphy.gif&ct=g'
                    alt='logo'
                    width={50}
                    height={50}
                    unoptimized
                />
                <Image
                    id={styles.headerLogoGif}
                    src='https://media.giphy.com/media/dGjU975fwUAGA/giphy.gif?cid=ecf05e47qduz0g0achckk4dnb18mikc2d4gexvoor4jrmwsc&ep=v1_gifs_related&rid=giphy.gif&ct=g'
                    alt='logo'
                    width={50}
                    height={50}
                    unoptimized
                />
                <Image
                    id={styles.headerLogoGif}
                    src='https://media.giphy.com/media/OAvtYsbEf8d3nURCro/giphy.gif?cid=ecf05e47tje5wqpbgs3ndqzh7skne1g45rnjle7jiqfs1djt&ep=v1_gifs_related&rid=giphy.gif&ct=g'
                    alt='logo'
                    width={50}
                    height={50}
                    unoptimized
                /> */}
            </div>
            <HorizontalRule />
        </header>
    );
}
