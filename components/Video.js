import { motion } from "framer-motion";
import { useMedia } from "react-media";
import emojiCursor from "./emojiCursor";

export default function Video() {
  const isDesktop = useMedia({ query: "(min-width: 900px)" });

  if (!!isDesktop) {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        emojiCursor();
      }, 4000);
    }

    return (
      <div className="video-container">
        <motion.div
          initial={{ opacity: 0, x: "12.5%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{
            opacity: {
              delay: 0.5,
              duration: 0.5,
            },
            x: {
              delay: 3,
            },
          }}
        >
          <video src="/pl3-web-v2.mp4" muted autoPlay loop playsInline></video>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: "40%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{
        opacity: {
          delay: 0.5,
          duration: 0.5,
        },
        y: {
          delay: 3,
        },
      }}
    >
      <video src="/pl3-web-v2.mp4" muted autoPlay loop playsInline></video>
    </motion.div>
  );
}
