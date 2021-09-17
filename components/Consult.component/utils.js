export const getConsultFormIds = formData => {
  return formData?.length ? formData.map(form => form.id) : [];
};
