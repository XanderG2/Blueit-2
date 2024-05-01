import styles from "../styles/Post.module.css";
import { useRouter } from "next/navigation";
import { ReplyData } from "./interfaces";

export default function Reply({
  short,
  reply: { id, username, content, postId },
}: {
  reply: ReplyData;
  short?: boolean;
}) {
  const { push } = useRouter();
  const go = () => {
    push(`/reply/${id}`);
  };
  return (
    <div className={short ? styles.shortpost : styles.post} onClick={go}>
      <div className={styles.username}>
        {username}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className={styles.right}>
          {[
            String(new Date(id)).split(" ")[2],
            String(new Date(id)).split(" ")[1],
            String(new Date(id)).split(" ")[3],
            String(new Date(id)).split(" ")[4],
          ]
            .toString()
            .replace(/,/g, " ")}
        </div>
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
