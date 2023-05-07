export const PUBLIC_KEY = 'msyuNyxfuCyCp3GU0';
export const CONTACT_SERVICE = 'service_dvcol_public';
export const CONTACT_TEMPLATE = 'template_contact_form';

export const emailJS = {
  key: PUBLIC_KEY,
  service: CONTACT_SERVICE,
  template: CONTACT_TEMPLATE,
};

export type ContactTemplateForm = {
  sender_mail: string;
  sender_name?: string;
  subject: string;
  title: string;
  body: string;
};
