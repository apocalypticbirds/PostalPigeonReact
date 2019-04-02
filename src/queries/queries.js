import {gql} from 'apollo-boost'

export const getConversationGql = gql`
    {
      conversation(id: "5ca1cfae1c9d440000b498b8"){
        id
        name
        contributors {
          id
          nickname
        }
        messages {
          id
          content
        }
      }
    }
`;

export const sendMessageGql = gql`
    mutation ($content:String!,$id_conv:String!,$id_sender:String!){
      sendMessage(content: $content, id_conversation: $id_conv, id_sender: $id_sender) {
        id
      }
    }
`;

export const messageSubGql = gql`
    subscription {
      messageAdded(id_conversation: "5ca1cfae1c9d440000b498b8"){
        id
        content
        sender{
          nickname
        }
        date
      }
    }`;