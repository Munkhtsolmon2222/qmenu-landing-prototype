import Image from 'next/image';

interface Props extends Omit<React.ComponentProps<typeof Image>, 'src'> {
  src: string | undefined | null;
}

export const Img: React.FC<Props> = ({ src, height, width, ...props }) => {
  // return <Image src={src ?? noimage} {...props} height={height ?? 400} width={width ?? 400} />;
  return <img src={src ?? ''} {...props} height={height ?? 400} width={width ?? 400} />;
};
