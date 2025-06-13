import { toast } from 'sonner';

export const showToast = {
  success: (message: string) => {
    toast.success('Éxito', {
      description: message,
    });
  },
  error: (message: string) => {
    toast.error('Error', {
      description: message,
    });
  },
  info: (message: string) => {
    toast.info('Información', {
      description: message,
    });
  },
  loading: (message: string) => {
    return toast.loading(message);
  },
  dismiss: (id?: string | number) => {
    if (id !== undefined) {
      toast.dismiss(id);
    } else {
      toast.dismiss();
    }
  },
};
