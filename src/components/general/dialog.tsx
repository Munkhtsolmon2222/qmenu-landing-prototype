'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import React, { createContext, useContext, useEffect, useState } from 'react';

const DialogRoot = DialogPrimitive.Root;

const Trigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay: React.FC<React.ComponentPropsWithRef<typeof DialogPrimitive.Overlay>> = ({
  className,
  ref,
  ...props
}) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
);

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

type OverlayProps = React.ComponentPropsWithRef<typeof DialogPrimitive.Overlay> & {
  overlayClassName?: string;
};

interface DialogContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProps extends React.ComponentProps<typeof DialogRoot> {
  disablePopState?: boolean;
}

const Dialog: React.FC<DialogProps> = (props) => {
  const [open, setOpenState] = useState(props.open ?? false);

  useEffect(() => {
    if (typeof props.open === 'boolean' && props.open !== open) onOpenChange(props.open);
  }, [props]);

  const onOpenChange = (open: boolean) => {
    setOpenState(open);
    if (!open) props.onOpenChange?.(false);
  };

  useEffect(() => {
    const handleBackButton = (event: PopStateEvent) => {
      event.preventDefault();
      onOpenChange(false);
    };

    if (open && !props.disablePopState) {
      window.history.pushState({ modalOpen: true }, '', window.location.href);
      window.addEventListener('popstate', handleBackButton);
    } else {
      window.removeEventListener('popstate', handleBackButton);
    }

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [open, props.disablePopState]);

  return (
    <DialogContext value={{ open, onOpenChange }}>
      <DialogRoot {...props} open={open} onOpenChange={onOpenChange} />
    </DialogContext>
  );
};

export const useModal = () => {
  const context = useContext(DialogContext);

  // if (!context) throw new Error('useModal must be used within a ModalProvider');

  return context;
};

const DialogTrigger: React.FC<React.ComponentProps<typeof Trigger>> = (props) => {
  const { onOpenChange } = useModal() ?? {};
  return <Trigger {...props} onClick={() => onOpenChange?.(false)} />;
};

const DialogContent: React.FC<OverlayProps> = ({
  overlayClassName,
  className,
  children,
  ref,
  ...props
}) => (
  <DialogPortal>
    <DialogOverlay className={overlayClassName} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle: React.FC<React.ComponentPropsWithRef<typeof DialogPrimitive.Title>> = ({
  className,
  ref,
  ...props
}) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription: React.FC<
  React.ComponentPropsWithRef<typeof DialogPrimitive.Description>
> = ({ className, ref, ...props }) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
