export interface IChatMessage {
  message: {
    text: string;
    isPending: boolean;
    owner: string;
  };
}

export interface IChat {
  id: string;
  chatHistory: IChatMessage[];
}
