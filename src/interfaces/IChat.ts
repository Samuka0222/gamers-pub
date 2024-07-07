export interface IChatMessage {
  message: {
    text: string;
    isPending: boolean;
    owner: 'user' | 'bot';
  };
}
