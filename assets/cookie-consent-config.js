/*
  LunaVision Cookie-Consent-Konfiguration
  Bibliothek: CookieConsent v3.1.0 (orestbida/cookieconsent, MIT-Lizenz, selbst gehostet)
  Blockiert GTM/GA4 technisch, bis die Kategorie "analytics" aktiv zugestimmt wurde.
  Skripte mit type="text/plain" data-category="analytics" werden von der Bibliothek
  automatisch ausgeführt, sobald Zustimmung erteilt wird.
*/
(function () {
  var lang = document.documentElement.lang === 'en' ? 'en' : 'de';

  CookieConsent.run({
    guiOptions: {
      consentModal: {
        layout: 'box',
        position: 'bottom right',
        equalWeightButtons: true,
        flipButtons: false
      },
      preferencesModal: {
        layout: 'box',
        equalWeightButtons: true,
        flipButtons: false
      }
    },
    categories: {
      necessary: {
        readOnly: true,
        enabled: true
      },
      analytics: {
        autoClear: {
          cookies: [
            { name: /^_ga/ },
            { name: /^_gid/ }
          ]
        }
      },
      marketing: {
        autoClear: {
          cookies: [
            { name: /^_fbp/ },
            { name: /^_fbc/ }
          ]
        }
      }
    },
    language: {
      default: lang,
      translations: {
        de: {
          consentModal: {
            title: 'Wir verwenden Cookies',
            description:
              'Notwendige Cookies sorgen für den technischen Betrieb dieser Website. Mit deiner Einwilligung nutzen wir zusätzlich Google Analytics und Meta Pixel, um zu verstehen wie die Seite genutzt wird.',
            acceptAllBtn: 'Alle akzeptieren',
            acceptNecessaryBtn: 'Nur notwendige',
            showPreferencesBtn: 'Einstellungen',
            footer:
              '<a href="#datenschutz_de">Datenschutzerklärung</a>'
          },
          preferencesModal: {
            title: 'Cookie-Einstellungen',
            acceptAllBtn: 'Alle akzeptieren',
            acceptNecessaryBtn: 'Nur notwendige',
            savePreferencesBtn: 'Auswahl speichern',
            closeIconLabel: 'Schließen',
            sections: [
              {
                title: 'Notwendig',
                description:
                  'Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Analyse (Google Analytics)',
                description:
                  'Hilft uns zu verstehen, wie Besucher die Website nutzen. Dabei werden Daten an Google LLC (USA) übermittelt. Nur mit deiner Einwilligung aktiv.',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: { name: 'Cookie', domain: 'Anbieter', desc: 'Zweck' },
                  body: [
                    { name: '_ga', domain: 'Google LLC', desc: 'Unterscheidet Website-Besucher, Speicherdauer ca. 2 Jahre.' },
                    { name: '_ga_*', domain: 'Google LLC', desc: 'Speichert Sitzungsstatus für Google Analytics 4, Speicherdauer ca. 2 Jahre.' }
                  ]
                }
              },
              {
                title: 'Marketing (Meta Pixel)',
                description: 'Verfolgt Besucher und Conversions für Meta Kampagnen (Facebook/Instagram). Daten werden an Meta Platforms Inc. (USA) übermittelt. Nur mit deiner Einwilligung aktiv.',
                linkedCategory: 'marketing',
                cookieTable: {
                  headers: { name: 'Cookie', domain: 'Anbieter', desc: 'Zweck' },
                  body: [
                    { name: '_fbp', domain: 'Meta Platforms Inc.', desc: 'Speichert eindeutige Browser-ID für Pixel-Tracking, Speicherdauer ca. 3 Monate.' },
                    { name: '_fbc', domain: 'Meta Platforms Inc.', desc: 'Speichert Click-ID für Conversion-Tracking, Speicherdauer ca. 3 Monate.' }
                  ]
                }
              }
            ]
          }
        },
        en: {
          consentModal: {
            title: 'We use cookies',
            description:
              'Necessary cookies keep this website running. With your consent, we also use Google Analytics and Meta Pixel to understand how visitors use the site.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Necessary only',
            showPreferencesBtn: 'Preferences',
            footer:
              '<a href="#datenschutz_en">Privacy Policy</a>'
          },
          preferencesModal: {
            title: 'Cookie Preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Necessary only',
            savePreferencesBtn: 'Save preferences',
            closeIconLabel: 'Close',
            sections: [
              {
                title: 'Necessary',
                description:
                  'Required for the website to function and cannot be disabled.',
                linkedCategory: 'necessary'
              },
              {
                title: 'Analytics (Google Analytics)',
                description:
                  'Helps us understand how visitors use the website. Data is transmitted to Google LLC (USA). Only active with your consent.',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: { name: 'Cookie', domain: 'Provider', desc: 'Purpose' },
                  body: [
                    { name: '_ga', domain: 'Google LLC', desc: 'Distinguishes website visitors, retention approx. 2 years.' },
                    { name: '_ga_*', domain: 'Google LLC', desc: 'Persists session state for Google Analytics 4, retention approx. 2 years.' }
                  ]
                }
              },
              {
                title: 'Marketing (Meta Pixel)',
                description: 'Tracks visitors and conversions for Meta campaigns (Facebook/Instagram). Data is transmitted to Meta Platforms Inc. (USA). Only active with your consent.',
                linkedCategory: 'marketing',
                cookieTable: {
                  headers: { name: 'Cookie', domain: 'Provider', desc: 'Purpose' },
                  body: [
                    { name: '_fbp', domain: 'Meta Platforms Inc.', desc: 'Stores unique browser ID for pixel tracking, retention approx. 3 months.' },
                    { name: '_fbc', domain: 'Meta Platforms Inc.', desc: 'Stores click ID for conversion tracking, retention approx. 3 months.' }
                  ]
                }
              }
            ]
          }
        }
      }
    }
  });

  // Hält die Cookie-Banner-Sprache synchron mit dem DE/EN-Umschalter der Seite.
  var currentCcLang = lang;
  new MutationObserver(function () {
    var newLang = document.documentElement.lang === 'en' ? 'en' : 'de';
    if (newLang !== currentCcLang) {
      currentCcLang = newLang;
      CookieConsent.setLanguage(newLang);
    }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
