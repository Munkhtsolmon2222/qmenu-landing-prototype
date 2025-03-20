import loader from '@/assets/images/logoLoader.gif';

interface Props {
  className?: string;
}

export const Welcome = ({ className }: Props) => {
  return (
    <div className={className || 'absolute z-50 w-3/5 inset-2/4'}>
      <img src={loader.src} height={50} width={50} />
    </div>
  );
};
