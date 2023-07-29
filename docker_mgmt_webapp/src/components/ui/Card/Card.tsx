import { PropsWithChildren } from 'react';
import Style from './Card.style';

type CardProps = PropsWithChildren & {
  name?: string;
};

const Card = ({ children }: CardProps) => {
  return <Style.Container>{children}</Style.Container>;
};

export default Card;
