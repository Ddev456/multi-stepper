"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";

interface DeleteAccountFormData {
  confirmText: string;
}

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteAccountDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteAccountDialogProps): JSX.Element => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DeleteAccountFormData>({
    defaultValues: {
      confirmText: "",
    },
  });

  const confirmText = watch("confirmText");
  const isConfirmValid = confirmText === "SUPPRIMER";

  const onSubmit = async (data: DeleteAccountFormData) => {
    if (!isConfirmValid) return;
    
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
          >
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </motion.div>
          <DialogTitle className="text-center text-red-600">
            Supprimer votre compte
          </DialogTitle>
          <DialogDescription className="text-center">
            Cette action est irréversible. Toutes vos données seront définitivement supprimées.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Pour confirmer, écrivez "SUPPRIMER" en majuscules ci-dessous :
            </p>
            <Input
              {...register("confirmText", {
                validate: (value) => value === "SUPPRIMER" || "Texte de confirmation incorrect",
              })}
              className={errors.confirmText ? "border-red-500" : ""}
              placeholder="SUPPRIMER"
            />
            {errors.confirmText && (
              <p className="text-sm text-red-500">{errors.confirmText.message}</p>
            )}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isDeleting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              disabled={!isConfirmValid || isDeleting}
            >
              {isDeleting ? "Suppression..." : "Supprimer définitivement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
