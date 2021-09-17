import axios from 'axios'
import consultHeaders from '../utils/consult-header';

export const getConsultForms = async() => {
  const URL = "https://demo-api.pneumahealth.co/telehealth/forms"

  try {
    const forms = await axios.get(URL, { headers: consultHeaders()})
    return { success: true, formsData: forms.data.data }; 
  } catch (error) {
    return { success: false, nullData: {} }; 
  }
};

export const getAConsultForm = async (formId) => {
  const URL = `https://demo-api.pneumahealth.co/telehealth/forms/${formId}`
  
  try {
    const form = await axios.get(URL, { headers: consultHeaders()})
    console.log(form, consultHeaders());
    return { success: true, formData: form }; 
  } catch (error) {
    return { success: false, formData: {} }; 
  }
}
