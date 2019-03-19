import styled from 'styled-components';

const greenColor = "#00897B";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vw;
    height: 80vh;
`;

export const MiddleBox = styled.div`
    font-family:'Srisakdi', cursive;
    src:url(https://fonts.googleapis.com/css?family=Srisakdi);
    background: ${greenColor};
    opacity: 0.7;
    border-radius: 20px;
    padding: 20px;
    font-size: 20px;
`;
