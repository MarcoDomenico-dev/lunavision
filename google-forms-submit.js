// Google Forms Direct Integration
// No Entry-IDs needed - just submit directly!

const GEO_FORM_ID = '1FAIpQLSdP5QPMnuRKJfn9gVS11k083ds5PSqbNagELJM9sy-4RRjFqA';
const ROI_FORM_ID = '1FAIpQLSey9Fa6W0jbMeopzcsKnoPcOHyoFfhThBs6H2FnQd2Gqjb7aw';

function submitToGoogleForm(formId, data) {
  const formResponse = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
  
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
      formData.append(key, data[key]);
    }
  });
  
  return fetch(formResponse, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  }).then(() => {
    return { success: true };
  }).catch(err => {
    console.error('Form submission error:', err);
    return { success: false, error: err.message };
  });
}

// Export for use in main script
window.submitToGoogleForm = submitToGoogleForm;
window.GEO_FORM_ID = GEO_FORM_ID;
window.ROI_FORM_ID = ROI_FORM_ID;
