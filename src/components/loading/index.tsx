import React from 'react';

const Loading = (props: ILoadingProps) => {
  const { isLoading } = props;

  return isLoading && <div>加载中......</div>;
};

interface ILoadingProps {
  isLoading: boolean;
}

export default Loading;