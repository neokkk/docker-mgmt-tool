import { PropsWithChildren } from 'react';
import Style from './Card.style';

const Card = ({ children }: PropsWithChildren) => {
  return <Style.Container>{children}</Style.Container>;
};

export default Card;
