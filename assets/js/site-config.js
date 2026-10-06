/*
 * VRIJHEID — SITE CONFIGURATION
 * ------------------------------
 * The only file that needs editing to connect the forms to a real
 * form service. No secret keys belong in this file: everything here is
 * visible to website visitors.
 *
 * FORMS
 *   provider: 'none'      -> (default) forms open the visitor's email app with the
 *                            details pre-filled, addressed to vrijheidleer@gmail.com.
 *                            File uploads are hidden; visitors attach files to the email.
 *   provider: 'formspree' -> set endpoint to your form URL, e.g. 'https://formspree.io/f/abcdwxyz'
 *                            (file uploads require a Formspree plan that supports them).
 *   provider: 'web3forms' -> set accessKey to your Web3Forms access key (a public key,
 *                            designed to be used in the browser). File uploads require Web3Forms Pro.
 *   provider: 'custom'    -> set endpoint to your own secure serverless endpoint
 *                            (e.g. a Vercel/Netlify function) that accepts multipart/form-data
 *                            and returns HTTP 200 on success. Keep any API secrets on the server.
 *
 *   allowUploads: set to true only when the chosen provider/plan really accepts files.
 */
window.VRIJHEID_CONFIG = {
  email: 'vrijheidleer@gmail.com',
  phone: '+264812885929',
  phoneDisplay: '+264 81 288 5929',
  facebook: 'https://www.facebook.com/Vrijheid2',
  instagram: 'https://www.instagram.com/vrijheid3006/',

  forms: {
    provider: 'none',
    endpoint: '',
    accessKey: '',
    allowUploads: false,
    maxFiles: 5,
    maxFileSizeMB: 10,
    acceptedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    acceptedExtensions: ['.jpg', '.jpeg', '.png', '.pdf']
  }
};
