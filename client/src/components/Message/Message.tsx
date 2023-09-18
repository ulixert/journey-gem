import styles from './Message.module.css';

type MessageProps = {
  message: string;
};

export function Message({ message }: MessageProps) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}
