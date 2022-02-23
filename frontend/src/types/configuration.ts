export interface IMailConfiguration {
  SenderAddress: string;
  SenderPassword: string;
  SMTPHost: string;
  SMTPPort: string;
}

export const initialEmailState: IMailConfiguration = {
    SenderAddress: '',
    SenderPassword: '',
    SMTPHost: '',
    SMTPPort: ''
};