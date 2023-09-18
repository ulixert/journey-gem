import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant: 'primary' | 'back' | 'position';
  preventFormSubmission?: boolean;
};

export function Button({
  onClick,
  children,
  variant,
  preventFormSubmission = false,
}: ButtonProps) {
  return (
    <button
      type={preventFormSubmission ? 'button' : undefined}
      onClick={onClick}
      className={`${styles.btn} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
