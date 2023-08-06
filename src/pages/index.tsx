import Transfer from '../components/Transfer';
import styles from './index.less';

const IndexPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Transfer
        dataSource={[
          { key: 1, title: 1 },
          { key: 2, title: 2 },
          { key: 3, title: 3 },
          { key: 4, title: 4 },
          { key: 5, title: 5 },
          { key: 6, title: 6 },
          { key: 7, title: 7 },
          { key: 8, title: 8 },
          { key: 9, title: 9 },
          { key: 10, title: 10 },
          { key: 11, title: 11 },
          { key: 12, title: 12 },
          { key: 13, title: 13 },
          { key: 14, title: 14 },
        ]}
        defaultTargetKeys={[2, 3, 4]}
      />
    </div>
  );
};

export default IndexPage;
