'use client';
import { cn } from '@/lib/utils';
import { Icons } from './icons';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentProps extends React.PropsWithChildren {
  className?: string;
}

interface HeaderProps extends React.PropsWithChildren {
  className?: string;
}

const Content: React.FC<ContentProps> = ({ className, children }) => {
  return <div className={cn('w-full h-full p-4 flex flex-col gap-4', className)}>{children}</div>;
};

const Header: React.FC<HeaderProps> = ({ className, children }) => {
  return <div className={cn('w-full h-full p-4 pb-0', className)}>{children}</div>;
};

interface ModalProps extends React.PropsWithChildren {
  open?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: {
  Content: typeof Content;
  Header: typeof Header;
} & React.FC<ModalProps> = ({ open, onClose, children, className }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="fixed inset-0 bg-background/50 backdrop-blur-sm" onClick={onClose} />
          <div
            // initial={{ opacity: 0, scale: 0.95 }}
            // animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0, scale: 0.95 }}
            // transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            className={cn(
              'relative w-full bg-background rounded-lg overflow-hidden shadow-lg transform transition-all sm:max-w-lg border border-border',
              className,
            )}
          >
            <div
              onClick={onClose}
              className="absolute top-3 right-3 opacity-50 hover:opacity-100 cursor-pointer"
            >
              <Icons.x className="w-5 h-5" />
            </div>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Modal.Content = Content;
Modal.Header = Header;

export { Modal };
