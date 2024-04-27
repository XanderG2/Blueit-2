import styles from "../styles/Post.module.css";
import { useRouter } from "next/navigation";

export default function Post({ post: { id, username, content } }) {
  const { push } = useRouter();
  const go = () => {
    push(`/p/${id}`);
  };
  return (
    <div className={styles.post} onClick={go}>
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
