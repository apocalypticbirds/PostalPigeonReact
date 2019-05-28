import {gql} from 'apollo-boost'

export const getConversationGql = gql`
    query getConversation($activeConversation: ID!){
      conversation(id: $activeConversation){
        id
        name
        avatarUrl
        contributors {
          id
          nickname
        }
        messages {
          id
          content
          sender{
            id
          }
          date
          tags
        }
      }
    }
`;

export const sendMessageGql = gql`
    mutation send($id_conv: ID!, $content: String!) {
        addMessage(id_conversation: $id_conv, content: $content) {
            id
            content
        }
    }

`;

export const getMe = gql`
    query {
        me { 
            id 
            nickname 
            conversations{ 
                id 
                name 
                avatarUrl
            }
        }
    }
`;

export const ADD_USER_TO_CONV = gql`
mutation addUsernameToConv($nickname: String!, $id_conv: ID!){ 
    addUsernameToConv(nickname: $nickname, id_conv: $id_conv) { 
        id 
        name 
        contributors { 
            id 
            nickname 
        } 
    } 
}`;

export const ADD_CONVERSATION = gql`
    mutation addConversation($conv_name: String!){ 
        addConversation(name: $conv_name){ 
            id 
            name 
            contributors { 
                id 
                nickname 
            } 
        } 
    }`;

export const leaveConversationGql = gql`
    query leaveConv($id_conv: ID!){
        leaveConversation(id_conv: $id_conv){
            id
        }
    }`;