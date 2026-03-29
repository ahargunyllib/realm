import * as Brevo from "@getbrevo/brevo";

export interface SendEmailOptions {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
  from?: { email: string; name: string };
}

export class EmailService {
  private readonly api: Brevo.TransactionalEmailsApi;

  constructor(apiKey: string) {
    this.api = new Brevo.TransactionalEmailsApi();
    this.api.setApiKey(
      Brevo.TransactionalEmailsApiApiKeys.apiKey,
      apiKey,
    );
  }

  async send(opts: SendEmailOptions): Promise<void> {
    const email = new Brevo.SendSmtpEmail();
    email.to = opts.to;
    email.subject = opts.subject;
    email.htmlContent = opts.htmlContent;
    if (opts.from) email.sender = opts.from;
    await this.api.sendTransacEmail(email);
  }
}

export const createEmailService = (apiKey: string) =>
  new EmailService(apiKey);
