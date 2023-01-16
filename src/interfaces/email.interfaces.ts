import { Url } from "url";

export interface IEmailRequest {
  to: string;
  subject: string;
  text: string;
  file?: Buffer;
  html?: string | Url;
}
