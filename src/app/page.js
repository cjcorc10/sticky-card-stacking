'use client'
import styles from './main.module.scss'
import Lenis from 'lenis';
import { motion, scale, useScroll, useTransform } from 'motion/react'
import { useRef, useEffect } from 'react';

export default function Home() {
  const cards = [
    {title: 'card 1', color: '#D2BD84'},
    {title: 'card 2', color: '#8499D2'},
    {title: 'card 3', color: '#84D2BD'},
  ]

  const container = useRef();
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }, [])
  const {scrollYProgress} = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })
  return (
    <main className={styles.main}>
      <div className={styles.slideContainer} ref={container}>
        {cards.map((card, i) => {
          const scaleFactor = 1 - (cards.length - i) * 0.05
        return <Card key={i} {...card} i={i} range={[i * .33, 1]} progress={scrollYProgress} scaleFactor={scaleFactor} />
})}
      </div>
    </main>
  );
}

const Card = ({title, color, i, progress, range, scaleFactor}) => {

  const scale = useTransform(progress, range, [1, scaleFactor])
  return <div className={styles.cardContainer}>
    <motion.div className={styles.card} style={{backgroundColor: color, scale, top: `calc(-10vh + ${i} * 3vh)`}}>
      <h1 className={styles.title}>{title}</h1>
    </motion.div>
  </div>
}