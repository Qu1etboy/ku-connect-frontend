export type FormDataType = {
  type: string;
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  data?: { value: string; label: string }[]; // for combobox, select, radio
};
