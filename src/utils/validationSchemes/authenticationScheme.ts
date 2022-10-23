import * as Yup from 'yup';

export const authenticationScheme = Yup.object({
  email: Yup.string().required().email('Email is not valid'),
  password: Yup.string().required().min(5, 'Must be more then 5 symbols'),
  confirmedPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
})
