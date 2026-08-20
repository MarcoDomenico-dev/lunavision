// Google Forms Integration for LunaVision
// GEO-Check Form: 1FAIpQLSdP5QPMnuRKJfn9gVS11k083ds5PSqbNagELJM9sy-4RRjFqA
// ROI-Rechner Form: 1FAIpQLSey9Fa6W0jbMeopzcsKnoPcOHyoFfhThBs6H2FnQd2Gqjb7aw

function submitToGoogleForm(formId, data) {
  const formResponse = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
  
  // Erstelle FormData mit den Feldern
  const formData = new FormData();
  
  // Füge alle Daten hinzu
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
      formData.append(key, data[key]);
    }
  });
  
  // Sende mit Fetch (no-cors mode um CORS zu umgehen)
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

// Hilfsfunktion um Entry-IDs zu finden (optional - wir versuchen Standard-IDs)
const GEO_FORM_ID = '1FAIpQLSdP5QPMnuRKJfn9gVS11k083ds5PSqbNagELJM9sy-4RRjFqA';
const ROI_FORM_ID = '1FAIpQLSey9Fa6W0jbMeopzcsKnoPcOHyoFfhThBs6H2FnQd2Gqjb7aw';

