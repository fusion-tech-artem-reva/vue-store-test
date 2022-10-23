import type { AuthRequiredFields } from '@/api/authentication';
import { type Ref, ref, watch } from 'vue';

export const useFormErrorsWatcher = (options: {
  formValues: Ref<AuthRequiredFields>
}) => {

  const formErrors = ref<Record<keyof AuthRequiredFields, boolean>>({
    email: false,
    password: false,
    confirmedPassword: false,
  });


  watch(
    () => options.formValues.value.email,
    () => {
      if (!formErrors.value.email) return;
      formErrors.value.email = false;
    }
  );
  watch(
    () => options.formValues.value.password,
    () => {
      if (!formErrors.value.password) return;
      formErrors.value.password = false;
    }
  );
  watch(
    () => options.formValues.value.confirmedPassword,
    () => {
      if (!formErrors.value.confirmedPassword) return;
      formErrors.value.confirmedPassword = false;
    }
  );

  return formErrors
}