import { Fragment, ReactNode } from 'react';

export const StrJoin = ({
  data,
  color,
  JoinElem,
  className,
}: {
  data: string[];
  color: string;
  className: string;
  JoinElem: () => ReactNode;
}) => (
  <span className={['font-mono', className].join(' ')} style={{ color }}>
    {data.map((str, idx) => (
      <Fragment key={`join_${data.join(' ')}_${str}_${idx}`}>
        {idx > 0 ? JoinElem() : null}
        {str === '' ? <>&#20;</> : str}
      </Fragment>
    ))}
  </span>
);
