import styles from './SectionHeader.module.css';

const SectionHeader = ({
  title,
  subtitle,
  highlightWord,
  centered = true,
  withDecoration = true,
  className = '',
}) => {
  // Split title to highlight specific word if provided
  let titleContent;
  
  if (highlightWord && title.includes(highlightWord)) {
    const parts = title.split(highlightWord);
    titleContent = (
      <>
        {parts[0]}
        <span className={styles.highlight}>{highlightWord}</span>
        {parts[1]}
      </>
    );
  } else {
    titleContent = title;
  }

  return (
    <header 
      className={`${styles.sectionHeader} ${centered ? styles.centered : ''} ${className}`}
    >
      <h2 className={styles.sectionTitle}>{titleContent}</h2>
      
      {withDecoration && (
        <div className={styles.accentDecoration}>
          <div className={styles.accentLine}></div>
          <div className={styles.accentDot}></div>
          <div className={styles.accentLine}></div>
        </div>
      )}
      
      {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
    </header>
  );
};

export default SectionHeader;