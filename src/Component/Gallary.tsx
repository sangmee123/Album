import styled, { css } from 'styled-components';
import Images from './Images';

const Container = styled.div`
    background-color: #FAFAFA;
    width: 100vw;
    height: 100vh;
    overflow: auto;
`; 

const Navibar = styled.div`
    display: none;
    position: fixed;
    width: 100%;
    height: 60px;
    background: #FAFAFA;
    box-shadow: 0 3px 3px rgba(0,0,0,0.2);
    z-index: 100;
`;

const Sidebar = styled.div`
    display: inline-block; 
    background-color: #ededed;
    width: 200px;
    height: 100%;
    border: 1px solid rgb(187, 187, 187);
    float: left;
    margin-top: 60px;
    margin-right: 3%;
    z-index: 0;
`;

const Gallary = () => {    
    return (
        <Container>
            <Navibar></Navibar>
            <Sidebar></Sidebar>
            <Images />
            <br />
        </Container>
    );
}

export default Gallary;
