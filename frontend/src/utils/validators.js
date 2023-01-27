import { hasLetter, hasNumber } from './functions';

const firstNameAndUsernameValidator = ({ field, newVal, t }) => {
  const fieldWithDash = field.replaceAll('_', '-');
  if (newVal === '') {
    return {
      canSubmit: false,
      errors: { [field]: t(`error-${fieldWithDash}-required`) },
    };
  } else if (newVal.length < 3) {
    return {
      canSubmit: false,
      errors: { [field]: t(`error-${fieldWithDash}-length-min`) },
    };
  } else if (newVal.length > 20) {
    return {
      canSubmit: false,
      errors: { [field]: t(`error-${fieldWithDash}-length-max`) },
    };
  } else if (field === 'username' && newVal.trim().indexOf(' ') >= 0) {
    return {
      canSubmit: false,
      errors: { [field]: t(`error-username-no-whitespace`) },
    };
  } else {
    return {
      canSubmit: true,
      errors: { [field]: '' },
    };
  }
};

const emailValidator = ({ newVal, t }) => {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (newVal === '') {
    return {
      canSubmit: false,
      errors: { email: t('error-email-required') },
    };
  } else if (!newVal.match(validRegex)) {
    return {
      canSubmit: false,
      errors: { email: t('error-email-invalid-format') },
    };
  } else {
    return {
      canSubmit: true,
      errors: { email: '' },
    };
  }
};

const passwordValidator = ({ newVal, t }) => {
  if (!newVal || newVal === '') {
    return {
      canSubmit: false,
      errors: { password: t('error-password-required') },
    };
  } else if (newVal.length < 6) {
    return {
      canSubmit: false,
      errors: { password: t('error-password-length-min') },
    };
  } else if (newVal.length > 20) {
    return {
      canSubmit: false,
      errors: { password: t('error-password-length-max') },
    };
  } else if (!hasLetter(newVal)) {
    return {
      canSubmit: false,
      errors: { password: t('error-password-missing-letter') },
    };
  } else if (!hasNumber(newVal)) {
    return {
      canSubmit: false,
      errors: { password: t('error-password-missing-number') },
    };
  } else {
    return {
      canSubmit: true,
      errors: { password: '' },
    };
  }
};

export { firstNameAndUsernameValidator, emailValidator, passwordValidator };
