import Modal from "./Modal";
import Button from "./Button";

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  loading = false,
  danger = true,
}) => {
  const confirmVariant = danger ? "danger" : "primary";

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-steel-light">{message}</p>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="ghost"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant={confirmVariant}
          onClick={onConfirm}
          loading={loading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;