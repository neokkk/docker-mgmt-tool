import { PropsWithChildren } from 'react';
import Style from './Card.style';

type CardProps = PropsWithChildren & {
  name?: string;
  onClick?: () => void;
};

const Card = ({ children, onClick }: CardProps) => {
  const handleClick = () => {
    onClick?.();
  };

  return <Style.Container onClick={handleClick}>{children}</Style.Container>;
};

export default Card;
