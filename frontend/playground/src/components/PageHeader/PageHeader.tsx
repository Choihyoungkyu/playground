import React from 'react';
import style from './PageHeader.module.css';

interface PropsType {
  title: string;
}

const PageHeader = (props: PropsType) => {
  return <div className={style.header}>{props.title}</div>;
};

export default PageHeader;
