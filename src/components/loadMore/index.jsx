import { Button } from 'antd';

export const LoadMore = ({ isLoading, onLoadMore }) =>
  !isLoading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>Load more</Button>
    </div>
  ) : null;
