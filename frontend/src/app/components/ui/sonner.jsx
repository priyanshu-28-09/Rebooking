import { Toaster as SonnerToaster } from 'sonner';

export function Toaster(props) {
  return (
    <SonnerToaster
      position={props.position || 'top-right'}
      richColors
      closeButton
      {...props}
    />
  );
}
