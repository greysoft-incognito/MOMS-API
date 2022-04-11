export interface MailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface To {
  to: { name: string; email: string };
  url: string;
}
