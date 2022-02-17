import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import { motion } from "framer-motion";

import Video from "../components/Video";

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="128" viewBox="0 0 290 175">
    <g fill="#FFF">
      <path d="M75.25 0C86.5833333 0 96.625 2.33333333 105.375 7 114.125 11.6666667 120.875 18.2083333 125.625 26.625 130.375 35.0416667 132.75 44.75 132.75 55.75 132.75 66.5833333 130.291667 76.1666667 125.375 84.5 120.458333 92.8333333 113.5 99.25 104.5 103.75 95.5 108.25 85.0833333 110.5 73.25 110.5L42.75 110.5C41.9166667 110.5 41.5 110.916667 41.5 111.75L41.5 172C41.5 172.833333 41.2083333 173.541667 40.625 174.125 40.0416667 174.708333 39.3333333 175 38.5 175L3 175C2.16666667 175 1.45833333 174.708333.875 174.125.291666667 173.541667 0 172.833333 0 172L0 3C0 2.16666667.291666667 1.45833333.875.875 1.45833333.291666667 2.16666667 0 3 0L75.25 0ZM68.5 77.5C75.3333333 77.5 80.875 75.5833333 85.125 71.75 89.375 67.9166667 91.5 62.9166667 91.5 56.75 91.5 50.4166667 89.375 45.2916667 85.125 41.375 80.875 37.4583333 75.3333333 35.5 68.5 35.5L42.75 35.5C41.9166667 35.5 41.5 35.9166667 41.5 36.75L41.5 76.25C41.5 77.0833333 41.9166667 77.5 42.75 77.5L68.5 77.5ZM150.25 175C149.416667 175 148.708333 174.708333 148.125 174.125 147.541667 173.541667 147.25 172.833333 147.25 172L147.25 3C147.25 2.16666667 147.541667 1.45833333 148.125.875 148.708333.291666667 149.416667 0 150.25 0L185.75 0C186.583333 0 187.291667.291666667 187.875.875 188.458333 1.45833333 188.75 2.16666667 188.75 3L188.75 138.25C188.75 139.083333 189.166667 139.5 190 139.5L269.75 139.5C270.583333 139.5 271.291667 139.791667 271.875 140.375 272.458333 140.958333 272.75 141.666667 272.75 142.5L272.75 172C272.75 172.833333 272.458333 173.541667 271.875 174.125 271.291667 174.708333 270.583333 175 269.75 175L150.25 175Z" />
      <path
        d="M75.348,58.604 C77.4946667,63.756 78.568,69.2836667 78.568,75.187 C78.568,80.983 77.4946667,86.4033333 75.348,91.448 C72.5573333,98.4246667 67.9956667,103.9255 61.663,107.9505 C55.3303333,111.9755 47.8706667,113.988 39.284,113.988 C30.912,113.988 23.506,111.921833 17.066,107.7895 C10.626,103.657167 5.957,98.049 3.059,90.965 C1.34166667,86.6716667 0.322,81.949 0,76.797 C0,75.509 0.644,74.865 1.932,74.865 L25.116,74.865 C26.404,74.865 27.1016667,75.509 27.209,76.797 C27.4236667,79.4803333 28.0676667,82.0563333 29.141,84.525 C29.9996667,86.6716667 31.2876667,88.3085 33.005,89.4355 C34.7223333,90.5625 36.7616667,91.126 39.123,91.126 C43.631,91.126 47.012,89.0866667 49.266,85.008 C50.7686667,82.3246667 51.52,78.7826667 51.52,74.382 C51.52,70.0886667 50.7686667,66.332 49.266,63.112 C47.012,59.1406667 43.5773333,57.155 38.962,57.155 C37.7813333,57.155 36.4665,57.5575 35.0175,58.3625 C33.5685,59.1675 31.717,60.375 29.463,61.985 C28.9263333,62.307 28.497,62.468 28.175,62.468 C27.531,62.468 27.048,62.146 26.726,61.502 L15.295,45.402 C14.973,44.8653333 14.812,44.436 14.812,44.114 C14.812,43.47 15.0803333,42.987 15.617,42.665 L40.411,23.828 C40.6256667,23.6133333 40.7061667,23.3986667 40.6525,23.184 C40.5988333,22.9693333 40.411,22.862 40.089,22.862 L4.83,22.862 C4.29333333,22.862 3.83716667,22.6741667 3.4615,22.2985 C3.08583333,21.9228333 2.898,21.4666667 2.898,20.93 L2.898,1.932 C2.898,1.39533333 3.08583333,0.939166667 3.4615,0.5635 C3.83716667,0.187833333 4.29333333,0 4.83,0 L75.026,0 C75.5626667,0 76.0188333,0.187833333 76.3945,0.5635 C76.7701667,0.939166667 76.958,1.39533333 76.958,1.932 L76.958,23.345 C76.958,24.311 76.5823333,25.116 75.831,25.76 L56.35,41.055 C56.1353333,41.2696667 56.0548333,41.4843333 56.1085,41.699 C56.1621667,41.9136667 56.35,42.0746667 56.672,42.182 C65.2586667,44.436 71.484,49.91 75.348,58.604 Z"
        transform="translate(210.523 .3)"
      />
    </g>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default function Home() {
  const discord = axios.get("/api/members");
  const [members, setMembers] = useState(false);
  const [online, setOnline] = useState(false);

  useEffect(async () => {
    if (discord.members) setMembers(discord.members.toLocaleString());
    if (discord.online) setOnline(discord.online.toLocaleString());
  }, [discord, members, online]);

  return (
    <div>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>PL3 (Crypto + NFT)</title>
        <meta name="description" content="Polskie community Web3" />
        <meta property="og:title" content="PL3 (Crypto + NFT)" />
        <meta property="og:description" content="Polskie community Web3" />
        <meta property="og:url" content="https://pl3.club" />
        <meta property="og:image" content="/pl3-meta.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="page">
        <Video />
        <div className="ui-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.25 }}
          >
            <Logo />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }}>
            <h2>Crypto + NFT</h2>
          </motion.div>
          {members && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.15, duration: 1 }}>
              <div className="server-stats">
                <div className="members">
                  <UserIcon />
                  <span>{members}</span>
                </div>
                <span>‏‎ ‎•‏‎ ‎</span>
                <div className="online-members">
                  <span>{online} online</span>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.85 }}
          >
            <div className="join-container">
              <a href="https://discord.com/invite/nwMzftWJt7" className="join-button">
                Wejdź na Discord →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <div id="emoji-layer"></div>
    </div>
  );
}
