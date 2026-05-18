import AppButton from "./AppButton";

export default function FormActions({
  onCancel,
  onSubmit,
  cancelLabel = "Batal",
  submitLabel = "Simpan",
}) {
  return (
    <div className="flex justify-end gap-2 mt-5">
      <AppButton type="ghost" onClick={onCancel}>
        {cancelLabel}
      </AppButton>
      <AppButton type="primary" onClick={onSubmit}>
        {submitLabel}
      </AppButton>
    </div>
  );
}
