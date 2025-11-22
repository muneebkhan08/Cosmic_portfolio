/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const WEB3_FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

const resolveWeb3FormsAccessKey = () => {
  if (typeof import.meta !== 'undefined') {
    const meta = import.meta as ImportMeta & { env?: Record<string, string | undefined> };
    return meta.env?.VITE_WEB3FORMS_ACCESS_KEY || '';
  }

  return '';
};

export async function submitContactForm(payload: ContactPayload) {
  const accessKey = resolveWeb3FormsAccessKey();

  if (!accessKey) {
    throw new Error('Missing Web3Forms access key. Set VITE_WEB3FORMS_ACCESS_KEY in your .env file.');
  }

  const response = await fetch(WEB3_FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: payload.name,
      email: payload.email,
      message: payload.message
    })
  });

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data?.message || 'Unable to transmit message at the moment.');
  }

  return data;
}
