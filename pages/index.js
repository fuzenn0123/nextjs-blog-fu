/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import Head from "next/head"
import styles from '../styles/home.module.css'
import Link from "next/link"
import Header from "./components/headers"
import Content from "./components/content"
import useSWR from "swr"
import Layout, { siteTitle } from "../components/Layout"
import utilStyle from "../styles/utils.module.css"
import { getPostsData } from "../lib/post"
//SSGの場合
export async function getStaticProps() {　　　
  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context){
//    return{
//      props:{
//        //コンポーネントに渡すためのprops
//      }
//    }
// }

export default function Home({ allPostsData }) {
  return (

    <Layout　home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          私はフルスタックエンジニア
        </p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>

        <h2>📝エンジニアブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`}
                  className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}



        </div>

      </section>


    </Layout>
  );
}
